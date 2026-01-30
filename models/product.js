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
            required:true,
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

// Generate slug from name
productSchema.pre("validate", function (next) {
  // Only generate slug if name is new or modified
  if (!this.isModified("name")) return next();

  this.slug = slugify(this.name, {
    lower: true,   // convert to lowercase
    strict: true,  // remove special characters
    trim: true     // remove leading/trailing spaces
  });

  next();
});

export default model("Product", productSchema);
