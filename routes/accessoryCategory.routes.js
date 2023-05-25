import { Router } from "express";
const router = Router();

//importing Controllers
import Controller from "../controllers/adminController/accessoryCategoryController.js";

router.route("/")
.get(Controller.getAllCategory)
.post(Controller.createCategory)
.put(Controller.updateCategory)
.delete(Controller.deleteCategory);








export default router;