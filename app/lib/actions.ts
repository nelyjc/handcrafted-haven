'use server';
 
import { redirect } from "next/navigation";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createProduct as dbCreateProduct } from "@/app/lib/products";
import { requireSeller } from './authz';

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
  formData: FormData,
): Promise<ActionState> {
  const seller = await requireSeller();
  const sellerId = seller.id;
  
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
