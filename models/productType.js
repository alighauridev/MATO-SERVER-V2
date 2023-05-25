import mongoose from "mongoose";


const productTypeSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    }
},{
    timestamps: true
});

export default mongoose.model('ProductType', productTypeSchema);