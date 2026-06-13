import mongoose, { Schema, models } from "mongoose";

const TestimonialSchema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    quote: { type: String, required: true },
    isApproved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default models.Testimonial || mongoose.model("Testimonial", TestimonialSchema);
