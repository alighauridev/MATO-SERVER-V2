import Order from "../../models/product.js";

//error imports
import NotFound from "../../errors/notFound.js";
import BadRequest from "../../errors/badRequest.js";
import { paginationAndFilter } from "../../utils/reusable.js";

const updateOrder = async (req, res, next) => {
  try {
    let { id } = req.params;
    let { status } = req.body;

    let response = await Order.findByIdAndUpdate(
      { _id: id },
      { status },
      { new: true }
    );

    if (!response) {
      return next(new NotFound("Order not found"));
    }

    return res.status(200).json({ status: "OK", data: response });
  } catch (err) {
    return next(err);
  }
};

const getUserOrders = async (req, res, next) => {
  try {
    let { id } = req.params;
    let { limit, page, sort_by } = req.query;
    let find = {};

    if (id) {
      find = { user: id };
    }

    let filters = paginationAndFilter(page, limit, sort_by);

    let response = await Order.find(find)
      .select("-user -__v")
      .populate("products.product", "title images price")
      .sort(filters.sort)
      .skip((filters.pagination.page - 1) * filters.pagination.limit)
      .limit(filters.pagination.limit)
      .lean();

    return res.status(200).json({ status: "OK", data: response });
  } catch (err) {
    return next(err);
  }
};

const getOrder = async (req, res, next) => {
  try {
    let { id } = req.params;
    let order = await Order.findById(id)
      .populate("products.product", "title images price")
      .lean();
    if (!order) {
      return next(new NotFound("Order not found"));
    }
    return res.status(200).json({ status: "OK", data: order });
  } catch (err) {
    return next(err);
  }
};

export default {
  updateOrder,
  getUserOrders,
  getOrder
};
