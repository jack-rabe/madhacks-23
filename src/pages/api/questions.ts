import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { Question, connectToMongo, defineQuestion } from "@/lib/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Question[]>,
) {
  const questionModel = defineQuestion();
  await connectToMongo(res);
  // TODO filter to new questions?
  const questions = await questionModel.find({});
  await mongoose.connection.close();

  const response: Question[] = questions.map((question) => {
    return {
      category: question.category,
      type: question.type,
      seqNumber: question.seq_num,
    };
  });
  res.status(200).json(response);
}
