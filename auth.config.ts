import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/profile");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      }
      return true;
    },

    // 👇 Aquí agregas el id del usuario a la sesión
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub; // token.sub es el user.id de la DB
      }
      return session;
    },

    // 👇 Opcional: asegurar que el JWT tenga el id
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id; // user.id viene de authorize()
      }
      return token;
    },
  },
  providers: [], // tus providers
} satisfies NextAuthConfig;
