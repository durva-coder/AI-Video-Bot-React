// import { useEffect, useRef, useState } from "react";

// const useSpeechToText = (options) => {
//   // is listening or not
//   const [isListening, setIsListening] = useState(false);
//   // update text area input
//   const [transcript, setTranscript] = useState("");
//   // for speech recognition
//   const recognitionRef = useRef(null);

//   useEffect(() => {
//     if (!("webkitSpeechRecognition" in window)) {
//       console.error("Web speech api is not supported");
//       return;
//     }

//     recognitionRef.current = new window.webkitSpeechRecognition();
//     const recognition = recognitionRef.current;
//     recognition.interimResults = options.interimResults || true;
//     recognition.lang = options.lang || "en-US";
//     recognition.continuous = options.continuous || false;

//     // custom grammar list
//     if ("webkitSpeechGrammarList" in window) {
//       const grammar =
//         "#JSGF V1.0; grammar punctuation; public <punc> = . | , | ? | ! | ; | : ;";

//       const speechRecognitionList = new window.webkitSpeechGrammarList();

//       speechRecognitionList.addFromString(grammar, 1);

//       recognition.grammar = speechRecognitionList;
//     }

//     recognition.onresult = (event) => {
//       let text = "";

//       for (let i = 0; i < event.results.length; i++) {
//         text += event.results[i][0].transcript;
//       }

//       setTranscript(text);
//     };

//     recognition.onerror = (event) => {
//       console.log(Object.keys(event));
//       console.error("Speech recognition error: ", event);
//     };

//     recognition.onend = () => {
//       setIsListening(false);
//       setTranscript("");
//     };

//     return () => {
//       recognition.stop();
//     };
//   }, [options]);

//   const startListening = () => {
//     if (recognitionRef.current && !isListening) {
//       recognitionRef.current.start();
//       setIsListening(true);
//     }
//   };

//   const stopListening = () => {
//     if (recognitionRef.current && isListening) {
//       recognitionRef.current.stop();
//       setIsListening(false);
//     }
//   };

//   return { isListening, transcript, startListening, stopListening };
// };

// export default useSpeechToText;

// import { useEffect, useRef, useState } from "react";

// const useSpeechToText = (options) => {
//   const [isListening, setIsListening] = useState(false);
//   const [transcript, setTranscript] = useState("");
//   const recognitionRef = useRef(null);

//   useEffect(() => {
//     if (!("webkitSpeechRecognition" in window)) {
//       console.error("Web speech API is not supported");
//       return;
//     }

//     const recognition = new window.webkitSpeechRecognition();
//     recognition.interimResults = options.interimResults || true;
//     recognition.lang = options.lang || "en-US";
//     recognition.continuous = options.continuous || false;

//     // Custom grammar list
//     if ("webkitSpeechGrammarList" in window) {
//       const grammar =
//         "#JSGF V1.0; grammar punctuation; public <punc> = . | , | ? | ! | ; | : ;";
//       const speechRecognitionList = new window.webkitSpeechGrammarList();
//       speechRecognitionList.addFromString(grammar, 1);
//       recognition.grammar = speechRecognitionList;
//     }

//     recognition.onresult = (event) => {
//       let text = "";
//       for (let i = 0; i < event.results.length; i++) {
//         text += event.results[i][0].transcript;
//       }
//       setTranscript(text);
//     };

//     recognition.onerror = (event) => {
//       console.error("Speech recognition error: ", event.error);
//     };

//     recognition.onend = () => {
//       setIsListening(false);
//       setTranscript("");
//     };

//     recognitionRef.current = recognition;

//     return () => {
//       if (recognitionRef.current) {
//         recognitionRef.current.stop();
//       }
//     };
//   }, [options]);

//   const startListening = () => {
//     if (recognitionRef.current && !isListening) {
//       recognitionRef.current.start();
//       setIsListening(true);
//     }
//   };

//   const stopListening = () => {
//     if (recognitionRef.current && isListening) {
//       recognitionRef.current.stop();
//       setIsListening(false);
//     }
//   };

//   return { isListening, transcript, startListening, stopListening };
// };

// export default useSpeechToText;

// import { useEffect, useRef, useState } from "react";

// const useSpeechToText = (options) => {
//   const [isListening, setIsListening] = useState(false);
//   const [transcript, setTranscript] = useState("");
//   const recognitionRef = useRef(null);

//   useEffect(() => {
//     if (!("webkitSpeechRecognition" in window)) {
//       console.error("Web Speech API is not supported");
//       return;
//     }

