import { Question } from "@/lib/utils";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';


type Props = { question: Question };
export default function SpeechQuestion({ question }: Props) {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder|null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [audioUrl, setAudioUrl] = useState<string|null>(null);

  const startRecording = () => {
    setAudioChunks([]);
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const recorder = new MediaRecorder(stream);
        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            setAudioChunks((prev) => [...prev, e.data]);
          }
        };
        recorder.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
          const url = URL.createObjectURL(audioBlob);
          setAudioUrl(url);
        };
        setMediaRecorder(recorder);
        recorder.start();

        // Stop recording after 5 seconds (adjust the time as needed)
        setTimeout(() => {
          if (recorder.state === 'recording') {
            recorder.stop();
          }
        }, 5000);
      })
      .catch((error) => console.error('Error accessing microphone:', error));
    setTimeout(startRecording, 2000);
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
    }
  };

  const playAudio = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  return (
    <div>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      <button onClick={playAudio} disabled={!audioUrl}>
        Play Audio
      </button>
      {audioUrl && <audio controls src={audioUrl} />}
    </div>
  );
};

  // return <div>
  //     {audioUrl ?
  //     <audio id="audioPlayer" src={audioUrl} controls></audio>
  //     :
  //     <audio id="audioPlayer" controls></audio>
  //     }
  //     {recording ?
  //       (<div className="flex justify-center flex-col items-center">
  //         <p>Speak Now</p>
  //         <Button id="startButton" variant="outline" size="icon" disabled><FontAwesomeIcon icon={faMicrophone} /></Button>
  //       </div>)
  //       :
  //       (<div className="flex justify-center flex-col items-center">
  //         <p>Click to Record</p>
  //         <Button id="startButton" size="icon"><FontAwesomeIcon icon={faMicrophone} /></Button>
  //       </div>)
  //     }
  //   </div>