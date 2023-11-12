import { type ClassValue, clsx } from "clsx";
import { NextApiResponse } from "next";
import mongoose from "mongoose";
import { twMerge } from "tailwind-merge";

export type Question = {
  category: string;
  type: "single" | "multi" | "match" | "speech";
  question?: string;
  availableFields?: string[];
  correctFields?: string[];
  disabled?: boolean;
  reason?: string;
  seqNumber: number;
};

export function defineQuestion() {
  const questionSchema = new mongoose.Schema({
    category: String,
    question: String,
    reason: String,
    type: String,
    availableFields: [String],
    correctFields: [String],
    seq_num: Number,
  });
  const questionModel =
    mongoose.models.question || mongoose.model("question", questionSchema);
  return questionModel;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
