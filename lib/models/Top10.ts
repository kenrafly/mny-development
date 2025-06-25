import mongoose from "mongoose";

const Top10Schema = new mongoose.Schema(
  {
    title: String,
    description: String,
    rank: Number, // Rank in the top 10 list
    image: String, // Relative path to public image
  },
  { timestamps: true }
);

export const Top10 =
  mongoose.models.Top10 || mongoose.model("Top10", Top10Schema);
