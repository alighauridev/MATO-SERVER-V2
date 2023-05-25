import mongoose from "mongoose";

const distributorSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    addressDetails:{
        address:{
            type: String,
            required: true,
        },
        city:{
            type: String,
            required: true,
        },
        state:{
            type: String,
            required: true,
        },
        country:{
            type: String,
            required: true,
            
        },
        postalCode:{
            type: String,
            required: true,
        },

    },
    email:{
        type: String,
        required: true,
        trim: true,
    },
    phone:{
        type: String,
        required: true,
    },
    fax:{
        type: String,
        required: true,
    }
},{
    timestamps: true
});

const Distributor = mongoose.model('Distributor', distributorSchema);

export default Distributor;



