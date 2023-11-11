"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Question } from "@/pages/api/question";
import { Button } from "./ui/button";
import { useState } from "react";

type Props = { question: Question };
export default function MultiQuestion({ question }: Props) {
  const [selected, setSelected] = useState<string[]>([]);

  function handleSelection() {
    selected.reduce((acc, el) => acc + " " + el, "");
    alert("selected" + selected);
  }

  return (
    <>
      {question.availableFields?.map((field) => {
        return (
          <div key={field} className="flex items-center space-x-2 m-4">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {field}
            </label>
          </div>
        );
      })}
      <Button>Submit</Button>
    </>
  );
}
