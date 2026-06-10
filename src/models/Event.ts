import mongoose, { Schema, models } from "mongoose";

const EventSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    banner: { type: String, required: true },
    bannerPublicId: String,
    date: { type: Date, required: true },
    lumaLink: String,
  },
  { timestamps: true }
);

export default models.Event || mongoose.model("Event", EventSchema);
