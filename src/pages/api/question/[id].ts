import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { Question, connectToMongo, defineQuestion } from "@/lib/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Question>,
) {
  const { id } = req.query;

  const questionModel = defineQuestion();
  await connectToMongo(res);
  const q = await questionModel.findOne({ seq_num: +id! });
  await mongoose.connection.close();

  const response: Question = {
    category: q.category,
    type: q.type,
    question: q.question,
    correctFields: q.correctFields,
    availableFields: q.availableFields,
    seqNumber: q.seq_num,
  };
  res.status(200).json(response);
}
