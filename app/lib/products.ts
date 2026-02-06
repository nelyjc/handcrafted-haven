import sql from "./db";

/* ======================
   READ
====================== */
export async function getAllProducts() {
  return sql`
    SELECT *
    FROM products
    ORDER BY created_at DESC;
  `;
}

export async function getProductById(id: string) {
  const result = await sql`
    SELECT *
    FROM products
    WHERE id = ${id};
  `;

  return result[0];
}

export async function getProductsBySeller(sellerId: string) {
  return sql`
    SELECT *
    FROM products
    WHERE seller_id = ${sellerId}
    ORDER BY created_at DESC;
  `;
}

/* ======================
   CREATE
====================== */
export async function createProduct({
  sellerId,
  name,
  price,
  category,
  shortDescription,
  longDescription,
  image,
}: {
  sellerId: string;
  name: string;
  price: number;
  category: string;
  shortDescription: string;
  longDescription: string;
  image: string;
}) {
  const result = await sql`
        INSERT INTO products (
            seller_id,
            name,
            price,
            category,
            short_description,
            long_description,
            image
        )
        VALUES (
            ${sellerId},
            ${name},
            ${price},
            ${category},
            ${shortDescription},
            ${longDescription},
            ${image}
        )
        RETURNING *;
    `;

  return result[0];
}

/* ======================
   UPDATE
====================== */
export async function updateProduct(
  id: string,
  {
    name,
    price,
    category,
    shortDescription,
    longDescription,
    image,
  }: {
    name?: string;
    price?: number;
    category?: string;
    shortDescription?: string;
    longDescription?: string;
    image?: string;
  },
) {
  const result = await sql`
    UPDATE products
    SET
      name = COALESCE(${name ?? null}, name),
      price = COALESCE(${price ?? null}, price),
      category = COALESCE(${category ?? null}, category),
      short_description = COALESCE(${shortDescription ?? null}, short_description),
      long_description = COALESCE(${longDescription ?? null}, long_description),
      image = COALESCE(${image ?? null}, image)
    WHERE id = ${id}
    RETURNING *;
  `;

  return result[0];
}

/* ======================
   DELETE
====================== */
export async function deleteProduct(id: string) {
  await sql`
        DELETE FROM products
        WHERE id = ${id};
    `;
}
