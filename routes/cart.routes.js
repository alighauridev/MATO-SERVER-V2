import { Router } from "express";
const router = Router();
import Controller from "../controllers/cartController.js"


router.route('/')
.get(Controller.getCart)





export default router;