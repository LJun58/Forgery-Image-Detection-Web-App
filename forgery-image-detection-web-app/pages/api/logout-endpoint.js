import { destroySession } from "next-auth/react";

export default async function handler(req, res) {
  await destroySession(req, res);
  res.status(200).json({ success: true });
}
