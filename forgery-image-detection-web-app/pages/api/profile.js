// profile.js (or your API endpoint file)

import { getSession } from "next-auth/react";
import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "fyp",
});

const retrieveProfile = async (userId) => {
  try {
    const [rows] = await connection.execute(
      "SELECT username, email, contact FROM users WHERE id = ?",
      [userId]
    );
    return rows[0];
  } catch (error) {
    console.error("Error retrieving profile:", error);
    throw error;
  }
};

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userId = session.user.id;

  try {
    const profile = await retrieveProfile(userId);
    if (profile) {
      res.status(200).json(profile);
    } else {
      res.status(404).json({ message: "Profile not found" });
    }
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
