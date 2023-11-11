"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Question } from "@/pages/api/question";
import { Button } from "./ui/button";
import { useState } from "react";

type Props = { question: Question };
export default function MultiQuestion({ question }: Props) {
  const [selected, setSelected] = useState<string[]>([]);

  function handleSelection() {
    const s = selected.reduce((acc, el) => acc + " " + el, "");
    alert("selected: " + s);
    window.location.href = "/";
  }

  return (
    <div className="flex items-center flex-col">
      {question.availableFields?.map((field) => {
        return (
          <div key={field} className="flex items-center space-x-2 m-8">
            <Checkbox
              className="text-3xl"
              id={field}
              onCheckedChange={(change) => {
                if (selected.includes(field)) {
                  setSelected((prev) => {
                    const copy = prev.slice();
                    return copy.filter((el) => el !== field);
                  });
                } else {
                  selected.push(field);
                }
              }}
            />
            <label
              htmlFor={field}
              className="text-3xl font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {field}
            </label>
          </div>
        );
      })}
      <Button className="text-xl" onClick={handleSelection}>
        Submit
      </Button>
    </div>
  );
}
