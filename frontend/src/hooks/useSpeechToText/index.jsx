import { useEffect, useRef, useState, createContext, useContext } from "react";
// import { useSpeechRecognition } from "react-speech-recognition";

const SpeechRecognitionContext = createContext();

let recognition = null;

if ("webkitSpeechRecognition" in window) {
  recognition = new window.webkitSpeechRecognition();
  recognition.interimResults = false;
  recognition.continuous = false;
  recognition.lang = "en-US";
}

const SpeechRecognitionProvider = ({ children }) => {
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
      const response = await fetch("http://localhost:7777/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: newText }),
      });

      // console.log("is speaking");
      setIsListening(false);

      const responseData = await response.json();
      console.log("esponseData.data", responseData.data);
      setResponseData(responseData.data);

      // setIsSpeaking(false);
      // textToSpeech(responseData.text);
      // setIsSpeaking(true);

      // setTimeout(() => {
      //   setIsListening(true);
      // }, 100);
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

  // const [text, setText] = useState("");
  // const [isListening, setIsListening] = useState(false);
  // const [isSpeaking, setIsSpeaking] = useState(false);
  // const [responseData, setResponseData] = useState("");
  // const [error, setError] = useState(null);
  // const { transcript, resetTranscript } = useSpeechRecognition({
  //   onError: (error) => setError(error),
  // });

  // useEffect(() => {
  //   console.log(transcript);
  //   if (transcript) {
  //     setText(transcript);
  //   }
  // }, [transcript]);

  // useEffect(() => {
  //   if (isListening) {
  //     setIsListening(true);
  //   } else {
  //     setIsListening(false);
  //   }
  // }, [isListening]);

  // const startListening = () => {
  //   resetTranscript();
  //   setIsListening(true);
  // };

  // const stopListening = () => {
  //   setIsListening(false);
  // };

  // const onResult = async () => {
  //   try {
  //     const response = await fetch("http://localhost:7777/chat", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ prompt: text }),
  //     });

  //     const responseData = await response.json();
  //     console.log("responseData.data", responseData.data);
  //     setResponseData(responseData.data);

  //     setIsSpeaking(true);
  //     setTimeout(() => {
  //       setIsSpeaking(false);
  //     }, 10000);
  //   } catch (error) {
  //     console.error("Error calling backend API:", error);
  //   }
  // };

  // useEffect(() => {
  //   if (transcript && transcript !== "") {
  //     onResult();
  //   }
  // }, [transcript]);

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

  // const startListening = () => {
  //   if (recognitionRef.current && !isListening) {
  //     setTimeout(() => {
  //       recognitionRef.current.start();
  //       setIsListening(true);
  //     }, 500); // Added delay of 500ms
  //   }
  // };

  // const stopListening = () => {
  //   if (recognitionRef.current && isListening) {
  //     setTimeout(() => {
  //       recognitionRef.current.stop();
  //       setIsListening(false);
  //     }, 500); // Added delay of 500ms
  //   }
  // };

  const startListening = () => {
    console.log("isListening start", isListening);

    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  // return {
  //   text,
  //   isListening,
  //   startListening,
  //   stopListening,
  //   hasRecognitionSupport: !!recognition,
  //   // browserSupportsSpeechRecognition,
  //   isSpeaking,
  //   setIsSpeaking,
  //   setIsListening,
  //   responseData,
  //   setResponseData,
  // };

  return (
    <SpeechRecognitionContext.Provider
      value={{
        text,
        isListening,
        startListening,
        stopListening,
        hasRecognitionSupport: !!recognition,
        isSpeaking,
        setIsSpeaking,
        setIsListening,
        responseData,
        setResponseData,
      }}
    >
      {children}
    </SpeechRecognitionContext.Provider>
  );
};

export const useSpeechRecognitionContext = () => {
  return useContext(SpeechRecognitionContext);
};

export default SpeechRecognitionProvider;

