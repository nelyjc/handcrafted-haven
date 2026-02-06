import { NextResponse } from "next/server";
import { deleteReview, getReviewById, updateReview } from "@/app/lib/reviews";

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
      return NextResponse.json({ error: "Invalid review id" }, { status: 400 });
    }

    const review = await getReviewById(id);
    if (!review) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    return NextResponse.json({ review });
  } catch (error) {
    console.error("GET /api/reviews/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to fetch review" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: Request, { params }: Ctx) {
  try {
    const { id } = await params;

    if (!isUuid(id)) {
      return NextResponse.json({ error: "Invalid review id" }, { status: 400 });
    }

    const body = await req.json();

    const patch: {
      authorName?: string;
      rating?: number;
      comment?: string;
    } = {};

    if (typeof body?.authorName === "string")
      patch.authorName = body.authorName;

    if (body?.rating !== undefined) {
      const ratingNum = Number(body.rating);
      if (!Number.isInteger(ratingNum) || ratingNum < 1 || ratingNum > 5) {
        return NextResponse.json(
          { error: "rating must be an integer 1–5" },
          { status: 400 },
        );
      }
      patch.rating = ratingNum;
    }

    if (typeof body?.comment === "string") patch.comment = body.comment;

    if (Object.keys(patch).length === 0) {
      return NextResponse.json(
        { error: "No valid fields provided to update" },
        { status: 400 },
      );
    }

    const updated = await updateReview(id, patch);

    if (!updated) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    return NextResponse.json({ review: updated });
  } catch (error) {
    console.error("PATCH /api/reviews/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to update review" },
      { status: 500 },
    );
  }
}

export async function DELETE(_: Request, { params }: Ctx) {
  try {
    const { id } = await params;

    if (!isUuid(id)) {
      return NextResponse.json({ error: "Invalid review id" }, { status: 400 });
    }

    const existing = await getReviewById(id);
    if (!existing) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    await deleteReview(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("DELETE /api/reviews/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to delete review" },
      { status: 500 },
    );
  }
}
