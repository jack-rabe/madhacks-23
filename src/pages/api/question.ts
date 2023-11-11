import type { NextApiRequest, NextApiResponse } from "next";

type Question = {
  question: string;
  answer: string;
  options: string[];
};

type PronounciationQuestion = {};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Question>,
) {
  res.status(200).json({
    question: "what is the best beer?",
    answer: "new glarus",
    options: ["new glarus", "miller lite"],
  });
}

// c8At8DHEGbZv1Eo0
