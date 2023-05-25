import mongoose from "mongoose";

const shippingAddressSchema = new mongoose.Schema({
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  phone: { type: String, required: true },
  additionalInfo: { type: String },
  company: { type: String },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        qty: { type: Number, required: true },
        price: { type: Number, required: true },
        sale: {
          status: { type: Boolean, required: true },
          percentage: { type: Number, required: true },
        },
        productType: {
          type: String,
          required: true,
          enum: ["Product", "Accessory"],
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          // refPath: "products.productType",
          ref: "Product",
          required: true,
        },
        features: {
          // type: [
          // {
          //   title: {
          //     type: String,
          //     required: true,
          //   },
          //   value: {
          //     type: String,
          //     required: true,
          //   },
          // },
          // ],
          type: Object,
          // validate: (v) => Array.isArray(v) && v.length > 0,
        },
      },
    ],
    shippingAddress: shippingAddressSchema,
    contact: {
      type: String,
      required: true,
      trim: true,
    },
    subTotal: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    shippingCost: {
      type: Number,
      default: 0,
    },
    paymentMethod: {
      type: String,
      required: true,
    },

    paid: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      default: "Pending",
      enum: [
        "Pending",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
        "Completed",
      ],
    },
    note: {
      type: String,
      trim: true,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
