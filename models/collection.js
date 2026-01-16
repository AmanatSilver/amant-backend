import mongoose from "mongoose";
import slugify from "slugify";

const { Schema, model } = mongoose;

const collectionSchema = new Schema(
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

        description: {
            type: String,
            required: true,
        },

        heroImage: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// Generate slug from name
collectionSchema.pre("save", function (next) {
    if (!this.isModified("name")) return next();

    this.slug = slugify(this.name, {
        lower: true,
        strict: true,
    });

    next();
});

export default model("Collection", collectionSchema);
