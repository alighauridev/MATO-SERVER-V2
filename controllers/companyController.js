import About from "../models/about.js";
import Contact from "../models/contact.js";
import Distributor from "../models/distributor.js";
import Faq from "../models/faq.js";
import FAQCategory from "../models/faqCategory.js";

//import errors
import NotFound from "../errors/notFound.js";
import BadRequest from "../errors/badRequest.js";

//================================ About ================================================

const getAbout = async (req, res, next) => {
  try {
    let response = await About.find();

    if (!response) {
      throw new NotFound("About not found");
    }

    res.status(200).json({status:"OK",data:response});
  } catch (err) {
    return next(err);
  }
};

const addAbout = async (req, res, next) => {
  try {
    let about = new About(req.body);

    let response = await about.save();

    if (!response) {
      throw new BadRequest("About not added");
    }

    res.status(200).json({status:"OK",data:response});
  } catch (err) {
    return next(err);
  }
};

const updateAbout = async (req, res, next) => {
  try {
    let response = await About.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      description: req.body.description,
    });

    if (!response) {
      throw new BadRequest("About not updated");
    }

    res.status(200).json(response);
  } catch (err) {
    return next(err);
  }
};

//===================================================================================================

//================================ Contact ===============================================================
const getContact = async (req, res, next) => {
  try {
    let response = await Contact.find();

    if (!response) {
      throw new NotFound("Contact not found");
    }

    res.status(200).json(response);
  } catch (err) {
    return next(err);
  }
};

const updateContact = async (req, res, next) => {
  try {
    let response = await Contact.updateOne({
      text: req.body.text,
    });

    if (!response) {
      throw new BadRequest("Contact not updated");
    }

    res.status(200).json(response);
  } catch (err) {
    return next(err);
  }
};

//===================================================================================================

//================================ Distributor ===============================================================

const getDistributor = async (req, res, next) => {
  try {
    let response = await Distributor.find();

    if (!response) {
      throw new NotFound("Distributor not found");
    }

    res.status(200).json({status:"OK",data:response});
  } catch (err) {
    return next(err);
  }
};

const addDistributor = async (req, res, next) => {
  try {
    let distributor = new Distributor(req.body);

    let response = await distributor.save();

    if (!response) {
      throw new BadRequest("Distributor not added");
    }

    res.status(200).json({status:"OK",data:response});
  } catch (err) {
    return next(err);
  }
};

const editDistributor = async (req, res, next) => {
  try {
    let { id } = req.params;
    let response = await Distributor.findOneAndUpdate(
      id,
      {
        ...req.body,
      },
      { new: true }
    ).lean();

    if (!response) {
      throw new BadRequest("Distributor not updated");
    }

    res.status(200).json({status:"OK",data:response});
  } catch (err) {
    return next(err);
  }
};

const deleteDistributor = async (req, res, next) => {
  try {
    let { id } = req.params;

    let response = await Distributor.findOneAndDelete(id);

    if (!response) {
      throw new BadRequest("Distributor not deleted");
    }

    res.status(200).json({status:"OK",data:response});
  } catch (err) {
    return next(err);
  }
};

//===================================================================================================

//================================ Faq ===============================================================

const addFaqCategory = async (req, res, next) => {
  try{

    let newCategory = new FAQCategory(req.body);
    let response = await newCategory.save();
    if(!response){
      throw new BadRequest("Category not added");
    }
    res.status(200).json({status:"OK",data:response});

  }catch(err){
    return next(err);
  }
}

const getFaqCategory = async (req, res, next) => {
  try{
    let response = await FAQCategory.find()
    if(!response){
      throw new NotFound("Category not found");
    }
    res.status(200).json({status:"OK",data:response});
  }catch(err){
    return next(err);
  }
}

const deleteFaqCategory = async (req, res, next) => {
  try{
    let {id} = req.params;
    let response = await FAQCategory.findByIdAndDelete(id);
    if(!response){
      throw new BadRequest("Category not deleted");
    }
    res.status(200).json({status:"OK",data:response});
  }catch(err){
    return next(err);
  }
}



const getFaq = async (req, res, next) => {
  try {

    let {category} = req.query;
    let filter = {};
    if(category){
      filter = {category:{$regex:category,$options:'i'}}
    }

    let response = await Faq.find({
      ...filter
    });

    if (!response) {
      throw new NotFound("Faq not found");
    }

    res.status(200).json({status:"OK",data:response});
  } catch (err) {
    return next(err);
  }
};

const addFaq = async (req, res, next) => {
  try{

    let newFaq = new Faq(req.body);
    let response = await newFaq.save();
    if(!response){
      throw new BadRequest("Faq not added");
    }
    res.status(200).json({status:"OK",data:response});

  }catch(err){
    return next(err);
  }
}


const updateFaq = async (req, res, next) => {
  try {
    let { id } = req.params;
    let response = await Faq.findByIdAndUpdate(id, { ...req.body });

    if (!response) {
      throw new BadRequest("Faq not updated");
    }

    res.status(200).json({status:"OK",data:response});
  } catch (err) {
    return next(err);
  }
};

//===================================================================================================

export default {
  getAbout,
  addAbout,
  updateAbout,
  getContact,
  updateContact,
  getDistributor,
  addDistributor,
  editDistributor,
  deleteDistributor,
  addFaqCategory,
  getFaqCategory,
  deleteFaqCategory,
  getFaq,
  addFaq,
  updateFaq,
};
