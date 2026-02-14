// app/api/reviews/route.ts/* ======================
//This is perfect now//
import { NextResponse } from "next/server";
import { z } from "zod";
import { createReview } from "@/app/lib/reviews";

export const dynamic = "force-dynamic";

const BodySchema = z.object({
  productId: z.string().min(1),
  authorName: z.string().min(1).max(255),
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(1).max(2000),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = BodySchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid review data", issues: parsed.error.issues },
        { status: 400 }
      );
    }

    await createReview(parsed.data);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("POST /api/reviews error:", err);
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
  }
}
