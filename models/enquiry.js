import mongoose from "mongoose";

const { Schema, model } = mongoose;

const enquirySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },

        message: {
            type: String,
            required: true,
        },

        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
    },
    {
        timestamps: true,
    }
);

export default model("Enquiry", enquirySchema);