// import { useState, useEffect } from "react";
// import SpeechRecognition, {
//   useSpeechRecognition,
// } from "react-speech-recognition";

// const useSpeechRecognition1 = () => {
//   const [text, setText] = useState("");
//   const [isListening, setIsListening] = useState(false);
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [responseData, setResponseData] = useState("");
//   const [error, setError] = useState(null);

//   const {
//     transcript,
//     listening,
//     resetTranscript,
//     browserSupportsSpeechRecognition,
//   } = useSpeechRecognition();

//   useEffect(() => {
//     console.log("transcript", transcript);
//     if (transcript) {
//       setText(transcript);
//       console.log(text);
//     }
//   }, [transcript]);

//   const onStartListening = () => {
//     resetTranscript();
//     setIsListening(true);
//     SpeechRecognition.startListening({
//       continuous: true,
//     });
//   };

//   const onStopListening = () => {
//     setIsListening(false);
//     SpeechRecognition.stopListening();
//   };

//   const onResult = async () => {
//     try {
//       const response = await fetch("http://localhost:7777/chat", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ prompt: transcript }), // Use transcript directly here
//       });

//       const responseData = await response.json();
//       console.log("responseData.data", responseData.data);
//       setResponseData(responseData.data);

//       resetTranscript();

//       setIsSpeaking(true);
//       setTimeout(() => {
//         setIsSpeaking(false);
//       }, 10000);
//     } catch (error) {
//       console.error("Error calling backend API:", error);
//     }
//   };

//   useEffect(() => {
//     if (transcript && transcript !== "") {
//       onResult();
//     }
//   }, [transcript]);

//   return {
//     text,
//     isListening,
//     onStartListening,
//     onStopListening,
//     isSpeaking,
//     setIsSpeaking,
//     responseData,
//     setResponseData,
//     browserSupportsSpeechRecognition,
//   };
// };

// export default useSpeechRecognition1;

// import { useState, useEffect } from "react";
// import SpeechRecognition, {
//   useSpeechRecognition,
// } from "react-speech-recognition";

// const useSpeechRecognition1 = () => {
//   const [text, setText] = useState("");
//   const [isListening, setIsListening] = useState(false);
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [responseData, setResponseData] = useState("");
//   const [error, setError] = useState(null);

//   const {
//     transcript,
//     listening,
//     resetTranscript,
//     browserSupportsSpeechRecognition,
//   } = useSpeechRecognition();

//   useEffect(() => {
//     if (transcript !== "") {
//       setText(transcript);
//     }
//   }, [transcript]);

//   const startListening = () => {
//     resetTranscript();
//     setIsListening(true);
//     SpeechRecognition.startListening({
//       continuous: true, // Continuously listen for speech
//     });
//   };

//   const stopListening = () => {
//     setIsListening(false);
//     SpeechRecognition.stopListening();
//   };

//   const onResult = async () => {
//     try {
//       if (text.trim() !== "") {
//         const response = await fetch("http://localhost:7777/chat", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ prompt: text }), // Use text state, which contains finalized transcript
//         });

//         const responseData = await response.json();
//         console.log("responseData.data", responseData.data);
//         setResponseData(responseData.data);

//         setIsSpeaking(true);
//         setTimeout(() => {
//           setIsSpeaking(false);
//         }, 10000);
//       }
//     } catch (error) {
//       console.error("Error calling backend API:", error);
//     }
//   };

//   useEffect(() => {
//     if (text.trim() !== "") {
//       onResult();
//       resetTranscript(); // Reset transcript after processing
//     }
//   }, [text]);

//   useEffect(() => {
//     if (!listening && isListening) {
//       startListening();
//     }
//   }, [listening, isListening]);

//   return {
//     text,
//     isListening,
//     startListening,
//     stopListening,
//     isSpeaking,
//     responseData,
//     browserSupportsSpeechRecognition,
//   };
// };

// export default useSpeechRecognition1;
