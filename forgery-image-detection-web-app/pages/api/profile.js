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

const updateProfile = async (userId, updatedProfile) => {
  const { username, email, contact } = updatedProfile;
  try {
    await connection.execute(
      "UPDATE users SET username = ?, email = ?, contact = ? WHERE id = ?",
      [username, email, contact, userId]
    );
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

export default async function handler(req, res) {
  if (req.method === "GET") {
    const session = await getSession({ req });

    console.log(session);

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
  } else if (req.method === "PUT") {
    try {
      // const session = await getSession({ req: req });
      // console.log(session);
      const userId = req.body.userId;
      const updatedProfile = req.body.editedProfile;
      if (userId < 0 || !updatedProfile) {
        res
          .status(400)
          .json({ message: "Invalid request: ID and profile required" });
        return;
      }

      await updateProfile(userId, updatedProfile);
      res.status(200).json({
        message: "Profile updated successfully",
      });
    } catch (error) {
      res.status(500).json({ message: "Error updating profile" });
    }
  }
}
