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

export type User = {
  id: string;
  score: number;
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

export function getCompliment() {
  const niceities = [
    "You betcha! That was a real good job.",
    "Hey, nice work! You're doing great.",
    "Well done, friend! You really nailed it.",
    "Great job, eh! Keep up the good work.",
    "Good on ya! That was some impressive work.",
    "Way to go, buddy! That's some fine work you did there.",
    "Well, I'll be! You did a heck of a job.",
  ];
  const idx = Math.floor(Math.random() * niceities.length);
  return niceities[idx];
}

export function defineUser() {
  const userSchema = new mongoose.Schema({
    id: String,
    score: Number,
  });
  const userModel = mongoose.models.user || mongoose.model("user", userSchema);
  return userModel;
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
