import { Question } from "../api/question";
import SingleQuestion from "@/components/singleQuestion";
import MultiQuestion from "@/components/multiQuestion";
import MatchQuestion from "@/components/matchQuestion";
import SpeechQuestion from "@/components/speechQuestion";

export default function Lesson() {
  // TODO getSeqNumber from route to make api call
  const q: Question = {
    seqNumber: 3,
    availableFields: ["a", "b", "c", "d"],
    correctFields: ["c"],
    category: "the category",
    question: "what is a cow?",
    type: "speech",
  };

  return (
    <>
      <div className="text-5xl p-2 text-center">{q.question}</div>
      {q.type === "single" && <SingleQuestion question={q} />}
      {q.type === "multi" && <MultiQuestion question={q} />}
      {q.type === "match" && <MatchQuestion question={q} />}
      {q.type === "speech" && <SpeechQuestion question={q} />}
    </>
  );
}
