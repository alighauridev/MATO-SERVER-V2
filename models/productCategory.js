import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
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
});

const Category = mongoose.model("ProductCategory", categorySchema);

export default Category;