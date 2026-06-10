import mongoose, { Schema, models } from "mongoose";

const GallerySchema = new Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    category: {
      type: String,
      enum: ["gau-seva", "sankirtan", "bhajan", "events"],
      required: true,
    },
    caption: String,
  },
  { timestamps: true }
);

export default models.Gallery || mongoose.model("Gallery", GallerySchema);
