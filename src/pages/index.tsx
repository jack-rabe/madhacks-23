import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect } from "react";

export default function Home() {
  type Lesson = {
    title: string;
    path: string;
    description: string;
    disabled?: boolean;
  };
  const lessons: Lesson[] = [
    { title: "cities", path: "x", description: "learn about this thing" },
    { title: "slang", path: "y", description: "learn about this thing" },
    { title: "cows", path: "z", description: "learn about this thing" },
    { title: "cows", path: "a", description: "learn about this thing" },
    { title: "cows", path: "b", description: "learn about this thing" },
    {
      title: "cows",
      path: "c",
      description: "learn about this thing",
      disabled: true,
    },
  ];

  useEffect(() => {
    fetch("/api/question")
      .then((res) => res.json())
      .then((res) => console.log(res));
  });

  return (
    <>
      <h1 className="fixed p-4 bg-red-100 w-full">WiscoLingo</h1>
      <div className="pt-16">
        <h2 className="p-3 m-4 text-2xl">Lessons</h2>
        <div className="grid grid-cols-4">
          {lessons.map((lesson) => (
            <Card
              key={lesson.title}
              className={`w-[350px] m-2 ${lesson.disabled ? "bg-red-200" : ""}`}
            >
              <Link
                href={`/lessons/${lesson.path}`}
                style={{
                  pointerEvents: lesson.disabled ? "none" : "auto",
                }}
              >
                <CardHeader>
                  <CardTitle>{lesson.title}</CardTitle>
                  <CardDescription>{lesson.description}</CardDescription>
                </CardHeader>
                <CardContent>image here?</CardContent>
                <CardFooter className="flex justify-between">
                  <Button>Learn</Button>
                </CardFooter>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
