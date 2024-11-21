import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDatabase } from "@/lib/db";

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { name, image, description, price } = body;

    if (
      !name &&
      !image &&
      !description &&
      (price === undefined || price === null)
    ) {
      return NextResponse.json(
        {
          error:
            "At least one field (name, image, description, price) must be provided",
        },
        { status: 400 }
      );
    }

    if (price !== undefined && (typeof price !== "number" || price <= 0)) {
      return NextResponse.json(
        { error: "Price must be a positive number" },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const collection = db.collection("products");

    const updateData = {};
    if (name) updateData.name = name;
    if (image) updateData.image = image;
    if (description) updateData.description = description;
    if (price !== undefined) updateData.price = price;

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Product updated successfully", result },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
