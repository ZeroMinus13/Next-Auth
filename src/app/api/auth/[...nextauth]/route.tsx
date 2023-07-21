import NextAuth, { NextAuthOptions, Profile, Account } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

interface AuthCallbacks {
  signIn: (params: { account: Account; profile: any }) => Promise<boolean> | boolean;
}
export const authOptions: NextAuthOptions & { callbacks: AuthCallbacks } = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === 'google') {
        return profile?.email_verified && profile?.email.endsWith('@gmail.com');
      }
      return true;
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
