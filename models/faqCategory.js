import mongoose from "mongoose";


const faqCategory = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
    },
    image: {
        type: String,
    }
},{
    timestamps: true
});

const FAQCategory = mongoose.model("FaqCategory", faqCategory);

export default FAQCategory;
