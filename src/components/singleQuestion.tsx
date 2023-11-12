import * as React from "react";
import { Button } from "./ui/button";
import { Question, getCompliment } from "@/lib/utils";
import { useAuth0 } from "@auth0/auth0-react";

type Props = { question: Question };
export default function SingleQuestion({ question }: Props) {
  const { user } = useAuth0();

  function handleSelection(selected: string) {
    // @ts-ignore
    if (selected === question.correctFields[0]) {
      alert(getCompliment());
      fetch(`/api/answer/${user?.sub}`, { method: "POST" });
      window.location.href = "/";
    } else {
      alert(question.reason || "Ope, not quite. Try again once!");
    }
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
