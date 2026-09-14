import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const userList = [{ id: "1", name: "ali", password: "123456", secretCode: "1478" }];

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    // ...add more providers here
    CredentialsProvider({
      //Sign in with {name} button
      name: "Email & Password",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "enter password",
        },
        secretCode: {
          label: "secret code",
          type: "number",
          placeholder: "enter code",
        },
      },
      async authorize(credentials) {
        const { username, password } = credentials || {};

        const user = userList.find((u) => u.name === username);

        if (!user) return null;

        if (user.password !== password) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
        };
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
