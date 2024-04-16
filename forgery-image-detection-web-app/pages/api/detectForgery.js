// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     const formData = new FormData();
//     Object.entries(req.body).forEach(([key, value]) => {
//       formData.append(key, value);
//     });

//     try {
//       const response = await fetch("http://127.0.0.1:5000/api/detectForgery", {
//         method: "POST",
//         body: formData,
//       });

//       if (response.ok) {
//         const data = await response.json();
//         res.status(200).json(data);
//       } else {
//         res.status(response.status).json({ error: "Failed to detect forgery" });
//       }
//     } catch (error) {
//       console.error("Error detecting forgery:", error);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   } else {
//     res.status(405).json({ error: "Method not allowed" });
//   }
// }
