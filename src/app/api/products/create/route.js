import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, image, description, price } = body;

    if (!name || !image || !description || !price) {
      return NextResponse.json(
        {
          error: "All fields are required: name, images, description, price",
        },
        { status: 400 }
      );
    }

    if (typeof price !== "number" || price <= 0) {
      return NextResponse.json(
        { error: "Price must be a positive number" },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const collection = db.collection("products");

    const result = await collection.insertOne({
      name,
      image,
      description,
      price,
    });

    return NextResponse.json(
      { message: "Product created successfully", result },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
