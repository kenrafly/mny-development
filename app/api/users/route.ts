import { NextResponse, type NextRequest } from "next/server";
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

export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    const { id } = await req.json();
    await User.findByIdAndDelete(id);
    return NextResponse.json({ message: "User deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete user", details: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const updatedUser = await User.findByIdAndUpdate(
      body._id,
      {
        user: body.user,
        plan: body.plan,
        dateJoined: body.dateJoined,
        dateEnded: body.dateEnded,
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(updatedUser);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update user", details: (err as Error).message },
      { status: 500 }
    );
  }
}
