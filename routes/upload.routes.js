import { Router } from "express";

import Controller from "../controllers/uploadController.js";

const router = Router();
//import cors
import cors from "cors";

router.route("/image").get(cors({ origin: "*" }), Controller.getImage);
router.post("/images", Controller.uploadImages);
router.route("/file").get(cors({ origin: "*" }), Controller.getFile);

export default router;
