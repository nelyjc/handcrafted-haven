import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard/profile");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      }
      return true;
    },

  
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub; 
      }
      return session;
    },

  
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id; 
      }
      return token;
    },
  },
  providers: [], 
} satisfies NextAuthConfig;
