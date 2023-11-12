import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Question } from "@/lib/utils";
import { useAuth0 } from "@auth0/auth0-react";
import { CheckIcon } from "@radix-ui/react-icons";

export default function Home() {
  let [lessons, setLessons] = useState<Question[]>([]);
  const { user, isLoading } = useAuth0();
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      fetch(`/api/questions?userId=${user?.sub!}`)
        .then((res) => {
          if (res.status !== 200) {
            console.error(res);
          } else {
            return res.json();
          }
        })
        .then((res) => {
          setLessons(res.questions);
          setScore(res.score);
        });
    }
  }, [user, isLoading]);

  return (
    <>
      <div>
        <h2 className="p-3 m-4 text-2xl">Questions</h2>
        <div className="grid grid-cols-2">
          {lessons.map((lesson) => (
            <Card
              key={lesson.seqNumber}
              className={`w-5/6 m-2 ${
                lesson.seqNumber > score ? "bg-slate-300" : ""
              }`}
            >
              <Link
                href={`/questions/${lesson.seqNumber}`}
                className="flex items-center justify-between"
                style={{
                  pointerEvents: lesson.seqNumber > score ? "none" : "auto",
                }}
              >
                <div className="text-2xl p-4">{lesson.category}</div>
                {lesson.seqNumber == score && (
                  <Button
                    className="text-2xl p-4 mr-4"
                    disabled={lesson.seqNumber != score}
                  >
                    Learn
                  </Button>
                )}
                {lesson.seqNumber < score && (
                  <div className="bg-green-400 p-2 mr-4">
                    <CheckIcon />
                  </div>
                )}
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