//     const recognition = new window.webkitSpeechRecognition();
//     recognition.interimResults = options.interimResults || true;
//     recognition.lang = options.lang || "en-US";
//     recognition.continuous = options.continuous || false;

//     recognition.onresult = (event) => {
//       let text = "";
//       for (let i = 0; i < event.results.length; i++) {
//         text += event.results[i][0].transcript;
//       }
//       setTranscript(text);
//     };

//     recognition.onerror = (event) => {
//       console.error("Speech recognition error: ", event.error);
//       setIsListening(false);
//     };

//     recognition.onend = () => {
//       setIsListening(false);
//     };

//     recognitionRef.current = recognition;

//     return () => {
//       if (recognitionRef.current) {
//         recognitionRef.current.stop();
//         recognitionRef.current = null;
//       }
//     };
//   }, [options]);

//   const startListening = () => {
//     if (recognitionRef.current && !isListening) {
//       setTimeout(() => {
//         recognitionRef.current.start();
//         setIsListening(true);
//       }, 500); // Added delay of 500ms
//     }
//   };

//   const stopListening = () => {
//     if (recognitionRef.current && isListening) {
//       setTimeout(() => {
//         recognitionRef.current.stop();
//         setIsListening(false);
//       }, 500); // Added delay of 500ms
//     }
//   };

//   return { isListening, transcript, startListening, stopListening };
// };

// export default useSpeechToText;

import { useEffect, useRef, useState } from "react";

let recognition = null;

if ("webkitSpeechRecognition" in window) {
  recognition = new window.webkitSpeechRecognition();
  recognition.interimResults = false;
  recognition.continuous = true;
  recognition.lang = "en-US";
}

const useSpeechRecognition = () => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [responseData, setResponseData] = useState("");

  const onResult = async (event) => {
    console.log("onresult event ", event);
    const length = event.results.length;
    console.log("length", length - 1);
    let newText = event.results[length - 1][0].transcript;
    console.log("new tex", event.results[length - 1][0].transcript);
    // for (let i = 0; i < event.results.length; i++) {
    //   newText += event.results[i][0].transcript;
    // }

    setText(newText);

    try {
      const response = await fetch("http://localhost:7777/response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: newText }),
      });

      const responseData = await response.json();
      setResponseData(responseData.text);
      // textToSpeech(responseData.text);
      setIsSpeaking(true);
    } catch (error) {
      console.error("Error calling backend API:", error);
    }
  };

  useEffect(() => {
    if (!recognition) return;

    recognition.onresult = onResult;

    recognitionRef.current = recognition;
    console.log("i am calling");

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
    };
  }, []);

  const textToSpeech = (text) => {
    // Create a new utterance
    const utterance = new SpeechSynthesisUtterance(text);

    // Function to set the voice and speak the utterance
    const setVoiceAndSpeak = () => {
      const voices = speechSynthesis
        .getVoices()
        .filter((voice) => voice.voiceURI === "Google US English");
      if (voices.length > 0) {
        utterance.voice = voices[0];
      }
      window.speechSynthesis.speak(utterance);
    };

    // Check if voices are already loaded
    if (speechSynthesis.getVoices().length > 0) {
      setVoiceAndSpeak();
    } else {
      // Voices are not loaded yet, wait for them to be loaded
      speechSynthesis.onvoiceschanged = () => {
        setVoiceAndSpeak();
      };
    }
  };

  // useEffect(() => {
  //   if (!recognition) return;

  //   recognition.onresult = async (event) => {
  //     console.log("onresult event ", event);
  //     let newText = "";
  //     for (let i = 0; i < event.results.length; i++) {
  //       newText += event.results[i][0].transcript;
  //     }
  //     setText(newText);

  //     try {
  //       const response = await fetch("http://localhost:7777/response", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ text: newText }),
  //       });

  //       const responseData = await response.json();
  //       textToSpeech(responseData.text);
  //     } catch (error) {
  //       console.error("Error calling backend API:", error);
  //     }
  //   };

  //   recognitionRef.current = recognition;
  //   console.log("i am calling");
  //   return () => {
  //     if (recognitionRef.current) {
  //       recognitionRef.current.stop();
  //       recognitionRef.current = null;
  //     }
  //   };
  // }, []);

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
    isSpeaking,
    setIsSpeaking,
    responseData,
    setResponseData,
  };
};

export default useSpeechRecognition;
