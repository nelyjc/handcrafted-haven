import bcrypt from "bcrypt";
import postgres from "postgres";
import { sellers, products, reviews } from "../lib/placeholder-data";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

/* ------------------------
   SELLERS
------------------------ */
async function seedSellers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS sellers (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL,
      username VARCHAR(255) NOT NULL UNIQUE,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      story TEXT NOT NULL,
      image TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;

  const insertedSellers = await Promise.all(
    sellers.map(async (seller) => {
      const hashedPassword = await bcrypt.hash(seller.password, 10);

      return sql`
        INSERT INTO sellers (
          id,
          first_name,
          last_name,
          username,
          email,
          password,
          story,
          image
        )
        VALUES (
          ${seller.id},
          ${seller.firstName},
          ${seller.lastName},
          ${seller.username},
          ${seller.email},
          ${hashedPassword},
          ${seller.story},
          ${seller.image}
        )
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedSellers;
}

/* ------------------------
   PRODUCTS
------------------------ */
async function seedProducts() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      seller_id UUID NOT NULL REFERENCES sellers(id) ON DELETE CASCADE,
      name VARCHAR(255) NOT NULL,
      price INT NOT NULL,
      category VARCHAR(50) NOT NULL,
      image TEXT NOT NULL,
      short_description TEXT NOT NULL,
      long_description TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;

  const insertedProducts = await Promise.all(
    products.map(
      (product) => sql`
        INSERT INTO products (
          id,
          seller_id,
          name,
          price,
          category,
          image,
          short_description,
          long_description
        )
        VALUES (
          ${product.id},
          ${product.sellerId},
          ${product.name},
          ${product.price},
          ${product.category},
          ${product.image},
          ${product.shortDescription},
          ${product.longDescription}
        )
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedProducts;
}

/* ------------------------
   REVIEWS
------------------------ */
async function seedReviews() {
  await sql`
    CREATE TABLE IF NOT EXISTS reviews (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
      author_name VARCHAR(255) NOT NULL,
      rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
      comment TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;

  const insertedReviews = await Promise.all(
    reviews.map(
      (review) =>
        sql`
        INSERT INTO reviews (
          id,
          product_id,
          author_name,
          rating,
          comment
        )
        VALUES (
          ${review.id},
          ${review.productId},
          ${review.authorName},
          ${review.rating},
          ${review.comment}
        )
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedReviews;
}

/* ------------------------
   RUN SEED
------------------------ */
export async function GET() {
  try {
    await sql.begin(async () => {
      await seedSellers();
      await seedProducts();
      await seedReviews();
    });

    return Response.json({ message: "Database seeded successfully 🌱" });
  } catch (error) {
    console.error("Seed error:", error);
    return Response.json({ error: "Failed to seed database" }, { status: 500 });
  }
}
