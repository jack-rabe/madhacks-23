import { Question, getCompliment } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

type Props = { question: Question };
export default function MatchQuestion({ question }: Props) {
  const [vals, setVals] = useState<string[]>([]);
  const { user } = useAuth0();

  let options = question.correctFields?.reduce((acc, el) => {
    // @ts-ignore
    if (!acc.includes(el)) {
      // @ts-ignore
      acc.push(el);
    }
    return acc;
  }, []);
  // @ts-ignore
  options.sort(() => Math.random() - 0.5);

  async function handleSelection() {
    const selections = vals;
    const expected = question.correctFields!;
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
    await fetch(`/api/answer/${user?.sub}?score=${question.seqNumber}`, {
      method: "POST",
    });
    window.location.href = "/";
  }

  return (
    <div className="flex items-center flex-col mt-4">
      <div className="flex flex-col">
        {question.availableFields?.map((field, idx) => {
          return (
            <div className="flex m-4 justify-between" key={field}>
              <div className="m-2 mr-8 text-2xl">{field}</div>
              <Select
                onValueChange={(e) => {
                  setVals((prev) => {
                    const n = prev.slice();
                    n[idx] = e;
                    return n;
                  });
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Pick an option, eh" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {
                      // @ts-ignore
                      options.map((option) => {
                        return (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        );
                      })
                    }
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          );
        })}
      </div>
      <Button className="text-xl mt-4" onClick={handleSelection}>
        Submit
      </Button>
    </div>
  );
}
