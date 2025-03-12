import { useState, useEffect } from "react";
import { fetchQuestions, submitResponse } from "./api"; // Your API functions
import { styled } from "@mui/material/styles";
import { Container, Card, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router";

function Quiz({ username }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadQuestions() {
      const data = await fetchQuestions();
      console.log("Feteched questions: ", data);
      setQuestions(data);

      const isCompleted = localStorage.getItem("quizCompleted");
      if (isCompleted === "true") {
        setQuizCompleted(true);
        return;
      }

      // Check local storage for last question index
      const savedIndex = localStorage.getItem(`lastQuestion_${username}`);
      if (savedIndex !== null && !isNaN(savedIndex)) {
        setCurrentQuestionIndex(parseInt(savedIndex));
      }
    }
    loadQuestions();
  }, [username]);

  const handleAnswerClick = async (option) => {
    if (!questions.length) return;

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = option === currentQuestion.correct;

    await submitResponse(username, currentQuestion.id, option, isCorrect);

    // Move to the next question
    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setSelectedAnswer(null);

      // Save progress in local storage
      localStorage.setItem(`lastQuestion_${username}`, nextIndex);
      localStorage.setItem(`quizCompleted`, "false");
    } else {
      localStorage.setItem(`quizCompleted`, "true"); // Mark quiz as completed
      navigate("/quiz_completed");
      localStorage.removeItem(`lastQuestion_${username}`); // Clear progress after finishing
    }
  };

  if (!questions.length) return <p>Loading questions...</p>;

  const currentQuestion = questions[currentQuestionIndex];

  const primaryColor = "#0f9e99";
  const secondaryColor = "#efe9e0";
  const fontColor = "black";
  const backgroundColor = "#f9f9f9";

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor,
      }}
    >
      <Card
        raised
        sx={{
          padding: { xs: "2rem", md: "4rem" },
          minHeight: "30vh",
          width: { xs: "90vw", sm: "70vw", md: "50vw" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "12px",
          backgroundColor: secondaryColor,
          color: fontColor,
          boxShadow: `0px 4px 10px rgba(0, 0, 0, 0.1)`,
        }}
      >
        {/* Question Level */}
        <Typography
          variant="h5"
          sx={{ color: primaryColor, fontWeight: "bold" }}
        >
          Level {currentQuestion.level}
        </Typography>

        {/* Question Text */}
        <Typography
          variant="h5"
          sx={{
            paddingBottom: "1.5rem",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: { xs: "1rem", sm: "1.5rem", md: "1.5rem" }, // Responsive font size
            whiteSpace: "pre-wrap", // Ensures new lines are respected
          }}
        >
          Q{currentQuestion.id}.
          {currentQuestion.isCode === "Yes" ? ( // Check if the question contains code
            <div>
              {currentQuestion.question}
              <Box
                component="pre"
                sx={{
                  backgroundColor: "#272822", // Dark background like a code editor
                  color: "#f8f8f2", // Light text for contrast
                  padding: "10px",
                  borderRadius: "5px",
                  textAlign: "start",
                  fontSize: "1rem",
                  overflowX: "auto", // Allow horizontal scrolling for long code
                  fontFamily: "monospace",
                }}
              >
                <code>{currentQuestion.code}</code>
              </Box>
            </div>
          ) : (
            currentQuestion.question
          )}
        </Typography>

        {/* Options */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            width: "100%",
          }}
        >
          {Object.entries(currentQuestion.options).map(([key, value]) => (
            <Button
              variant="contained"
              size="large"
              key={key}
              onClick={() => handleAnswerClick(key)}
              sx={{
                backgroundColor:
                  selectedAnswer === key ? "#0a7c79" : secondaryColor, // Reset hover color after selecting
                borderColor: primaryColor,
                color: fontColor,
                textTransform: "none",
                fontSize: { xs: "0.8rem", sm: "1.5rem", md: "1.5rem" },
                fontWeight: "bold",
                padding: "10px",
                transition: "background-color 0.3s",
                "&:active": {
                  backgroundColor:
                    selectedAnswer === null ? "#0a7c79" : secondaryColor, // Apply hover only if not selected
                },
              }}
            >
              {key}: {value}
            </Button>
          ))}
        </Box>
      </Card>
    </Container>
  );
}

export default Quiz;
