import sql from "./db";

// set Product type to match database schema
export type Product = {
  id: string;
  seller_id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  short_description: string;
  long_description: string;
  created_at: string;
};

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

export async function getAllProductsPaginated(
  page: number,
  pageSize: number,
  filters?: { categories?: string[]; search?: string; minPrice?: number; maxPrice?: number; sort?: string },
): Promise<{
  products: Product[];
  totalCount: number;
  totalPages: number;
  pagesLeft: number;
}> {
  const offset = (page - 1) * pageSize;

  // build WHERE clauses based on filters
  const whereClauses: any[] = [];
  if (filters?.categories && filters.categories.length) {
    whereClauses.push(sql`category = ANY(${filters.categories})`);
  }
  if (filters?.search) {
    const q = `%${filters.search}%`;
    whereClauses.push(sql`(name ILIKE ${q} OR short_description ILIKE ${q})`);
  }
  if (typeof filters?.minPrice === "number") {
    whereClauses.push(sql`price >= ${filters.minPrice * 100}`);
  }
  if (typeof filters?.maxPrice === "number") {
    whereClauses.push(sql`price <= ${filters.maxPrice * 100}`);
  }

  // Compose WHERE fragment without relying on `sql.join` (not available in this environment)
  let whereFragment = sql``;
  if (whereClauses.length) {
    whereFragment = whereClauses.reduce((acc, clause, idx) => {
      if (idx === 0) return sql`WHERE ${clause}`;
      return sql`${acc} AND ${clause}`;
    }, sql``);
  }

  // Build ORDER BY clause based on sort parameter
  let orderBy = sql`created_at DESC`;
  if (filters?.sort === "price-low") {
    orderBy = sql`price ASC`;
  } else if (filters?.sort === "price-high") {
    orderBy = sql`price DESC`;
  }
  // default is newest (created_at DESC)

  const productsRaw = await sql`
    SELECT *
    FROM products
    ${whereFragment}
    ORDER BY ${orderBy}
    LIMIT ${pageSize} OFFSET ${offset};
  `;

  const products: Product[] = productsRaw.map((row: any) => ({
    id: row.id,
    seller_id: row.seller_id,
    name: row.name,
    price: Number(row.price) / 100, // convert cents to dollars
    category: row.category,
    image: row.image,
    short_description: row.short_description,
    long_description: row.long_description,
    created_at: row.created_at.toISOString(),
  }));

  const totalResult = await sql`
    SELECT COUNT(*) AS count
    FROM products
    ${whereFragment};
  `;

  const totalCount = Number(totalResult[0]?.count ?? 0);
  const totalPages = Math.ceil(totalCount / pageSize);
  const pagesLeft = Math.max(0, totalPages - page);

  return { products, totalCount, totalPages, pagesLeft };
}

export async function getProductById(id: string): Promise<Product | null> {
  const result = await sql`
    SELECT *
    FROM products
    WHERE id = ${id};
  `;

  if (result.length === 0) {
    return null;
  }

  const row = result[0];
  const product: Product = {
    id: row.id,
    seller_id: row.seller_id,
    name: row.name,
    price: Number(row.price) / 100, // convert cents to dollars
    category: row.category,
    image: row.image,
    short_description: row.short_description,
    long_description: row.long_description,
    created_at: row.created_at.toISOString(),
  };

  return product;
}

export async function getProductsBySeller(sellerId: string): Promise<Product[]> {
  const result = await sql`
    SELECT *
    FROM products
    WHERE seller_id = ${sellerId}
    ORDER BY created_at DESC;
  `;

  return result.map((row: any) => ({
    id: row.id,
    seller_id: row.seller_id,
    name: row.name,
    price: Number(row.price) / 100, // convert cents to dollars to match the way price is handled in add products
    category: row.category,
    image: row.image,
    short_description: row.short_description,
    long_description: row.long_description,
    created_at: row.created_at.toISOString(),
  }));
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
