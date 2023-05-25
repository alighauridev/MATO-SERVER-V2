import { Router } from 'express';
import Controller from '../controllers/queryController.js';
import multer from "multer";
import path from "node:path";

const router = Router();

let upload = multer({ dest: 'public/images' })


router.route('/')
.get(Controller.getQueries)
.post(upload.array('images'),Controller.postQuery)


export default router;