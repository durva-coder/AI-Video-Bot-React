import useSpeechRecognition from "../hooks/useSpeechRecognitionHooks";

const Main = () => {
  const {
    text,
    isListening,
    startListening,
    stopListening,
    hasRecognitionSupport,
  } = useSpeechRecognition();

  return (
    <div>
      {hasRecognitionSupport ? (
        <>
          <div>
            <button onClick={startListening}>Start Listening</button>
          </div>

          <div>
            <button onClick={stopListening}>Stop Listening</button>
          </div>

          {isListening ? <div>Your browser is currently listening</div> : null}
          {text}
        </>
      ) : (
        <h1>Your browser has no speech recognition support</h1>
      )}
    </div>
  );
};

export default Main;
