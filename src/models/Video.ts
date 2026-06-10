import mongoose, { Schema, models } from "mongoose";

const VideoSchema = new Schema(
  {
    title: { type: String, required: true },
    youtubeUrl: { type: String, required: true },
    thumbnail: String,
  },
  { timestamps: true }
);

export default models.Video || mongoose.model("Video", VideoSchema);
