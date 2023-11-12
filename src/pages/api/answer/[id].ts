import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import {
  Question,
  connectToMongo,
  defineQuestion,
  defineUser,
} from "@/lib/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{}>,
) {
  const { id } = req.query;
  const userModel = defineUser();
  await connectToMongo(res);
  await userModel.updateOne(
    { id: id },
    {
      $inc: { score: 1 },
    },
    { upsert: true },
  );
  await mongoose.connection.close();

  res.status(200).json({});
}
