import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          // Create a MySQL connection
          const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
          });

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

          return user;
        } catch (error) {
          // Handle errors
          console.error("Error:", error);
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    strict: false,
    jwt: true,
  },
  callbacks: {
    async session({ session, user, token }) {
      // console.log("token:", token);
      if (token) {
        session.user.email = token.email;
        session.user.id = token.sub;
        session.user.accessToken = token.accessToken;
      }
      return session;
    },
    async jwt({ token, user, account, profile }) {
      // Generate an access token using JWT
      if (user) {
        const accessToken = jwt.sign(
          { userId: user.id },
          process.env.NEXTAUTH_SECRET,
          { expiresIn: "1h" }
        ); // Replace with your desired expiration time
        token.accessToken = accessToken; // Add access token to the token object
        token.role = user.role; // Include role if available in the user object
      }
      return token;
    },
  },
});
