import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const { link } = body;

    if (!link) {
      return NextResponse.json(
        {
          error: "All fields are required: link",
        },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const collection = db.collection("media");

    const result = await collection.insertOne({
      link,
    });

    return NextResponse.json(
      { message: "Media created successfully", result },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating media:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
