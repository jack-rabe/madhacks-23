import { Question } from "@/lib/utils";
import SingleQuestion from "@/components/singleQuestion";
import MultiQuestion from "@/components/multiQuestion";
import MatchQuestion from "@/components/matchQuestion";
import SpeechQuestion from "@/components/speechQuestion";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Lesson() {
  const router = useRouter();
  const { id } = router.query;
  const [question, setQuestion] = useState<Question>();

  useEffect(() => {
    fetch(`/api/question/${id}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setQuestion(res);
      });
  }, [id]);

  return (
    <>
      {question && (
        <>
          <div className="text-5xl p-2 text-center">{question.question}</div>
          {question.type === "single" && <SingleQuestion question={question} />}
          {question.type === "multi" && <MultiQuestion question={question} />}
          {question.type === "match" && <MatchQuestion question={question} />}
          {question.type === "speech" && <SpeechQuestion question={question} />}
        </>
      )}
    </>
  );
}
