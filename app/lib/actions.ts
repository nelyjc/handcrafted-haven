'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { tr } from 'zod/locales';
import getSellerId from './data';
import { sql } from 'postgres';

const ProductSchema = z.object({
  title: z.string().min(2, 'Please enter a valid tittle'),
  description: z.string().min(10, 'Description is too short'),
  price: z.coerce.number().min(1, 'Please enter an amount greater than $1.'),
  imageUrl: z.string().optional().or(z.literal('')),
});

export async function createProduct(formData: FormData) {
  const validateFields = ProductSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    price: formData.get('price'),
    imageUrl: formData.get('imageUrl'),
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Product.',
    };
  }

  const sellerId = getSellerId();
  const { title, description, price, imageUrl } = validateFields.data;
  const amountInCents = price * 100;
  const newProduct = {
    id: sellerId,
    sellerId,
    title,
    description,
    priceCents: amountInCents,
    imageUrl,
    createdAt: new Date().toISOString(),
  };
  try {
    await sql `INSERT INTO products
    (id, seller_id, title, description, price_cents, image_url, created_at)
    VALUES (
      ${newProduct.id},
      ${newProduct.sellerId},
      ${newProduct.title},
      ${newProduct.description},
      ${newProduct.priceCents},
      ${newProduct.imageUrl},
      ${newProduct.createdAt}
    )`;
  } catch (error) {
    throw new Error('Database Error: Failed to create product');
  }

  revalidatePath('/dashboard/seller/products');
  redirect('/dashboard/seller/products');
}
