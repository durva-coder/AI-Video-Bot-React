import "./App.css";

import VoiceInput from "./components/index";
import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";

function App() {
  // const [reply, setReply] = useState("");
  return (
    <>
      {/* <div className="App"> */}
      <Canvas
        style={{
          height: "90vh",
          width: "90vw",
          padding: "1%",
          paddingLeft: "90px",
        }}
        shadows
        camera={{ position: [0, 0, 8], fov: 42 }}
      >
        <color attach="background" args={["#ececec"]} />
        <Experience />
      </Canvas>
      {/* </div> */}
      <VoiceInput></VoiceInput>
      {/* <div className="reply-container">
        <p>Reply: {reply}</p>
      </div> */}
    </>
  );
}

export default App;
