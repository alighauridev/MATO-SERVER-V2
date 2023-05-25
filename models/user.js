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
})

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
    },
    firstName: {
      type: String,
      minlength: 3,
      required: true,
    },
    lastName: {
      type: String,
      minlength: 3,
      required: true,
    },
    avatar: {
      type: String,
      minlength: 5,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
    },
    phoneNo: {
      type: String,
    },
    authType: {
      type: String,
      required: true,
      enum: ["Local", "Google"],
    },
    admin: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    shippingAddress: shippingAddressSchema,},
  { timestamps: true }
);

userSchema.pre("find", function () {
  this.where({ isDeleted: false });
});

userSchema.pre("findOne", function () {
  this.where({ isDeleted: false });
});

userSchema.pre("findOneAndUpdate", function () {
  this.where({ isDeleted: false });
});

const User = mongoose.model("User", userSchema);

export default User;
