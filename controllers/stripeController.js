import Stripe from "stripe";
import Order from "../models/order.js";
import Product from "../models/product.js";
import PaymentSession from "../models/paymentSession.js";
import BadRequest from "../errors/badRequest.js";

const stripe = new Stripe(
  "sk_test_51N4MhFJ4HF9R2ocWHQSXDNBwQat3rAyuzCYkzcjWjoJjGHbS6hPEZfiVx6NUpZ0DEYvsIkO1EHaOu9bfNFuQ8cII00nTRrcHby",
  {
    apiVersion: "2020-08-27",
  }
);

const productsDeatil = async (products) => {
  let totalPrice = 0;
  let discount = 0;
  let items = [];
  let productsDetailArray = products.map(async (product) => {
    let info = await Product.findById(product.product);
    let productDiscount = info.sale
      ? (info.price * info.salePercentage) / 100
      : 0;
    discount += productDiscount;
    let productPrice = info.price;
    let multiplyer = product.qty;
    //add the additionalPrice to totalPrice if product.features have a proporty and matches the modifications in info.modifications
    if (product.features) {
      Object.keys(product.features).forEach((key) => {
        let ModObject = info.modifications.filter(
          (mod) => mod.title === key
        )[0];
        if (ModObject) {
          ModObject.options.forEach((opt) => {
            if (opt.option === product.features[key]) {
              productPrice += opt.additionalPrice;
            }
          });
        }
      });
    }
    items.push({
      title: info.title,
      price: productPrice - productDiscount,
      quantity: multiplyer,
    });
    totalPrice += productPrice * multiplyer;
    console.log("I am here");
    return {
      productType: product.type,
      product: product.product,
      qty: multiplyer,
      price: productPrice,
      features: product.features || null,
      sale: {
        status: info.sale,
        percentage: info.salePercentage,
      },
    };
  });

  productsDetailArray = await Promise.all(productsDetailArray);
  return {
    totalPrice,
    discount,
    productsDeatilA: productsDetailArray,
    items,
  };
};

const createCheckOutSession = async (req, res, next) => {
  try {
    let {
      shippingAddress,
      shippingCost = 0,
      contact,
      paymentMethod = "cash",
      note,
      products,
    } = req.body;

    let { totalPrice, discount, productsDeatilA, items } = await productsDeatil(
      products
    );
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: items.map((item) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.title,
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.FRONT_END_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONT_END_BASE_URL}/canceled`,
    });

    let newPaymentSession = new PaymentSession({
      paymentSessionId: session.id,
      status: "unused",
    });

    await newPaymentSession.save();

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: error.message });
  }
};

const paymentSessionStatus = async (req, res, next) => {
  try {
    let userId = "646359cb7f7a00fb2b66a984";
    let {
      paymentSessionId,
      shippingAddress,
      shippingCost = 0,
      contact,
      paymentMethod = "cash",
      note,
      products,
    } = req.body;

    let { totalPrice, discount, productsDeatilA, items } = await productsDeatil(
      products
    );

    let foundSession = PaymentSession.findOne({
      paymentSessionId: paymentSessionId,
    });
    if (!foundSession) {
      return next(new BadRequest("Failed! Try Again"));
    } else if (foundSession.status === "used") {
      return next(new BadRequest("This Session is already used"));
    }else if (foundSession.status === "cancelled") {
      return next(new BadRequest("This Session is already used"));
    } else {
      const session = await stripe.checkout.sessions.retrieve(paymentSessionId);
      if (session.payment_status === "paid") {
        console.log("I am here IN PAID");
        let order = new Order({
          user: userId,
          products: productsDeatilA,
          subTotal: totalPrice,
          discount: discount,
          shippingCost: shippingCost,
          total: totalPrice - discount + shippingCost,
          shippingAddress: shippingAddress,
          contact: contact,
          paymentMethod: paymentMethod,
          note: note || null,
          paid: session.payment_status === "paid" ? true : false,
        });
        let response = await order.save();
        if (!response) {
          return next(new BadRequest("Something went wrong"));
        }
        await PaymentSession.findByIdAndUpdate(foundSession._id, {
          status: "used",
        });
        res.json({status:"OK", data: "Order Placed Successfully" });
      } else {
        return next(new BadRequest("Payment Failed"));
      }
    }
  } catch (err) {
    return next(new BadRequest("Something went wrong"));
  }
};

export default { createCheckOutSession,paymentSessionStatus };
