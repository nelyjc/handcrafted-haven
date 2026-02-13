import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
});

export const { GET, POST } = handlers;
