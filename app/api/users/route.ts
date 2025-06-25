import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import { User } from "@/lib/models/User";

export async function GET() {
  await connectDB();
  const users = await User.find().sort({ createdAt: -1 });
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const user = await User.create(body);
  return NextResponse.json(user);
}
