import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import { User } from "@/lib/models/User";

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  await User.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "User deleted" });
}
