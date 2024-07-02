import { useSpeechRecognitionContext } from "../hooks/useSpeechToText";
import { useEffect } from "react";

const VoiceInput = () => {
  const {
    text,
    isListening,
    startListening,
    stopListening,
    hasRecognitionSupport,
    // browserSupportsSpeechRecognition,
  } = useSpeechRecognitionContext(); // Correct the import path to useSpeechRecognition

  useEffect(() => {
    // This effect will run whenever `isListening` changes
    console.log("isListening has changed:", isListening);

    // Any side effects based on `isListening` can go here

    // Clean up function
    return () => {
      // Clean up side effects here
    };
  }, [isListening]);

  return (
    <div>
      {hasRecognitionSupport ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              style={{
                backgroundColor: isListening ? "#d62d20" : "#008744",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
                height: "50px",
                fontSize: "18px",
              }}
              onClick={!isListening ? startListening : stopListening}
            >
              {!isListening ? "Start Listening" : "Stop Listening"}
            </button>
          </div>

          {isListening ? <div>Your browser is currently listening</div> : null}
        </>
      ) : (
        <h1>Your browser has no speech recognition support</h1>
      )}
    </div>
  );
};

export default VoiceInput;

// import React from "react";
// import useSpeechRecognition from "../hooks/useSpeechToText"; // Corrected import path

// const VoiceInput = () => {
//   const {
//     text,
//     isListening,
//     startListening,
//     stopListening,
//     browserSupportsSpeechRecognition,
//   } = useSpeechRecognition();

//   return (
//     <div>
//       {browserSupportsSpeechRecognition ? (
//         <>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             <button
//               style={{
//                 backgroundColor: isListening ? "#d62d20" : "#008744",
//                 color: "white",
//                 padding: "10px 20px",
//                 border: "none",
//                 borderRadius: "5px",
//                 cursor: "pointer",
//                 transition: "background-color 0.3s ease",
//                 height: "50px",
//                 fontSize: "18px",
//               }}
//               onClick={!isListening ? startListening : stopListening}
//             >
//               {!isListening ? "Start Listening" : "Stop Listening"}
//             </button>
//           </div>

//           {isListening ? (
//             <div>
//               <div>Your browser is currently listening</div>
//               <div>Loading...</div>
//             </div>
//           ) : (
//             <div>
//               <p>Recognized text: {text}</p>
//             </div>
//           )}
//         </>
//       ) : (
//         <h1>Your browser has no speech recognition support</h1>
//       )}
//     </div>
//   );
// };

// export default VoiceInput;
