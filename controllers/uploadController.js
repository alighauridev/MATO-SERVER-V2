//error imports
import NotFound from "../errors/notFound.js";
import BadRequest from "../errors/badRequest.js";
import multer from "multer";
import path from "node:path";

const storageImages = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + file.originalname.match(/\..*$/)[0]
    );
  },
});
const storageFiles = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/manuals");
  },
  filename: function (req, file, cb) {
    console.log("FILE: ",file);
    cb(
      null,
      file.fieldname + "-" + Date.now() + file.originalname.match(/\..*$/)[0]
    );
  },
});

const multi_upload_images = multer({
  storage:storageImages,
  // limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      const err = new Error("Only .png, .jpg and .jpeg format allowed!");
      err.name = "ExtensionError";
      return cb(err);
    }
  },
}).array("uploadedImages");

export const multi_upload_files = multer({
  storage:storageFiles,
  // limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "application/pdf" ||
      file.mimetype == "application/docx"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      const err = new Error("Only .pdf, .docx format allowed!");
      err.name = "ExtensionError";
      return cb(err);
    }
  },
})

const uploadImages = async (req, res, next) => {
  try {
    multi_upload_images(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        return res
          .status(500)
          .send({
            error: { message: `Multer uploading error: ${err.message}` },
          })
          .end();
      } else if (err) {
        // An unknown error occurred when uploading.
        if (err.name == "ExtensionError") {
          return res
            .status(413)
            .send({ error: { message: err.message } })
            .end();
        } else {
          return res
            .status(500)
            .send({
              error: { message: `unknown uploading error: ${err.message}` },
            })
            .end();
        }
      }
      return res
        .status(200)
        .setHeader("Content-Type", "application/json")
        .json({ status: "OK", data: req.files });
    });
  } catch (err) {
    return next(err);
  }
};
const uploadFiles = async (req, res, next) => {
  try {
    multi_upload_files(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        return res
          .status(500)
          .send({
            error: { message: `Multer uploading error: ${err.message}` },
          })
          .end();
      } else if (err) {
        // An unknown error occurred when uploading.
        if (err.name == "ExtensionError") {
          return res
            .status(413)
            .send({ error: { message: err.message } })
            .end();
        } else {
          return res
            .status(500)
            .send({
              error: { message: `unknown uploading error: ${err.message}` },
            })
            .end();
        }
      }
      return res
        .status(200)
        .setHeader("Content-Type", "application/json")
        .json({ status: "OK", data: req.files });
    });
  } catch (err) {
    return next(err);
  }
};

const getImage = async (req, res, next) => {
  try {
    let { fileName } = req.query;

    //make a path to the file
    let filePath = path.join(process.cwd(), "public", "images", fileName);

    return res.status(200).sendFile(filePath);
  } catch (err) {
    return next(err);
  }
};
const getFile = async (req, res, next) => {
  try {
    let { fileName } = req.query;

    //make a path to the file
    let filePath = path.join(process.cwd(), "public", "manuals", fileName);

    return res.status(200).sendFile(filePath);
  } catch (err) {
    return next(err);
  }
};

export default {
  uploadImages,
  getImage,
  uploadFiles,
  getFile,
};
