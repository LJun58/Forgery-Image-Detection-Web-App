import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { email, password } = credentials;

        const connection = await mysql.createConnection({
          host: process.env.MYSQL_HOST,
          user: process.env.MYSQL_USER,
          password: process.env.MYSQL_PASSWORD,
          database: process.env.MYSQL_DATABASE,
        });

        try {
          // Fetch user from the database
          const [rows] = await connection.execute(
            "SELECT id, email, password FROM users WHERE email = ?",
            [email]
          );
          const user = rows[0];

          // Close the database connection
          await connection.end();

          // If user not found or password doesn't match, throw error
          if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error("Invalid email or password");
          }

          // Return user ID as token
          const token = { userId: user.id };
          return Promise.resolve(token);
        } catch (error) {
          // Handle errors
          console.error("Error:", error);
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt(token, user) {
      // If user is authenticated, add user data to token
      if (user) {
        token.userId = user.userId;
      }
      return token;
    },
    async session(session) {
      // Assign userId from token to session.user
      session.session.user = {
        ...session.session.user,
        userId: session.token.token.user.userId,
      };

      // Delete the token property after extracting user data
      delete session.token;

      return session;
    },
  },
});
