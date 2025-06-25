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

const IMAGES_DIR = path.join(__dirname, "../public/top-10");

async function uploadImages() {
  const files = fs.readdirSync(IMAGES_DIR).filter((f) => f.endsWith(".jpg"));

  for (const file of files) {
    const filePath = path.join(IMAGES_DIR, file);

    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: "top10",
        public_id: file.replace(".jpg", ""), // e.g., "donghua (1)"
        use_filename: true,
        overwrite: true,
      });

      console.log(`✅ Uploaded: ${file} → ${result.secure_url}`);
    } catch (err) {
      console.error(`❌ Failed to upload ${file}:`, err);
    }
  }
}

uploadImages();
