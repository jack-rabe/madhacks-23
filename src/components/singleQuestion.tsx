import * as React from "react";
import { Button } from "./ui/button";
import { Question } from "@/lib/utils";

type Props = { question: Question };
export default function SingleQuestion({ question }: Props) {
  function handleSelection(selected: string) {
    alert("you selected " + selected);
    window.location.href = "/";
  }

  return (
    <div className="flex items-center flex-col">
      {question.availableFields!.map((field) => {
        return (
          <Button
            className="w-3/5 m-4 text-2xl p-8"
            key={field}
            onClick={(e) => handleSelection(field)}
          >
            {field}
          </Button>
        );
      })}
    </div>
  );
}
