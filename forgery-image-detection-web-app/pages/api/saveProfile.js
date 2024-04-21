import axios from "axios";
import { getSession } from "next-auth/react"; // Import for server-side session access

export default async function handler(req, res) {
  const session = await getSession(req);

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" }); // Handle unauthorized access
  }

  if (req.method === "PUT") {
    const { editedProfile } = req.body;

    try {
      const accessToken = session.user.accessToken; // Access access token from session
      console.log(accessToken);

      await axios.put("http://localhost:3000/api/profile", editedProfile, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include access token in Authorization header
        },
      });

      // Return success response
      res.status(200).json({ message: "Profile saved successfully" });
    } catch (error) {
      console.error("Failed to save profile:", error);
      res.status(500).json({ error: "Failed to save profile" });
    }
  } else {
    // Return error response for unsupported method
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
