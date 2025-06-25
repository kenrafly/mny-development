import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    user: String,
    dateJoined: Date,
    dateEnded: Date,
    plan: {
      type: String,
      enum: ["1 month", "2 months", "3 months"],
    },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
