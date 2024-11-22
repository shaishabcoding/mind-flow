import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/db";
import { ObjectId } from "mongodb";

export async function GET(_req, { params }) {
  const { id } = await params;

  try {
    const db = await getDatabase();
    const collection = db.collection("blogs");

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid blog ID" },
        { status: 400 }
      );
    }

    const blog = await collection.findOne({ _id: new ObjectId(id) });

    if (!blog) {
      return NextResponse.json(
        { success: false, error: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: blog }, { status: 200 });
  } catch (error) {
    console.error("Error fetching blog by ID:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
