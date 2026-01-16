import mongoose from "mongoose";

const { Schema, model } = mongoose;

const homepageContentSchema = new Schema(
    {
        heroTitle: {
            type: String,
            required: true,
            trim: true,
        },

        heroSubtitle: {
            type: String,
            required: true,
            trim: true,
        },

        heroImage: {
            type: String,
            required: true,
        },

        brandStoryShort: {
            type: String,
            required: true,
        },

        craftsmanshipTitle: {
            type: String,
            required: true,
            trim: true,
        },

        craftsmanshipDescription: {
            type: String,
            required: true,
        },

        craftsmanshipImage: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default model("HomepageContent", homepageContentSchema);
