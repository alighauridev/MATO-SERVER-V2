import mongoose from "mongoose";


const productsSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "type",
        required: true,
    },
    qty: {
        type: Number,
        default: 1,
        min: 1,
    },
    type: {
        type: String,
        enum: ["Product", "Accessory"],
        required: true,
    },
    features: {
        type: [
          {
            title: {
              type: String,
              required: true,
            },
            value: {
              type: String,
              required: true,
            },
          },
        ],
        required: true,
        validate: (v) => Array.isArray(v) && v.length > 0,
      },
})



const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    products:[productsSchema]

},{
    timestamps: true
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;