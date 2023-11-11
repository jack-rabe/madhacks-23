import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";

export type Question = {
  category: string;
  id: number;
  question?: string;
  availableFields?: string[];
  correctFields?: string[];
  disabled?: boolean;
  seqNumber?: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Question>,
) {
  const questionSchema = new mongoose.Schema({
    category: String,
    question: String,
    availableFields: [String],
    correctFields: [String],
    seqNumber: Number,
  });

  const questionModel =
    mongoose.models.Question || mongoose.model("Question", questionSchema);
  connectToMongo(res);
  await mongoose.connection.close();

  res.status(200).json({
    category: "x",
    question: "what is the best beer?",
    correctFields: ["new glarus"],
    availableFields: ["new glarus", "miller lite"],
    seqNumber: 1,
  });
}

export async function connectToMongo(res: NextApiResponse) {
  const mongo_user = process.env.MONGO_USER;
  const mongo_password = process.env.MONGO_PASS;
  if (!mongo_user || !mongo_password) {
    res.status(404).json({ error: "missing mongo credentials" });
  }
  const uri = `mongodb+srv://${mongo_user}:${mongo_password}@cluster0.29nf6.mongodb.net/?retryWrites=true&w=majority`;
  await mongoose.connect(uri).catch((err) => console.error(err));
}
