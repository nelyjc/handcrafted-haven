import { NextResponse } from "next/server";
import { createReview, getReviewsByProduct } from "@/app/lib/reviews";

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  );
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    if (!productId || !isUuid(productId)) {
      return NextResponse.json(
        { error: "productId (UUID) query param is required" },
        { status: 400 },
      );
    }

    const reviews = await getReviewsByProduct(productId);
    return NextResponse.json({ reviews });
  } catch (error) {
    console.error("GET /api/reviews error:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productId, authorName, rating, comment } = body ?? {};

    if (!productId || !isUuid(String(productId))) {
      return NextResponse.json(
        { error: "Valid productId (UUID) is required" },
        { status: 400 },
      );
    }

    if (!authorName || typeof authorName !== "string") {
      return NextResponse.json(
        { error: "authorName is required" },
        { status: 400 },
      );
    }

    const ratingNum = Number(rating);
    if (!Number.isInteger(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return NextResponse.json(
        { error: "rating must be an integer 1–5" },
        { status: 400 },
      );
    }

    if (!comment || typeof comment !== "string") {
      return NextResponse.json(
        { error: "comment is required" },
        { status: 400 },
      );
    }

    const review = await createReview({
      productId,
      authorName,
      rating: ratingNum,
      comment,
    });

    return NextResponse.json({ review }, { status: 201 });
  } catch (error) {
    console.error("POST /api/reviews error:", error);
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 },
    );
  }
}
