import mongoose from "mongoose";

const manualSchema = new mongoose.Schema({
    year:{
        type: String,
        required: true
    },
    
})