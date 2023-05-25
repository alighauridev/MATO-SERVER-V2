import Cart from "../models/cart.js";

//error imports
import NotFound from "../errors/notFound.js";

const getCart = async (req, res, next) => {
  try {
    let userId = req.user._id;
    let cart = await Cart.find(userId)
      .select("-__v")
      .populate("products.product", "-__v");
    if (!cart) {
      return next(new NotFound("Cart not found"));
    }
    return res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json({ status: "OK", cart });
  } catch (err) {
    return next(err);
  }
};

const updateCart = async (req, res, next) => {
  try {
    let userId = req.user._id;
    let { productId, qty } = req.body;
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return next(new NotFound("Cart not found"));
    }
    let product = cart.products.find((p) => p.product == productId);
    if (product) {
      product.qty = qty;
    } else {
      cart.products.push({ product: productId, qty });
    }
    let response = await cart.save();
    return res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json({ status: "OK", data: response });
  } catch (err) {
    return next(err);
  }
};

export default {
  getCart,
  updateCart
};
