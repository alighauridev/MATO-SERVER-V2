import { Router } from "express";
const router = Router();

import Controller from "../controllers/userController.js"

router.route('/')
.post(Controller.getProfile)






export default router;