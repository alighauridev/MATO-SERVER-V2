import Query from "../models/query.js";
import multer from "multer";
import path from "node:path";

//import errors
import NotFound from "../errors/notFound.js";
import BadRequest from "../errors/badRequest.js";

const getQueries = async (req, res, next) => {
  try {
    let response = await Query.find();
    return res.status(200).json({ status: "OK", data: response });
  } catch (err) {
    return next(err);
  }
};

const postQuery = async (req, res, next) => {
  try {
    console.log("Req: ",req.files);
    let images = []
    for(let i =0; i<req.files.length; i++){
      images.push(req.files[i].filename);
    };
    let query = new Query({ ...req.body, phone: req.body.primaryPhone.toString(), images });
    let response = await query.save();
    if (!response) {
      return next(new BadRequest("Query not added"));
    }
    return res.redirect("/");
  } catch (err) {
    return next(err);
  }
};

export default {
  getQueries,
  postQuery,
};
