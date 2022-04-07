// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { PrismaClient } from "@prisma/client";
import Poop from "../../model/Poop"
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  if (req.method?.toLowerCase() !== "post") {
    res.status(405).end();
    return;
  }
  
  // get session
  const session = await getSession({ req });
  if (!session.user) {
    res.status(401).json({ message: "user not authenticated" });
    return;
  }

  const poop: Poop = req.body as Poop;

  const db = new PrismaClient();
  const user = await db.user.findFirst({
    where: {
      email: session.user.email!
    }
  });

  await db.poop.create({
    data: {
      withoutPoop: !poop.withPoop,
      consistency: poop.consistency,
      user: {
        connect: {
          id: user.id
        }
      },
      goldenPoop: poop.goldenPoop,
      rating: poop.rating,
      timeInMS: poop.timeInMS,
      id: poop.id,
    }
  }).then(() => {
    res.status(200).json({ message: "poop saved" });
  })

}
