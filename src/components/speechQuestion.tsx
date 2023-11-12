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
            setAudioChunks([e.data]);
          }
        };
        recorder.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
          const formData = new FormData();
          formData.append('audio', audioBlob, 'recorded_audio.wav');

          console.log("Sup mafk");
          // fetch('your_upload_url', {
          //     method: 'POST',
          //     body: formData
          // })
          // .then(response => response.json())
          // .then(data => {
          //     console.log('Upload successful:', data);
          // })
          // .catch(error => {
          //     console.error('Error uploading audio:', error);
          // });
          const url = URL.createObjectURL(audioBlob);
          setAudioUrl(url);
        };
        setMediaRecorder(recorder);
        console.log(mediaRecorder);
        setRecording(true);
        recorder.start();
        setTimeout(stopRecording, 2000, recorder);
        // setTimeout(stopRecording.bind(this, recorder), 2000);
      })
      .catch((error) => console.error('Error accessing microphone:', error));
  };

  const stopRecording = (recorder : MediaRecorder) => {
    if (recorder) {
      setRecording(false);
      recorder.stop();
    }
  };

  return <div>
      {audioUrl ?
      <audio id="audioPlayer" src={audioUrl} controls></audio>
      :
      <audio id="audioPlayer" controls></audio>
      }
      {recording ?
        (<div className="flex justify-center flex-col items-center">
          <p>Speak Now</p>
          <Button onClick={startRecording} variant="outline" size="icon" disabled><FontAwesomeIcon icon={faMicrophone} /></Button>
        </div>)
        :
        (<div className="flex justify-center flex-col items-center">
          <p>Click to Record</p>
          <Button onClick={startRecording} size="icon"><FontAwesomeIcon icon={faMicrophone} /></Button>
        </div>)
      }
    </div>
}
