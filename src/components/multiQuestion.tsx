"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "./ui/button";
import { useState } from "react";
import { Question, getCompliment } from "@/lib/utils";
import { useAuth0 } from "@auth0/auth0-react";

type Props = { question: Question };
export default function MultiQuestion({ question }: Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const { user } = useAuth0();

  async function handleSelection() {
    const selections = selected.toSorted();
    const expected = question.correctFields?.toSorted()!;
    if (selections.length !== expected!.length) {
      alert(question.reason || "Ope, not exactly. You'll get 'er next time");
      return;
    }
    for (let i = 0; i < selections.length; i++) {
      if (expected[i] !== selections[i]) {
        alert(question.reason || "Ope, not exactly. You'll get 'er next time");
        return;
      }
    }

    // user was correct
    alert(getCompliment());
    await fetch(`/api/answer/${user?.sub}`, { method: "POST" });
    window.location.href = "/";
  }

  return (
    <div className="flex items-center flex-col">
      <div>
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
        <Button className="text-xl ml-8" onClick={handleSelection}>
          Submit
        </Button>
      </div>
    </div>
  );
}
