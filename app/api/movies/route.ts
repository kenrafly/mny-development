import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import { Movie } from "@/lib/models/Movie";

export async function GET() {
  try {
    await connectDB();
    const movies = await Movie.find({});
    return NextResponse.json(movies);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch movies", details: err },
      { status: 500 }
    );
  }
}
