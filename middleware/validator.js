import {body, matchedData, validationResult} from "express-validator";


//some common validators
const commonValaidators = {
    firstName: body("firstName").isString().withMessage("Name should be a string").bail().isLength({min: 3}).withMessage("Name must be at least 3 characters long").bail().notEmpty().withMessage("Name is required"),
    lastName: body("lastName").isString().withMessage("Name should be a string").bail().isLength({min: 3}).withMessage("Name must be at least 3 characters long").bail().notEmpty().withMessage("Name is required"),
    email: body("email").isEmail().withMessage("Email is not valid").bail().notEmpty().withMessage("Email is required"),
    password: body("password").isString().withMessage("Password should be a string").bail().isLength({min: 8}).withMessage("Password must be at least 8 characters long").notEmpty().withMessage("Password is required"),
    newPassword: body("newPassword").isString().withMessage("Password should be a string").bail().isLength({min: 8}).withMessage("Password must be at least 8 characters long").notEmpty().withMessage("Password is required"),
    phoneNumber: body("phoneNumber").isMobilePhone(["any"]).withMessage("Phone number should be valid").bail().notEmpty().withMessage("Phone number is required"),
    avatar:body('avatar').isString().withMessage("avatar name should be a string").bail().notEmpty().withMessage("avatar name cannot be empty"),
    title: body("title").isString().withMessage("Title should be a string").bail().notEmpty().withMessage("Title is required"),
    description: body("description").isString().withMessage("Description should be a string").bail().notEmpty().withMessage("Description is required"),
    price: body("price").isNumeric().withMessage("Price should be a number").bail().notEmpty().withMessage("Price is required"),
    category: body("category").isArray({min:1}).withMessage("Category should be an array").bail().notEmpty().withMessage("Category is required"),
    images: body("images").isArray({min:1}).withMessage("Images should be an array").bail().notEmpty().withMessage("Images is required"),
    videos: body("videos").isArray({min:1}).withMessage("Videos should be an array").bail().notEmpty().withMessage("Videos is required"),
    sale: body('sale').isBoolean().withMessage("Sale should be a boolean").bail().notEmpty().withMessage("Sale is required"),
    salePercentage: body('salePercentage').isNumeric().withMessage("Sale percentage should be a number").bail().notEmpty().withMessage("Sale percentage is required"),

}

const paginationValidator = ()=>{
    return [
        body('cursor').optional().isString().withMessage("cursor should be an _id string").bail().notEmpty().withMessage("cursor cannot be empty"),
        body('limit').optional().isNumeric().withMessage("limit should be a number"),
        body('filter').optional().isObject({strict:true}),
        body('filter.name').optional().isString().withMessage("Name can only be string").bail().notEmpty().withMessage("name field cannot be empty")
    ]
}

const userIdValidatior = ()=>{
    return [
        body('userId').isString().withMessage("Should be an _id string").bail().notEmpty().withMessage("userId cannot be empty")
    ]
}






//--------------------auth Route validators--------------------

//validators for signup
const signupValidators = ()=>{
    return [
        commonValaidators.firstName,
        commonValaidators.lastName,
        commonValaidators.email,
        commonValaidators.password
    ]
}

//validators for login
const loginValidators = ()=>{
    return [
        commonValaidators.email,
        commonValaidators.password
    ]
}

//validator for refresh token
const refreshTokenValidators = ()=>{
    return [
        body("refreshToken").isString().withMessage("Refresh token should be a string").bail().notEmpty().withMessage("Refresh token is required")
    ]
}


//---------------------- user Route validators ------------------



//---------------------- admin Route validators ------------------
const addProduct = ()=>{
    return [
        commonValaidators.title,
        commonValaidators.description,
        commonValaidators.price,
        commonValaidators.category,
        commonValaidators.images,
        commonValaidators.videos,
        commonValaidators.sale.optional(),
        commonValaidators.salePercentage.optional(),
        // body('modification')


    ]
}






const validate = (req,res,next)=>{
    const errors = validationResult(req);
    if(errors.isEmpty()){
        //only add data that is validated so no unexpected data will be passed to the api through body
        req.body = matchedData(req); 
        return next();
    }
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({[err.param]: err.msg}));
    return res.status(422).json({
        status:"ERROR",
        errors: extractedErrors,
    });
};


export {
    signupValidators,
    loginValidators,
    refreshTokenValidators,
    validate,
}
