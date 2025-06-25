import { NextResponse, type NextRequest } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { connectDB } from "@/lib/mongoose";
import { Movie } from "@/lib/models/Movie";

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
    let movies = await Movie.find({});

    if (movies.length === 0) {
      const cloudRes = await cloudinary.search
        .expression("folder:donghuas AND resource_type:image")
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

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { title, description, image, public_id } = body;

    if (!title || !image || !public_id) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newMovie = await Movie.create({
      title,
      description,
      image,
      public_id,
    });

    return NextResponse.json(newMovie);
  } catch (error) {
    console.error("POST /api/movies error:", error);
    return NextResponse.json({ error: "Failed to add movie" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    const { id } = await req.json();

    const movie = await Movie.findById(id);
    if (!movie) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }

    if (movie.public_id) {
      await cloudinary.uploader.destroy(movie.public_id);
    }

    await Movie.findByIdAndDelete(id);

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete", details: (error as Error).message },
      { status: 500 }
    );
  }
}
