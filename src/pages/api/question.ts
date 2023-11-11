import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";

type SingleChoiceQuestion = {
  question: string;
  answer: string;
  options: string[];
};

type PronounciationQuestion = {};

type MultiChoiceOption = {};

type Question =
  | SingleChoiceQuestion
  | PronounciationQuestion
  | MultiChoiceOption;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Question>,
) {
  connectToMongo(res);
  res.status(200).json({
    question: "what is the best beer?",
    answer: "new glarus",
    options: ["new glarus", "miller lite"],
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
  console.log("hi");
  await mongoose.connection.close();
}
