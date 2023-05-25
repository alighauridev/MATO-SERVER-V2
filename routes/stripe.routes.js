import { Router } from "express";
const router = Router();
import Controller from "../controllers/stripeController.js";
import auth from "../utils/auth.js";

router.route("/create-checkout-session").post( Controller.createCheckOutSession);
router.route("/payment-order-status").post( Controller.paymentSessionStatus);

export default router;
