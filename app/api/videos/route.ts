import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { connectDB } from "@/lib/mongoose";
import { Video } from "@/lib/models/Videos";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});
interface CloudinaryResource {
  asset_id: string;
  public_id: string;
  secure_url: string;
}
export async function GET() {
  try {
    await connectDB();
    let movies = await Video.find({});

    if (movies.length === 0) {
      const cloudRes = await cloudinary.search
        .expression("folder:donghua_vidoes AND resource_type:video")
        .sort_by("public_id", "asc")
        .max_results(200)
        .execute();

      const resources: CloudinaryResource[] = cloudRes.resources;

      movies = resources.map((item) => ({
        _id: item.asset_id,
        title:
          item.public_id.split("/").pop()?.replace(/[-_]/g, " ") || "Untitled",
        description: "",
        image: item.secure_url,
      }));
    }

    return NextResponse.json(movies);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch movies", details: err },
      { status: 500 }
    );
  }
}
