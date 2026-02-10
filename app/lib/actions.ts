"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import getSellerId from "@/app/lib/data";
import { createProduct as dbCreateProduct } from "@/app/lib/products";
import { updateSeller } from "@/app/lib/sellers";


export type ActionState =
  | { ok: true }
  | {
      ok: false;
      message: string;
      fieldErrors?: Record<string, string[]>;
    };


const CreateProductSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  priceDollars: z.coerce.number().min(0, "Price must be 0 or more."),
  category: z.string().min(2, "Category is required."),
  shortDescription: z.string().min(5, "Description is too short."),
  longDescription: z.string().min(10, "Description is too short."),
  image: z.string().min(1, "Image URL is required."),
});

export async function createDashboardProduct(
  _prevState: ActionState | undefined,
  formData: FormData,
): Promise<ActionState> {
  const parsed = CreateProductSchema.safeParse({
    name: formData.get("name"),
    priceDollars: formData.get("priceDollars"),
    category: formData.get("category"),
    shortDescription: formData.get("shortDescription"),
    longDescription: formData.get("longDescription"),
    image: formData.get("image"),
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please fix the errors and try again.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const sellerId = getSellerId();
  const { name, priceDollars, category, shortDescription, longDescription, image } =
    parsed.data;

 
  const priceCents = Math.round(priceDollars * 100);

  try {
    await dbCreateProduct({
      sellerId,
      name,
      price: priceCents,
      category,
      shortDescription,
      longDescription,
      image,
    });
  } catch (e) {
    return { ok: false, message: "Database error: failed to create product." };
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
}

const UpdateStorySchema = z.object({
  story: z.string().min(10, "Story must be at least 10 characters."),
  image: z.string().optional(),
});

export async function updateDashboardSellerProfile(
  _prevState: ActionState | undefined,
  formData: FormData,
): Promise<ActionState> {
  const parsed = UpdateStorySchema.safeParse({
    story: formData.get("story"),
    image: formData.get("image") || undefined,
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please fix the errors and try again.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const sellerId = getSellerId();

  try {
    await updateSeller(sellerId, {
      story: parsed.data.story,
      image: parsed.data.image,
    });
  } catch (e) {
    return { ok: false, message: "Database error: failed to update profile." };
  }

  revalidatePath("/dashboard/profile");
  redirect("/dashboard/profile");
}
