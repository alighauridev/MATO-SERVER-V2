import mongoose from "mongoose";

const maintainanceSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    slug:{
        type: String,
        required: true,
        unique: true,
    },
    sections: [{
        header: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
    }],


},{
    timestamps: true
});

const Maintainance = mongoose.model('Maintainance', maintainanceSchema);

export default Maintainance;