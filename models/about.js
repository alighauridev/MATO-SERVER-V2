import mongoose from "mongoose";


const aboutSchema = new mongoose.Schema({

    quickFacts: [{
        title: { type: String, required: true },
        description: { type: String, required: true },
        numbers: { type: Number, required: true },
    }],
    sections: [{
        header: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
    }],
},{
    timestamps: true
})

const About = mongoose.model("About", aboutSchema);

export default About;