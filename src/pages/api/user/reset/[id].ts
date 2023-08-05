import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "~/server/db";
import { sanitizeInput } from "~/utils/input";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const input = sanitizeInput(req.query.id);
  if (!input) {
    return res.status(400).json({ message: "Invalid input" });
  }
  // Find the user with the given id
  const user = await prisma.user.findUnique({
    where: {
      uniqueId: input,
    },
  });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  // Update the user's win count
  const updatedUser = await prisma.user.update({
    where: {
      uniqueId: input,
    },
    data: {
      wins: 0,
      losses: 0,
    },
  });
  return res.status(200).json({ wins: updatedUser });
}
