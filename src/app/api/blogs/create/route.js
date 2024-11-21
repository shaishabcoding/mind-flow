import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, image, description, date } = body;

    if (!name || !image || !description || !date) {
      return NextResponse.json(
        {
          error: "All fields are required: name, images, description, date",
        },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const collection = db.collection("blogs");

    const result = await collection.insertOne({
      name,
      image,
      description,
      date,
    });

    return NextResponse.json(
      { message: "Blog created successfully", result },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
