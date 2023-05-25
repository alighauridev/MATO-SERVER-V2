import AccessoryCategory from "../../models/accessoryCategory.js";

const getAllCategory = async (req, res, next) => {
  try {
    const categories = await AccessoryCategory.find({}).populate("products");
    res.status(200).json(categories);
  } catch (err) {
    return next(err);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    let { id } = req.params;

    let response = await AccessoryCategory.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json(response);
  } catch (err) {
    return next(err);
  }
};


const createCategory = async (req, res, next) => {
    try {
        let newCategory = new AccessoryCategory(req.body);
        let response = await newCategory.save();
        if(!response){
            return next(new Error("Somethign went Wrong"))
        }
        res.status(200).json(response);
    } catch (err) {
        return next(err);
    }
}


const deleteCategory = async (req, res, next) => {
    try {
        let { id } = req.params;
    
        let response = await AccessoryCategory.findByIdAndDelete(id);
    
        res.status(200).json(response);
    } catch (err) {
        return next(err);
    }
}


export default{
    getAllCategory,
    updateCategory,
    createCategory,
    deleteCategory
}