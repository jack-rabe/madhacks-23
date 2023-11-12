import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import {
  Question,
  connectToMongo,
  defineQuestion,
  defineUser,
} from "@/lib/utils";

type Response = {
  questions: Question[];
  score: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>,
) {
  const { userId } = req.query;

  const questionModel = defineQuestion();
  const userModel = defineUser();
  await connectToMongo(res);
  const user = await userModel.findOne({ id: userId });
  // TODO filter to new questions?
  const questions = await questionModel.find({});
  await mongoose.connection.close();

  const qs: Question[] = questions.map((question) => {
    return {
      category: question.category,
      type: question.type,
      seqNumber: question.seq_num,
    };
  });
  const score = user ? user.score : 0;
  res.status(200).json({ score: score, questions: qs });
}
