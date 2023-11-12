import * as React from "react";
import { Button } from "./ui/button";
import { Question, getCompliment } from "@/lib/utils";
import { useAuth0 } from "@auth0/auth0-react";

type Props = { question: Question };
export default function SingleQuestion({ question }: Props) {
  const { user } = useAuth0();

  async function handleSelection(selected: string) {
    // @ts-ignore
    if (selected === question.correctFields[0]) {
      alert(getCompliment());
      await fetch(`/api/answer/${user?.sub}?score=${question.seqNumber}`, {
        method: "POST",
      });
      window.location.href = "/";
    } else {
      alert(question.reason || "Ope, not quite. Try again once!");
    }
  }

  return (
    <div className="flex items-center flex-col mt-4">
      {question.availableFields!.map((field) => {
        return (
          <Button
            className="w-4/5 h-24 md:w-3/5 m-4 text-2xl py-16"
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
