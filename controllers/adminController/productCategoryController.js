import ProductCategory from "../../models/productCategory.js";

const getAllCategory = async (req, res, next) => {
  try {
    const categories = await ProductCategory.find({}).populate("products");
    res.status(200).json(categories);
  } catch (err) {
    return next(err);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    let { id } = req.params;

    let response = await ProductCategory.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json(response);
  } catch (err) {
    return next(err);
  }
};


const createCategory = async (req, res, next) => {
    try {
        let newCategory = new ProductCategory(req.body);
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
    
        let response = await ProductCategory.findByIdAndDelete(id);
    
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