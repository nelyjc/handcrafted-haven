import sql from "./db";

/* ======================
   READ
====================== */
export async function getReviewsByProduct(productId: string) {
  return sql`
    SELECT *
    FROM reviews
    WHERE product_id = ${productId}
    ORDER BY created_at DESC;
  `;
}

export async function getReviewById(id: string) {
  const result = await sql`
    SELECT *
    FROM reviews
    WHERE id = ${id};
  `;
  return result[0];
}

/* ======================
   CREATE
====================== */
export async function createReview({
  productId,
  authorName,
  rating,
  comment,
}: {
  productId: string;
  authorName: string;
  rating: number;
  comment: string;
}) {
  const result = await sql`
    INSERT INTO reviews (
      product_id,
      author_name,
      rating,
      comment
    )
    VALUES (
      ${productId},
      ${authorName},
      ${rating},
      ${comment}
    )
    RETURNING *;
  `;

  return result[0];
}

export async function updateReview(
  id: string,
  {
    authorName,
    rating,
    comment,
  }: {
    authorName?: string;
    rating?: number;
    comment?: string;
  },
) {
  const result = await sql`
    UPDATE reviews
    SET
      author_name = COALESCE(${authorName ?? null}, author_name),
      rating = COALESCE(${rating ?? null}, rating),
      comment = COALESCE(${comment ?? null}, comment)
    WHERE id = ${id}
    RETURNING *;
  `;

  return result[0];
}

/* ======================
   DELETE
====================== */
export async function deleteReview(id: string) {
  await sql`
    DELETE FROM reviews
    WHERE id = ${id};
  `;
}
