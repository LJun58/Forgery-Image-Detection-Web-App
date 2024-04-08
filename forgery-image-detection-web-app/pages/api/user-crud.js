import mysql from "mysql2/promise";
import { signIn } from "@auth";

const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "fyp",
});

const registerAcc = async (newUser) => {
  try {
    const parsedNewUser = JSON.parse(newUser);
    const [results] = await connection.query(
      "INSERT INTO users (username, email, contact, password) VALUES (?, ?, ?, ?)",
      [
        parsedNewUser.username,
        parsedNewUser.email,
        parsedNewUser.contact,
        parsedNewUser.password,
      ]
    );
    console.log("User registered successfully");
    return results;
  } catch (error) {
    console.error("Error registering user:", error.message);
  }
};

export default async function handler(req, res) {
  const { method } = req;
  // const queryObj = req.query;
  try {
    switch (method) {
      case "GET": {
        // try {
        //   let todos = await getTodos();
        //   let { filteredList, maxPage } = await filterAndSortList(
        //     todos,
        //     queryObj
        //   );

        //   res.status(200).json({ todos: filteredList, maxPage: maxPage });
        // } catch (error) {
        //   res.status(500).json({ message: "Error reading todo" });
        // }
        break;
      }
      case "POST": {
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
