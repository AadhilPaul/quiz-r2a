import { Button, Card, Box, TextField, Typography } from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import { useState, useEffect } from "react";

function Username({ setUsername }) {
  const [input, setInput] = useState("");
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    const isCompleted = localStorage.getItem("quizCompleted");
    if (isCompleted === "true") {
      setQuizCompleted(true);
    }
  }, []);

  const handleNext = () => {
    localStorage.setItem("quizUsername", input);
    setUsername(input);
  }


  if (quizCompleted) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Card raised sx={{ padding: "4rem", height: "15rem", textAlign: "center" }}>
          <Typography variant="h5">🎉 You have already completed the quiz!</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Thank you for participating.
          </Typography>
        </Card>
      </Box>
    )
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Card
        raised
        sx={{
          padding: "4rem",
          height: "15rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            alignItems: "center",
          }}
        >
          <FaceIcon color="primary" sx={{ fontSize: "100px" }} />
          <TextField
            variant="standard"
            label="Enter your username"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            sx={{ fontFamily: "'Oswald', 'sans-serif'" }}
          />
        </Box>
        <Button
          variant="contained"
          disabled={!input.trim()}
          onClick={handleNext}
          sx={{
            mt: 5,
            float: "right",
          }}
        >
          Next{" "}
        </Button>
      </Card>
    </Box>
  );
}

export default Username;
