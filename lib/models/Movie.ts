import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    image: String, // Relative path to public image
    public_id: String,
  },
  { timestamps: true }
);

export const Movie =
  mongoose.models.Movie || mongoose.model("Movie", movieSchema);
