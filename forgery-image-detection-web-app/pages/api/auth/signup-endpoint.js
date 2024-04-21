import mysql from "mysql2/promise";
import bcrypt from "bcrypt";

const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "fyp",
});

const registerAcc = async (newUser) => {
  try {
    const parsedNewUser = JSON.parse(newUser);
    const { username, email, contact, password } = parsedNewUser;

    // Check if email already exists in the database
    const [existingUsers] = await connection.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUsers.length > 0) {
      throw new Error("Email existed in the system. Please login instead.");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const [results] = await connection.query(
      "INSERT INTO users (username, email, contact, password) VALUES (?, ?, ?, ?)",
      [username, email, contact, hashedPassword]
    );

    console.log("User registered successfully");
    return results;
  } catch (error) {
    throw new Error(`Error registering user: ${error.message}`);
  }
};

export default async function handler(req, res) {
  try {
    const newUser = req.body;

    if (!newUser) {
      res.status(400).json({ message: "Invalid request: Body required" });
      return;
    }

    await registerAcc(newUser);

    res.status(201).json({ message: "Register successfully" });
  } catch (error) {
    if (error.message.includes("Email existed")) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Error registering new user." });
    }
  }
}
