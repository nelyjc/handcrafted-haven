import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { createSeller, getAllSellers } from "@/app/lib/sellers";

export async function GET() {
  try {
    const sellers = await getAllSellers();
    return NextResponse.json({ sellers });
  } catch (error) {
    console.error("GET /api/sellers error:", error);
    return NextResponse.json(
      { error: "Failed to fetch sellers" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, username, email, password, story, image } =
      body ?? {};

    if (!firstName || typeof firstName !== "string") {
      return NextResponse.json(
        { error: "firstName is required" },
        { status: 400 },
      );
    }
    if (!lastName || typeof lastName !== "string") {
      return NextResponse.json(
        { error: "lastName is required" },
        { status: 400 },
      );
    }
    if (!username || typeof username !== "string") {
      return NextResponse.json(
        { error: "username is required" },
        { status: 400 },
      );
    }
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "email is required" }, { status: 400 });
    }
    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { error: "password is required" },
        { status: 400 },
      );
    }
    if (!story || typeof story !== "string") {
      return NextResponse.json({ error: "story is required" }, { status: 400 });
    }
    if (!image || typeof image !== "string") {
      return NextResponse.json({ error: "image is required" }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const seller = await createSeller({
      firstName,
      lastName,
      username,
      email,
      passwordHash,
      story,
      image,
    });

    return NextResponse.json({ seller }, { status: 201 });
  } catch (error) {
    console.error("POST /api/sellers error:", error);
    return NextResponse.json(
      { error: "Failed to create seller" },
      { status: 500 },
    );
  }
}
