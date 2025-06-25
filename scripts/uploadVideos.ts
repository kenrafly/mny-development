import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

// Setup credentials from your .env
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const VIDEOS_DIR = path.join(__dirname, "../public/videos");

async function uploadVideos() {
  const videoExtensions = [".mp4", ".mov", ".avi", ".mkv", ".webm"];
  const files = fs
    .readdirSync(VIDEOS_DIR)
    .filter((f) => videoExtensions.some((ext) => f.endsWith(ext)));

  for (const file of files) {
    const filePath = path.join(VIDEOS_DIR, file);

    try {
      const result = await cloudinary.uploader.upload(filePath, {
        resource_type: "video", // 👈 IMPORTANT
        folder: "donghua_videos", // 👈 Change as needed
        public_id: file.replace(path.extname(file), ""),
        use_filename: true,
        overwrite: true,
      });

      console.log(`✅ Uploaded: ${file} → ${result.secure_url}`);
    } catch (err) {
      console.error(`❌ Failed to upload ${file}:`, err);
    }
  }
}

uploadVideos();
