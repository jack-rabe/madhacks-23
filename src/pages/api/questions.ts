import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { Question } from "./question";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Question[]>,
) {
  res.status(200).json([
    {
      category: "x",
      id: 1,
    },
    {
      category: "y",
      disabled: true,
      id: 2,
    },
  ]);
}
