import { connectDB } from "@/lib/mongoose";
import { Movie } from "@/lib/models/Movie"; // ✅ You forgot this import
import { v2 as cloudinary } from "cloudinary"; // ✅ You also need to configure Cloudinary
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const movie = await Movie.findById(params.id);
    if (!movie) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }

    // ✅ Delete from Cloudinary using stored public_id
    if (movie.public_id) {
      await cloudinary.uploader.destroy(movie.public_id);
    }

    // ✅ Delete from MongoDB
    await Movie.findByIdAndDelete(params.id);

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("DELETE error:", err);
    return NextResponse.json(
      { error: "Failed to delete movie", details: err },
      { status: 500 }
    );
  }
}
