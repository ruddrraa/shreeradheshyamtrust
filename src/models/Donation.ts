import mongoose, { Schema, models } from "mongoose";

const DonationSchema = new Schema(
  {
    amount: { type: Number, required: true },
    purpose: {
      type: String,
      enum: ["gau-seva", "general", "event-sponsorship", "custom"],
      required: true,
    },
    donorName: { type: String, required: true },
    donorEmail: String,
    isAnonymous: { type: Boolean, default: false },
    currency: { type: String, default: "INR" },
    razorpayPaymentId: String,
    razorpayOrderId: String,
  },
  { timestamps: true }
);

export default models.Donation || mongoose.model("Donation", DonationSchema);
