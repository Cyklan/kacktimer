// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { PrismaClient } from "@prisma/client";
import Poop from "../../model/Poop";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { SyncPayload } from "../../hooks/useDataSync";

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

  const payload: SyncPayload = req.body;

  const db = new PrismaClient();

  const user = await db.user.findFirst({
    where: {
      email: session.user.email
    }
  });

  // store offline poops
  await db.poop.createMany({
    data: payload.localOnlyPoops.map(x => ({
      userId: user.id,
      consistency: x.consistency,
      goldenPoop: x.goldenPoop,
      rating: x.rating,
      timeInMS: x.timeInMS,
      id: x.id,
      withoutPoop: x.withPoop
    }))
  });

  const allPoops = await db.poop.findMany({
    where: {
      userId: user.id
    }
  });


  res.status(200).json(allPoops);

  db.$disconnect();
}
