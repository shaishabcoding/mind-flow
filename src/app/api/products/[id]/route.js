import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/db";
import { ObjectId } from "mongodb";

export async function GET(_req, { params }) {
  const { id } = await params;

  try {
    const db = await getDatabase();
    const collection = db.collection("products");

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid product ID" },
        { status: 400 }
      );
    }

    const product = await collection.findOne({ _id: new ObjectId(id) });

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: product }, { status: 200 });
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
