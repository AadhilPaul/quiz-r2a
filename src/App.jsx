import Quiz from "./Quiz";
import Username from "./Username";
import { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  return (
    <div>
      {!username ? (
        <Username setUsername={setUsername} />
      ) : (
        <Quiz username={username} />
      )}
    </div>
  );
}

export default App;
