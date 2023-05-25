import mongoose from "mongoose";


const accessorySchema = new mongoose.Schema({
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

const Accessory = mongoose.model("AccessoryCategory", accessorySchema);

export default Accessory;
