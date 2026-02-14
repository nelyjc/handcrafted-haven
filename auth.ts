import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcrypt";
import postgres from "postgres";
import { authConfig } from "./auth.config";
import type { Seller } from "@/app/lib/definitions";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function getUser(email: string): Promise<Seller | null> {
  try {
    const result = await sql<Seller[]>`
      SELECT * FROM sellers WHERE email = ${email}
    `;
    return result[0] ?? null;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,

  session: {
    strategy: "jwt", 
  },

  providers: [
    Credentials({
      async authorize(credentials) {
        const parsed = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        const seller = await getUser(email);
        if (!seller) return null;

        const isValid = await bcrypt.compare(password, seller.password);
        if (!isValid) return null;

        
        return {
          id: seller.id,
          email: seller.email,
          name: seller.firstName,
          image: seller.image ?? null,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
