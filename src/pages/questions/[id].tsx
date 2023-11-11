import Navbar from "@/components/navbar";
import { Question } from "../api/question";
import SingleQuestion from "@/components/singleQuestion";
import MultiQuestion from "@/components/multiQuestion";

export default function Lesson() {
  // TODO getSeqNumber from route to make api call
  const q: Question = {
    seqNumber: 3,
    availableFields: ["a", "b", "c", "d"],
    correctFields: ["c"],
    category: "the category",
    question: "what is a cow?",
    type: "multi",
  };

  return (
    <>
      <Navbar />
      <div className="text-5xl p-2 text-center">{q.question}</div>
      {q.type === "single" && <SingleQuestion question={q} />}
      {q.type === "multi" && <MultiQuestion question={q} />}
    </>
  );
}
