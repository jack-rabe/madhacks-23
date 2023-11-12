import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { connectToMongo, defineUser } from "@/lib/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{}>,
) {
  const { id, score } = req.query;
  const userModel = defineUser();
  await connectToMongo(res);
  const user = await userModel.findOne({ id: id });
  if (user.score == score) {
    await userModel.updateOne(
      { id: id },
      {
        $inc: { score: 1 },
      },
      { upsert: true },
    );
  }
  await mongoose.connection.close();

  res.status(200).json({});
}
