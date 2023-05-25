import { Router } from "express";
const router = Router();
import auth from "../utils/auth.js";
// Importing the controller
import Controller from "../controllers/orderController.js";
import AdminController from "../controllers/adminController/orderController.js";

router
  .route("/")
  .get(Controller.getOrders)

  .post(auth.verifyUser, Controller.createOrder);

router.route("/all").get(AdminController.getUserOrders);

router.route("/user/:id").get(AdminController.getUserOrders);

router
  .route("/:id")
  .get(AdminController.getOrder)
  .put(AdminController.updateOrder);
// .delete(Controller.deleteOrder);

export default router;
