import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { connectDB } from "@/lib/mongoose";
import { Movie } from "@/lib/models/Movie";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function GET() {
  try {
    await connectDB();
    let movies = await Movie.find({});

    if (movies.length === 0) {
      const cloudRes = await cloudinary.search
        .expression("folder:allDonghuas AND resource_type:image")
        .sort_by("public_id", "asc")
        .max_results(200)
        .execute();

      movies = cloudRes.resources.map((item: any) => ({
        _id: item.asset_id,
        title: item.public_id.split("/").pop().replace(/[-_]/g, " "),
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
