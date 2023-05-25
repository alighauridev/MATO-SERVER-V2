import { Router } from "express";
import Product from "../models/product.js";
import NotFound from "../errors/notFound.js";
import multer from "multer";
import { multi_upload_files } from "../controllers/uploadController.js";


const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const manuals = await Product.find({}).select("-_id title manual").lean();
    res.status(200).json({ status: "OK", data: manuals });
  } catch (err) {
    return next(err);
  }
});

router.post("/updateManual", multi_upload_files.single("file"), async (req, res, next) => {
  try {
    const { slug } = req.body;

    console.log(req.file);

    const manual = req.file.filename;    

    

    const product = await Product.findOneAndUpdate(
      { slug },
      { $set: { manual } },
      { new: true }
    )
      .select("-_id slug manual")
      .lean();

    if (!product) return next(new NotFound("Product not found"));

    return res.status(200).json({ status: "OK", data: product });
  } catch (err) {
    return next(err);
  }
});

export default router;
