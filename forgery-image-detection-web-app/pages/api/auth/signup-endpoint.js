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
    const hashedPassword = await bcrypt.hash(parsedNewUser.password, 10);

    const [results] = await connection.query(
      "INSERT INTO users (username, email, contact, password) VALUES (?, ?, ?, ?)",
      [
        parsedNewUser.username,
        parsedNewUser.email,
        parsedNewUser.contact,
        hashedPassword,
      ]
    );
    console.log("User registered successfully");
    return results;
  } catch (error) {
    console.error("Error registering user:", error.message);
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
    res.status(500).json({ message: "Error registering new user." });
  }
}
