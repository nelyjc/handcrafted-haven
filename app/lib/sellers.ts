import sql from "./db";

/* ======================
   READ
====================== */

export async function getAllSellers() {
  return sql`
    SELECT
      id,
      first_name,
      last_name,
      username,
      email,
      story,
      image,
      created_at
    FROM sellers
    ORDER BY created_at DESC;
  `;
}

export async function getSellerById(id: string) {
  const result = await sql`
    SELECT
      id,
      first_name,
      last_name,
      username,
      email,
      story,
      image,
      created_at
    FROM sellers
    WHERE id = ${id};
  `;
  return result[0];
}

export async function getSellerByEmail(email: string) {
  const result = await sql`
    SELECT *
    FROM sellers
    WHERE email = ${email};
  `;
  return result[0];
}

/* ======================
   CREATE
====================== */
export async function createSeller({
  firstName,
  lastName,
  username,
  email,
  passwordHash,
  story,
  image,
}: {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  passwordHash: string;
  story: string;
  image: string;
}) {
  const result = await sql`
    INSERT INTO sellers (
      first_name,
      last_name,
      username,
      email,
      password,
      story,
      image
    )
    VALUES (
      ${firstName},
      ${lastName},
      ${username},
      ${email},
      ${passwordHash},
      ${story},
      ${image}
    )
    RETURNING
      id,
      first_name,
      last_name,
      username,
      email,
      story,
      image,
      created_at;
  `;

  return result[0];
}

/* ======================
   UPDATE (no password here)
====================== */

export async function updateSeller(
  id: string,
  {
    firstName,
    lastName,
    username,
    email,
    story,
    image,
  }: {
    firstName?: string;
    lastName?: string;
    username?: string;
    email?: string;
    story?: string;
    image?: string;
  },
) {
  const result = await sql`
    UPDATE sellers
    SET
      first_name = COALESCE(${firstName ?? null}, first_name),
      last_name = COALESCE(${lastName ?? null}, last_name),
      username = COALESCE(${username ?? null}, username),
      email = COALESCE(${email ?? null}, email),
      story = COALESCE(${story ?? null}, story),
      image = COALESCE(${image ?? null}, image)
    WHERE id = ${id}
    RETURNING
      id,
      first_name,
      last_name,
      username,
      email,
      story,
      image,
      created_at;
  `;

  return result[0];
}

/* ======================
   DELETE
====================== */

export async function deleteSeller(id: string) {
  await sql`
    DELETE FROM sellers
    WHERE id = ${id};
  `;
}
