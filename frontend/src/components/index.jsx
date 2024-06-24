// import React, { useState } from "react";
// import useSpeechToText from "../hooks/useSpeechToText";

// const VoiceInput = () => {
//   const [textInput, setTextInput] = useState("");

//   const { isListening, transcript, startListening, stopListening } =
//     useSpeechToText({ continuous: true });

//   const startStopListening = () => {
//
//  ? stopVoiceInput() : startListening();
//   };

//   const stopVoiceInput = () => {
//     setTextInput(
//       (preVal) =>
//         preVal +
//         (transcript.length ? (preVal.length ? " " : "") + transcript : "")
//     );

//     stopListening();
//   };

//   return (
//     <div
//       style={{
//         display: "block",
//         margin: "0 auto",
//         width: "400px",
//         textAlign: "center",
//         marginTop: "200px",
//       }}
//     >
//       <button
//         onClick={() => {
//           startStopListening();
//         }}
//         style={{
//           backgroundColor: isListening ? "#d62d20" : "#008744",
//           color: "white",
//           padding: "10px 20px",
//           border: "none",
//           borderRadius: "5px",
//           cursor: "pointer",
//           transition: "background-color 0.3 ease",
//         }}
//       >
//         {isListening ? "Stop Listening" : "Speak"}
//       </button>
//       <textarea
//         style={{
//           marginTop: "20px",
//           width: "100%",
//           height: "150px",
//           padding: "10px",
//           border: "1px solid #ccc",
//           borderRadius: "5px",
//           transition: "border-color 0.3s ease",
//           resize: "none",
//           backgroundColor: "#f8f8f8",
//           color: "#333",
//         }}
//         disabled={isListening}
//         value={
//           isListening
//             ? textInput +
//               (transcript.length
//                 ? (textInput.length ? " " : "") + transcript
//                 : "")
//             : textInput
//         }
//         onChange={(e) => {
//           setTextInput(e.target.value);
//         }}
//       />
//     </div>
//   );
// };

// export default VoiceInput;

// import React, { useState } from "react";
// import useSpeechToText from "../hooks/useSpeechToText";

// const VoiceInput = () => {
//   const [textInput, setTextInput] = useState("");
//   const { isListening, transcript, startListening, stopListening } =
//     useSpeechToText({ continuous: true });

//   const startStopListening = () => {
//     console.log(isListening);
//     if (isListening) {
//       stopVoiceInput();
//     } else {
//       startListening();
//     }
//   };

//   const stopVoiceInput = () => {
//     setTextInput(
//       (prevVal) =>
//         prevVal +
//         (transcript.length ? (prevVal.length ? " " : "") + transcript : "")
//     );
//     stopListening();
//   };

//   return (
//     <div
//       style={{
//         display: "block",
//         margin: "0 auto",
//         width: "400px",
//         textAlign: "center",
//         marginTop: "200px",
//       }}
//     >
//       <button
//         onClick={startStopListening}
//         style={{
//           backgroundColor: isListening ? "#d62d20" : "#008744",
//           color: "white",
//           padding: "10px 20px",
//           border: "none",
//           borderRadius: "5px",
//           cursor: "pointer",
//           transition: "background-color 0.3s ease",
//         }}
//       >
//         {isListening ? "Stop Listening" : "Speak"}
//       </button>
//       <textarea
//         style={{
//           marginTop: "20px",
//           width: "100%",
//           height: "150px",
//           padding: "10px",
//           border: "1px solid #ccc",
//           borderRadius: "5px",
//           transition: "border-color 0.3s ease",
//           resize: "none",
//           backgroundColor: "#f8f8f8",
//           color: "#333",
//         }}
//         disabled={isListening}
//         value={
//           isListening
//             ? textInput +
//               (transcript.length
//                 ? (textInput.length ? " " : "") + transcript
//                 : "")
//             : textInput
//         }
//         onChange={(e) => setTextInput(e.target.value)}
//       />
//     </div>
//   );
// };

// export default VoiceInput;

// import React, { useState, useEffect } from "react";
// import useSpeechToText from "../hooks/useSpeechToText";

// const VoiceInput = () => {
//   const [textInput, setTextInput] = useState("");
//   const { isListening, transcript, startListening, stopListening } =
//     useSpeechToText({ continuous: true });

//   useEffect(() => {
//     if (!isListening && transcript) {
//       setTextInput(
//         (prevVal) =>
//           prevVal +
//           (transcript.length ? (prevVal.length ? " " : "") + transcript : "")
//       );
//     }
//   }, [isListening, transcript]);

//   const startStopListening = () => {
//     console.log("isListening before toggle: ", isListening);
//     if (isListening) {
//       stopVoiceInput();
//     } else {
//       startListening();
//     }
//     console.log("isListening after toggle: ", isListening);
//   };

//   const stopVoiceInput = () => {
//     setTextInput(
//       (prevVal) =>
//         prevVal +
//         (transcript.length ? (prevVal.length ? " " : "") + transcript : "")
//     );
//     stopListening();
//   };

//   return (
//     <div
//       style={{
//         display: "block",
//         margin: "0 auto",
//         width: "400px",
//         textAlign: "center",
//         marginTop: "200px",
//       }}
//     >
//       <button
//         onClick={startStopListening}
//         style={{
//           backgroundColor: isListening ? "#d62d20" : "#008744",
//           color: "white",
//           padding: "10px 20px",
//           border: "none",
//           borderRadius: "5px",
//           cursor: "pointer",
//           transition: "background-color 0.3s ease",
//         }}
//       >
//         {isListening ? "Stop Listening" : "Speak"}
//       </button>
//       <textarea
//         style={{
//           marginTop: "20px",
//           width: "100%",
//           height: "150px",
//           padding: "10px",
//           border: "1px solid #ccc",
//           borderRadius: "5px",
//           transition: "border-color 0.3s ease",
//           resize: "none",
//           backgroundColor: "#f8f8f8",
//           color: "#333",
//         }}
//         disabled={isListening}
//         value={textInput}
//         onChange={(e) => setTextInput(e.target.value)}
//       />
//     </div>
//   );
// };

// export default VoiceInput;

import useSpeechRecognition from "../hooks/useSpeechToText/index";

const VoiceInput = () => {
  const {
    text,
    isListening,
    startListening,
    stopListening,
    hasRecognitionSupport,
  } = useSpeechRecognition(); // Correct the import path to useSpeechRecognition

  return (
    <div>
      {hasRecognitionSupport ? (
        <>
          <div>
            <button
              style={{
                backgroundColor: isListening ? "#d62d20" : "#008744",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
              onClick={!isListening ? startListening : stopListening}
            >
              {!isListening ? "Start Listening" : "Stop Listening"}
            </button>
          </div>

          {/* <div>
            <button
              style={{
                backgroundColor: isListening ? "#d62d20" : "#008744",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
              onClick={stopListening}
            >
              Stop Listening
            </button>
          </div> */}

          {isListening ? <div>Your browser is currently listening</div> : null}
          {/* {text} */}
        </>
      ) : (
        <h1>Your browser has no speech recognition support</h1>
      )}
    </div>
  );
};

export default VoiceInput;
