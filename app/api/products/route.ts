import { NextResponse } from "next/server";
import { createProduct, getAllProducts } from "@/app/lib/products";

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  );
}

export async function GET() {
  try {
    const products = await getAllProducts();
    return NextResponse.json({ products });
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      sellerId,
      name,
      price,
      category,
      shortDescription,
      longDescription,
      image,
    } = body ?? {};

    // Basic validation
    if (!sellerId || !isUuid(String(sellerId))) {
      return NextResponse.json(
        { error: "Valid sellerId (UUID) is required" },
        { status: 400 },
      );
    }

    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "name is required" }, { status: 400 });
    }

    const priceNum = Number(price);
    if (!Number.isInteger(priceNum) || priceNum < 0) {
      return NextResponse.json(
        { error: "price must be an integer (cents) >= 0" },
        { status: 400 },
      );
    }

    if (!category || typeof category !== "string") {
      return NextResponse.json(
        { error: "category is required" },
        { status: 400 },
      );
    }

    if (!shortDescription || typeof shortDescription !== "string") {
      return NextResponse.json(
        { error: "shortDescription is required" },
        { status: 400 },
      );
    }

    if (!longDescription || typeof longDescription !== "string") {
      return NextResponse.json(
        { error: "longDescription is required" },
        { status: 400 },
      );
    }

    if (!image || typeof image !== "string") {
      return NextResponse.json({ error: "image is required" }, { status: 400 });
    }

    const product = await createProduct({
      sellerId,
      name,
      price: priceNum,
      category,
      shortDescription,
      longDescription,
      image,
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error("POST /api/products error:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 },
    );
  }
}
