import Order from "../models/order.js";
import Cart from "../models/cart.js";
import { paginationAndFilter } from "../utils/reusable.js";
import Product from "../models/product.js";
import BadRequest from "../errors/badRequest.js";

const getOrders = async (req, res, next) => {
  try {
    let userId = "646359cb7f7a00fb2b66a984";
    let { page, limit, sort_by } = req.query;
    let filters = paginationAndFilter(page, limit, sort_by);

    let orders = await Order.find({ user: userId })
      .select("-user -__v")
      .populate("products.product", "title images price")
      .sort(filters.sort)
      .skip((filters.pagination.page - 1) * filters.pagination.limit)
      .limit(filters.pagination.limit)
      .lean();
    return res.status(200).json({ status: "OK", data: orders });
  } catch (err) {
    return next(err);
  }
};

const productsDeatil = async (products) => {
  let totalPrice = 0;
  let discount = 0;
  let productsDetailArray = products.map(async (product) => {
    let info = await Product.findById(product.product);
    discount += info.sale ? (info.price * info.salePercentage) / 100 : 0;
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
  };
};

const createOrder = async (req, res, next) => {
  try {
    let userId = req.user._id;
    let {
      shippingAddress,
      shippingCost = 0,
      contact,
      paymentMethod = "cash",
      note,
      products,
      paid = false,
    } = req.body;

    let { totalPrice, discount, productsDeatilA } = await productsDeatil(
      products
    );

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
      paid: paid || false,
    });

    //TODO: will deal with logic here how to notify admin of order wither through email or socket.io

    let response = await order.save();

    if (!response) {
      return next(new BadRequest("Check your reqwuest and try again"));
    }

    return res
      .status(200)
      .json({ status: "OK", data: "Order Placed Successfully" });
  } catch (err) {
    return next(err);
  }
};

export default {
  getOrders,
  createOrder,
};
