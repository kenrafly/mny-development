import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema(
  {
    title: String,
    src: String, // Video source URL
    description: String,
  },
  { timestamps: true }
);

export const Video =
  mongoose.models.VideoSchema || mongoose.model("VideoSchema", VideoSchema);
