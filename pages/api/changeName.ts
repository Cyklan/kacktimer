// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  if (req.method?.toLowerCase() !== "post") {
    res.status(405).end();
    return;
  }

  const { name } = req.body as { name: string; };
  const session = await getSession({ req });

  if (!name || !session.user) {
    res.status(400).json({ message: "name and userId are required" });
    return;
  }

  const db = new PrismaClient();
  db.user.update({
    where: {
      email: session.user.email!
    },
    data: {
      name
    }
  }).then(() => {
    res.status(200).json({ message: "name changed" });
  }).catch(err => {
    res.status(500).json({ message: err.message });
  });

}
