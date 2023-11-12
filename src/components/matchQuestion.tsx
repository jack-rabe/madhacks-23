import { Question } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = { question: Question };
export default function MatchQuestion({ question }: Props) {
  let options = question.correctFields?.reduce((acc, el) => {
    // @ts-ignore
    if (!acc.includes(el)) {
      // @ts-ignore
      acc.push(el);
    }
    console.log(acc);
    return acc;
  }, []);
  // @ts-ignore
  options.sort(() => Math.random() - 0.5);

  return (
    <div>
      {question.availableFields?.map((field) => {
        return (
          <div className="flex" key={field}>
            <div className="m-2 font-bold">{field}</div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Pick an option, eh" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {// @ts-ignore
                  options?.map((option) => {
                    return (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        );
      })}
    </div>
  );
}
