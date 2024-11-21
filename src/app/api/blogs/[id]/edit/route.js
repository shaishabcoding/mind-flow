import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDatabase } from "@/lib/db";

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid Blog ID" }, { status: 400 });
    }

    const body = await req.json();
    const { name, image, description, date } = body;

    if (!name && !image && !description && !date) {
      return NextResponse.json(
        {
          error:
            "At least one field (name, image, description, date) must be provided",
        },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const collection = db.collection("blogs");

    const updateData = {};
    if (name) updateData.name = name;
    if (image) updateData.image = image;
    if (description) updateData.description = description;
    if (date) updateData.date = date;

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Blog updated successfully", result },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating Blog:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
