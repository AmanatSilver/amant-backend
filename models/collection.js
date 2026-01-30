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
collectionSchema.pre("validate", function (next) {
  // Only generate slug if name is new or modified
  if (!this.isModified("name")) return next();

  this.slug = slugify(this.name, {
    lower: true,   // convert to lowercase
    strict: true,  // remove special characters
    trim: true     // remove leading/trailing spaces
  });

  next();
});

export default model("Collection", collectionSchema);
