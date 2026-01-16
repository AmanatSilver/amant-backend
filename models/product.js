import mongoose from "mongoose";
import slugify from "slugify";

const { Schema, model } = mongoose;

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            index: true,
        },

        collectionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Collection",
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        materials: {
            type: [String],
            default: [],
        },

        careInstructions: {
            type: String,
            required: true,
        },

        images: {
            type: [String],
            required: true,
        },

        featured: {
            type: Boolean,
            default: false,
        },

        tags: {
            type: [String],
            default: [],
            index: true,
        },

        category: {
            type: String,
            enum: ["jewelry", "broche"],
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },

        isNewArrival: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

productSchema.pre("save", function (next) {
    if (!this.isModified("name")) return next();

    this.slug = slugify(this.name, {
        lower: true,
        strict: true,
    });

    next();
});

export default model("Product", productSchema);
