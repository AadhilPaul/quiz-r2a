import Quiz from "./Quiz";
import Username from "./Username";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { useState, useEffect } from "react";
import "@fontsource/raleway"; // Import font

// 🎨 Define the custom theme
const theme = createTheme({
  typography: {
    fontFamily: "Raleway, sans-serif",
  },
});

function App() {
  const [username, setUsername] = useState("");
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem("quizUsername");
    const isCompleted = localStorage.getItem("quizCompleted");
    if (storedUsername && isCompleted === "false") {
      setUsername(storedUsername);
    }
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Ensures global styles match the theme */}
      <div>
        {!username ? (
          <Username setUsername={setUsername} />
        ) : (
          <Quiz username={username} />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
