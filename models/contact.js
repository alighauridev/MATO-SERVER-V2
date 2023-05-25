import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    text:{
        type: String,
        required: true,
    }
},{
    timestamps: true
})


const Contact = mongoose.model("Contact", contactSchema);

export default Contact;