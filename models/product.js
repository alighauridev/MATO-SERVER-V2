import mongoose from 'mongoose';


const modificationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    options:{
        type: [{
            option: String,
            additionalPrice: Number,
        }],
        required: true,
        validate: v=> Array.isArray(v) && v.length>0
    }
})

const modificationImagesSchema = new mongoose.Schema({
    options: {
        type: Object,
        required: true,
    },
    images:{
        type: [String],
        validate: v=> Array.isArray(v) && v.length>0
    }
})

const productSchema = new mongoose.Schema({
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        min: 0,
        required: true,
    },
    category: {
        type: [String],
        required: true,
        validate: v=> Array.isArray(v) && v.length>0
    },
    description: {
        type: [{
            title: String,
            description: String
        }],
        required: true,
        validate: v=> Array.isArray(v) && v.length>0
    },
    manual: {
        type: String,
    },
    videos: {
        type: [String],
    },
    includes: {
        type: [String],

    },
    img:{
        type: String,
        required: true,
    },
    modifications: {
        type: [modificationSchema],
        validate: v=> Array.isArray(v) && v.length>0
    },
    sale:{
        type: Boolean,
        default: false,
    },
    salePercentage:{
        type: Number,
        min: 0,
        max: 100,
        default: 0,
    },
    modificationImages:{
        type: [modificationImagesSchema],
        validate: v=> Array.isArray(v) && v.length>0
    },
    status:{
        type: String,
        enum: ['available','manufacturing',"soldOut"],
        default: 'available'
    },
    quantity:{
        type: Number,
        min: 0,
        required: true,
    }

},{
    timestamps: true

});

const Product = mongoose.model('Product',productSchema);
export default Product;