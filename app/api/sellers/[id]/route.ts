import { NextResponse } from "next/server";
import { deleteSeller, getSellerById, updateSeller } from "@/app/lib/sellers";

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
      return NextResponse.json({ error: "Invalid seller id" }, { status: 400 });
    }

    const seller = await getSellerById(id);
    if (!seller) {
      return NextResponse.json({ error: "Seller not found" }, { status: 404 });
    }

    return NextResponse.json({ seller });
  } catch (error) {
    console.error("GET /api/sellers/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to fetch seller" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: Request, { params }: Ctx) {
  try {
    const { id } = await params;

    if (!isUuid(id)) {
      return NextResponse.json({ error: "Invalid seller id" }, { status: 400 });
    }

    const body = await req.json();

    const patch: {
      firstName?: string;
      lastName?: string;
      username?: string;
      email?: string;
      story?: string;
      image?: string;
    } = {};

    if (typeof body?.firstName === "string") patch.firstName = body.firstName;
    if (typeof body?.lastName === "string") patch.lastName = body.lastName;
    if (typeof body?.username === "string") patch.username = body.username;
    if (typeof body?.email === "string") patch.email = body.email;
    if (typeof body?.story === "string") patch.story = body.story;
    if (typeof body?.image === "string") patch.image = body.image;

    if (Object.keys(patch).length === 0) {
      return NextResponse.json(
        { error: "No valid fields provided to update" },
        { status: 400 },
      );
    }

    const seller = await updateSeller(id, patch);

    if (!seller) {
      return NextResponse.json({ error: "Seller not found" }, { status: 404 });
    }

    return NextResponse.json({ seller });
  } catch (error) {
    console.error("PATCH /api/sellers/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to update seller" },
      { status: 500 },
    );
  }
}

export async function DELETE(_: Request, { params }: Ctx) {
  try {
    const { id } = await params;

    if (!isUuid(id)) {
      return NextResponse.json({ error: "Invalid seller id" }, { status: 400 });
    }

    const existing = await getSellerById(id);
    if (!existing) {
      return NextResponse.json({ error: "Seller not found" }, { status: 404 });
    }

    await deleteSeller(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("DELETE /api/sellers/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to delete seller" },
      { status: 500 },
    );
  }
}
