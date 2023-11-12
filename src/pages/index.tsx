import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Question } from "@/lib/utils";

export default function Home() {
  let [lessons, setLessons] = useState<Question[]>([]);

  useEffect(() => {
    fetch("/api/questions")
      .then((res) => {
        if (res.status !== 200) {
          console.error(res);
        } else {
          return res.json();
        }
      })
      .then((res) => {
        console.log(res);
        setLessons(res);
      });
  }, []);

  return (
    <>
      <div>
        <h2 className="p-3 m-4 text-2xl">Questions</h2>
        <div className="grid grid-cols-1">
          {lessons.map((lesson) => (
            <Card
              key={lesson.category}
              className={`w-3/4 m-2 ${lesson.disabled ? "bg-red-200" : ""}`}
            >
              <Link
                href={`/questions/${lesson.seqNumber}`}
                className="flex items-center justify-between"
                style={{
                  pointerEvents: lesson.disabled ? "none" : "auto",
                }}
              >
                <div className="text-2xl p-4">{lesson.category}</div>
                <Button
                  className="text-2xl p-4 mr-4"
                  disabled={lesson.disabled}
                >
                  Learn
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
