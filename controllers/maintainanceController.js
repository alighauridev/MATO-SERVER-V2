import Maintainance from "../models/maintainance.js";


//import errors
import NotFound from "../errors/notFound.js";
import BadRequest from "../errors/badRequest.js";


const getMaintainance = async (req, res, next) => {
    try{
        
        let {slug} = req.params;
        let response = await Maintainance.find({slug:slug});
        if(!response){
            return next(new NotFound("Maintainance not found"));
        }
        return res.status(200).json({status:"OK",data:response});

    }catch(err){
        return next(err);
    }
}

const addMaintainance = async (req, res, next) => {
    try{

        let maintainance = new Maintainance(req.body);
        let response = await maintainance.save();
        if(!response){
            return next(new BadRequest("Maintainance not added"));
        }
        return res.status(200).json({status:"OK",data:response});

    }catch(err){
        return next(err);
    }
}


export default {
    getMaintainance,
    addMaintainance
}