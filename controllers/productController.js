import Product from "../models/product.js";
import Accessory from "../models/accessory.js";
import { paginationAndFilter } from "../utils/reusable.js";

//error imports
import NotFound from "../errors/notFound.js";
import BadRequest from "../errors/badRequest.js";

const getProducts = async (req, res, next) => {
  try {
    let { page, limit, sort_by } = req.query;
    let { type } = req.params;

    if (type !== "product" && type !== "accessory") {
      return next(new BadRequest("Invalid type of product"));
    }

    let filters = paginationAndFilter(page, limit, sort_by);

    let response = null;

    if (type === "product") {
      response = await Product.find({})
        .select("-isDeleted -__v")
        .sort(filters.sort)
        .skip((filters.pagination.page - 1) * filters.pagination.limit)
        .limit(filters.pagination.limit)
        .lean();
    } else if (type === "accessory") {
      response = Accessory.find({})
        .select("-isDeleted -__v")
        .sort(filters.sort)
        .skip((filters.pagination.page - 1) * filters.pagination.limit)
        .limit(filters.pagination.limit)
        .lean();
    }

    return res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json({ status: "OK", data: response });
  } catch (err) {
    return next(err);
  }
};

const getProductByslug = async (req, res, next) => {
  try {
    let { slug, type } = req.params;

    if (type !== "product" && type !== "accessory") {
      return next(new BadRequest("Invalid type of product"));
    }

    let response = null;

    if (type === "product") {
      response = await Product.findOne({ slug })
        .select("-isDeleted -__v")
        .lean();
    } else if (type === "accessory") {
      response = await Accessory.findOne({ slug })
        .select("-isDeleted -__v")
        .lean();
    }
    if (!response) {
      return next(new NotFound("Product not found"));
    }

    return res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json({ status: "OK", data: response });
  } catch (err) {
    return next(err);
  }
};

export default {
  getProducts,
  getProductByslug,
};
