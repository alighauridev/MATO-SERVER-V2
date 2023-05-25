import mongoose from "mongoose";

const querySchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    reEmail:{
        type: String,
        required: true,
    },
    country:{
        type: String,
        required: true,
    },
    responsePreference:{
        type: String,
        required: true,
    },
    supportCategory:{
        type: String,
        required: true,
    },
    question:{
        type: String,
        required: true,
    },
    product:{
        type: String,
    },
    dop:{
        type: Date,
        required: true,
    },
    serialNumber:{
        type: String,
    },
    images:[
        {
            type: String,
        }
    ]
});

const Query = mongoose.model("Query", querySchema);

export default Query;