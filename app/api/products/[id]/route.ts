import { NextResponse } from "next/server";
import {
  deleteProduct,
  getProductById,
  updateProduct,
} from "@/app/lib/products";

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  );
}

type Params = { id: string };
type Ctx = { params: Promise<Params> };

export async function GET(_: Request, { params }: Ctx) {
  try {
    const { id } = await params;

    if (!isUuid(id)) {
      return NextResponse.json(
        { error: "Invalid product id" },
        { status: 400 },
      );
    }

    const product = await getProductById(id);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ product });
  } catch (error) {
    console.error("GET /api/products/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: Request, { params }: Ctx) {
  try {
    const { id } = await params;

    if (!isUuid(id)) {
      return NextResponse.json(
        { error: "Invalid product id" },
        { status: 400 },
      );
    }

    const body = await req.json();

    // Only allow these fields to be updated
    const patch: {
      name?: string;
      price?: number;
      category?: string;
      shortDescription?: string;
      longDescription?: string;
      image?: string;
    } = {};

    if (typeof body?.name === "string") patch.name = body.name;

    if (body?.price !== undefined) {
      const priceNum = Number(body.price);
      if (!Number.isInteger(priceNum) || priceNum < 0) {
        return NextResponse.json(
          { error: "price must be an integer (cents) >= 0" },
          { status: 400 },
        );
      }
      patch.price = priceNum;
    }

    if (typeof body?.category === "string") patch.category = body.category;
    if (typeof body?.shortDescription === "string")
      patch.shortDescription = body.shortDescription;
    if (typeof body?.longDescription === "string")
      patch.longDescription = body.longDescription;
    if (typeof body?.image === "string") patch.image = body.image;

    if (Object.keys(patch).length === 0) {
      return NextResponse.json(
        { error: "No valid fields provided to update" },
        { status: 400 },
      );
    }

    const updated = await updateProduct(id, patch);

    if (!updated) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ product: updated });
  } catch (error) {
    console.error("PATCH /api/products/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 },
    );
  }
}

export async function DELETE(_: Request, { params }: Ctx) {
  try {
    const { id } = await params;

    if (!isUuid(id)) {
      return NextResponse.json(
        { error: "Invalid product id" },
        { status: 400 },
      );
    }

    const existing = await getProductById(id);
    if (!existing) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    await deleteProduct(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("DELETE /api/products/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 },
    );
  }
}
