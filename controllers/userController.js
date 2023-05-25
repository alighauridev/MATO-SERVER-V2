import User from "../models/user.js";

//error imports
import NotFound from "../errors/notFound.js";

const getProfile = async (req, res, next) => {
  try {
    let userId = req.user._id;
    let user = await User.findById(userId).select(
      "-password -isDeleted -createdAt -updatedAt -__v"
    );
    if (!user) {
      return next(new NotFound("User not found"));
    }
    return res.status(200).json({
      status: "OK",
      data: user,
    });
  } catch (err) {
    return next(err);
  }
};

export default {
    getProfile,
};
