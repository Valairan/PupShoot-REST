import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "~/server/db";
import { sanitizeInput } from "~/utils/input";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const sanitizedInput = sanitizeInput(req.query.id);
  if (!sanitizedInput) return res.status(400).json({ error: "Invalid input" });
  const user = await prisma.user.upsert({
    where: { uniqueId: sanitizedInput },
    update: {},
    create: {
      uniqueId: sanitizedInput,
    }
  });
  return res.status(200).json(user);
}
