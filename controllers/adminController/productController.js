import Product from "../../models/product.js";
import Accessory from "../../models/accessory.js";

//error imports
import NotFound from "../../errors/notFound.js";
import BadRequest from "../../errors/badRequest.js";

const addProduct = async (req, res, next) => {
  try {

    let { type } = req.params;
    
    if (type !== "product" && type !== "accessory") {
      return next(new BadRequest("Invalid type of product"));
    }

    let response = null;

    if(type === "product"){
      let newProduct = new Product(req.body);
      response = await newProduct.save();
    }else if(type === "accessory"){
      let newAccessory = new Accessory(req.body);
      response = await newAccessory.save();
    }

    if (!response) {
      return next(new Error("Something went wrong"));
    }
    return res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json({ status: "OK", data:response });
  } catch (err) {
    return next(err);
  }
};

const deleteProductById = async (req, res, next) => {
  try {
    let { id, type } = req.params;

    if (type !== "product" && type !== "accessory") {
      return next(new BadRequest("Invalid type of product"));
    }

    let response = null;

    if (type === "product") {
      response = await Product.findByIdAndDelete(id);
    }
    else if (type === "accessory") {
      response = await Accessory.findByIdAndDelete(id);
    }

    if (!response) {
      return next(new NotFound("Product not found"));
    }
    
    return res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json({ status: "OK", message: "Product deleted successfully" });
  } catch (err) {
    return next(err);
  }
};

export default {
  addProduct,
  deleteProductById,
};
