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
