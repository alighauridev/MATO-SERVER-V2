import mongoose from "mongoose";


const paymentSessionSchema = new mongoose.Schema({

    paymentSessionId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum:["used","unused","canceled"]
    }

});

export default mongoose.model("PaymentSession", paymentSessionSchema);