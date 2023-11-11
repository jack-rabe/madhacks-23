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
import Navbar from "@/components/navbar";
import { Question } from "./api/question";

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
        setLessons(res);
      });
  });

  return (
    <>
      <div>
        <Navbar />
        <h2 className="p-3 m-4 text-2xl">Questions</h2>
        <div className="grid grid-cols-4">
          {lessons.map((lesson) => (
            <Card
              key={lesson.category}
              className={`w-[350px] m-2 ${lesson.disabled ? "bg-red-200" : ""}`}
            >
              <Link
                href={`/lessons/${lesson.id}`}
                style={{
                  pointerEvents: lesson.disabled ? "none" : "auto",
                }}
              >
                <CardHeader>
                  <CardTitle>{lesson.category}</CardTitle>
                </CardHeader>
                <CardContent>image here?</CardContent>
                <CardFooter className="flex justify-between">
                  <Button disabled={lesson.disabled}>Learn</Button>
                </CardFooter>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
