import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "../../../server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return await userCount(req, res);
}

async function userCount(_req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await prisma.user.count();
    return res.status(200).json(response);
  } catch (e) {
    console.error("Request error", e);
    res
      .status(500)
      .json({ error: "Error fetching user count", success: false });
  }
}
