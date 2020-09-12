import React, {useState} from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Voice = () => {
  const [message, setMessage] = useState("");
  const {transcript, resetTranscript} = useSpeechRecognition();
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  const start = () => {
    SpeechRecognition.startListening({language: "ar-AE"});
    //if (transcript) setMessage("kj");
    // console.log(message);
  };
  return (
    <div>
      <button onClick={start()}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </div>
  );
};
export default Voice;
