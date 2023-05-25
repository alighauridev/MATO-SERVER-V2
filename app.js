import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";

import errorHandler from "./middleware/globalErrorHandler.js";
import NOTFOUND from "./errors/notFound.js";
import passport from "passport";
import compression from "compression";
import { corsAll, corsWithOptions } from "./utils/cors.js";

const PORT = process.env.PORT || 5000;
const development = process.env.NODE_ENV === "development";

//import routes
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/product.routes.js";
import orderRouter from "./routes/order.routes.js";
import uploadRouter from "./routes/upload.routes.js";
import productCategoryRouter from "./routes/productCategory.routes.js";
import companyRouter from "./routes/company.routes.js";
import accessoryCategoryRouter from "./routes/accessoryCategory.routes.js";
import quryRouter from "./routes/query.routes.js"
import maintainanceRouter from "./routes/maintainance.routes.js"
import stripeRouter from "./routes/stripe.routes.js";
import manualRouter from "./routes/manual.routes.js";

//connect to mongoose
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    development && console.log("Successfully connected to the Database");
  })
  .catch((err) => development && console.log(err));

//app
const app = express();

//middleware support for compression
const shouldCompress = (req, res) => {
  //Don't compress responses with this request header
  if (req.headers["x-no-compression"]) return false;
  //Resort to standard filter function
  return compression.filter(req, res);
};

//middleware

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//compress responses that allowed by shouldCompress function
app.use(compression({ filter: shouldCompress }));
app.use(passport.initialize());
// app.use(passport.session())

app.use(corsAll);
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

// routes
app.use("/auth", authRouter);
app.use("/upload", uploadRouter);
app.use("/products", productRouter);
app.use("/company", companyRouter);
app.use("/query", quryRouter);
app.use("/maintainance", maintainanceRouter);
app.use("/orders", orderRouter);
app.use("/stripe", stripeRouter);
app.use("/manual", manualRouter);

//404 when invalid route is given
app.use((req, res, next) => {
  next(new NOTFOUND("Resource not found"));
});

//error handler
app.use(errorHandler);

//listener
app.listen(PORT, () => {
  development && console.log("successfully connected to the Server");
});
