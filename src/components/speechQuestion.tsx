import { Question } from "@/pages/api/question";
import { Button } from "./ui/button";

type Props = { question: Question };
export default function SpeechQuestion({ question }: Props) {
  return (
    <div>
      TODO: speech to text API
      <Button>Record</Button>
    </div>
  );
}
