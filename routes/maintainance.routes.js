import { Router } from "express";
import Controller from "../controllers/maintainanceController.js";


const router = Router();

router.route('/:slug')
.get(Controller.getMaintainance)

router.route('/')
.post(Controller.addMaintainance)



export default router;