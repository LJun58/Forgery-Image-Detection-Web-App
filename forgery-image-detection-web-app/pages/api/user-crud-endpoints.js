import mysql from "mysql2/promise";
import { getSession } from "next-auth/react";

const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "fyp",
});

const retriveProfile = async (userId) => {
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
  const { method } = req;
  // const queryObj = req.query;
  try {
    switch (method) {
      case "GET": {
        console.log("aaaa");
        const session = await getSession({ req });
        console.log(session);
        if (!session) {
          return res.status(401).json({ message: "Unauthorized" });
        }

        try {
          const profile = await retriveProfile(session.user.userId);
          res.status(200).json(profile);
        } catch (error) {
          console.error("Error retrieving profile:", error);
          res.status(500).json({ message: "Error retrieving profile" });
        }
        break;
      }
      case "POST": {
        // try {
        //   const newUser = req.body;

        //   if (!newUser) {
        //     res.status(400).json({ message: "Invalid request: Body required" });
        //     return;
        //   }
        //   await registerAcc(newUser);
        //   res.status(201).json({ message: "Register successfully" });
        // } catch (error) {
        //   res.status(500).json({ message: "Error registering new user." });
        // }
        break;
      }
      case "PUT": {
        // try {
        //   const id = req.body.id;
        //   const editedTodo = req.body.editedTodo;
        //   if (id < 0 || !editedTodo) {
        //     res
        //       .status(400)
        //       .json({ message: "Invalid request: ID and todoItem required" });
        //     return;
        //   }

        //   await updateTodo(id, editedTodo);
        //   res.status(200).json({
        //     message: "Todo updated successfully",
        //   });
        // } catch (error) {
        //   res.status(500).json({ message: "Error updating todo" });
        // }
        break;
      }
      case "DELETE": {
        // try {
        //   const deleteId = req.body.id;
        //   if (typeof deleteId !== "number" || deleteId < 0) {
        //     res.status(400).json({ message: "Invalid request: ID required" });
        //     return;
        //   }
        //   await deleteTodo(deleteId);
        //   res.status(200).json({ message: "Todo deleted successfully" });
        // } catch (error) {
        //   res.status(500).json({ message: "Error deleting todo" });
        // }
        break;
      }
      default:
        res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
