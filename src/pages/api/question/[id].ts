import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { Question } from "@/lib/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Question>,
) {
  const { id } = req.query;

  const questionSchema = new mongoose.Schema({
    category: String,
    question: String,
    reason: String,
    type: String,
    availableFields: [String],
    correctFields: [String],
    seq_num: Number,
  });

  await connectToMongo(res);
  console.log("Connected to Mongo");
  const questionModel =
    mongoose.models.question || mongoose.model("question", questionSchema);
  const q = await questionModel.findOne({ seq_num: +id! });
  await mongoose.connection.close();
  console.log("Disconnected from Mongo");

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

export async function connectToMongo(res: NextApiResponse) {
  const mongo_user = process.env.MONGO_USER;
  const mongo_password = process.env.MONGO_PASS;
  if (!mongo_user || !mongo_password) {
    res.status(404).json({ error: "missing mongo credentials" });
  }
  const uri = `mongodb+srv://${mongo_user}:${mongo_password}@cluster0.29nf6.mongodb.net/Madhacks?retryWrites=true&w=majority`;
  await mongoose.connect(uri).catch((err) => console.error(err));
}
