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
      seqNumber: 1,
      type: "single",
    },
    {
      category: "y",
      disabled: true,
      seqNumber: 2,
      type: "single",
    },
  ]);
}
