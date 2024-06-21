import { useEffect, useRef, useState } from "react";

let recognition: any = null;

if ("webkitSpeechRecognition" in window) {
  recognition = new webkitSpeechRecognition();
  recognition.interimResults = true;
  recognition.continuous = true;
  recognition.lang = "en-US";
}

const useSpeechRecognition = () => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (!recognition) return;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      console.log("onresult event ", event);
      let newText = "";
      for (let i = 0; i < event.results.length; i++) {
        newText += event.results[i][0].transcript;
      }
      setText(newText);
      //   recognition.stop();
      //   setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
    };
  }, []);

  //   const startListening = () => {
  //     setText("");
  //     setIsListening(true);
  //     recognition.start();
  //   };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setTimeout(() => {
        recognitionRef.current.start();
        setIsListening(true);
      }, 500); // Added delay of 500ms
    }
  };

  //   const stopListening = () => {
  //     setIsListening(false);
  //     recognition.stop();
  //   };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      setTimeout(() => {
        recognitionRef.current.stop();
        setIsListening(false);
      }, 500); // Added delay of 500ms
    }
  };

  return {
    text,
    isListening,
    startListening,
    stopListening,
    hasRecognitionSupport: !!recognition,
  };
};

export default useSpeechRecognition;
