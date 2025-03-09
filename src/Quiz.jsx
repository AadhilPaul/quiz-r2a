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
      console.log("Feteched questions: ", data)
      setQuestions(data);

      const isCompleted = localStorage.getItem('quizCompleted')
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

    alert(isCorrect ? "✅ Correct!" : "❌ Wrong!");

    // Move to the next question
    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setSelectedAnswer(null);

      // Save progress in local storage
      localStorage.setItem(`lastQuestion_${username}`, nextIndex);
    } else {
      localStorage.setItem(`quizCompleted`, "true"); // Mark quiz as completed
      // navigate("/quiz_completed");
      alert("🎉 Quiz completed!");
      localStorage.removeItem(`lastQuestion_${username}`); // Clear progress after finishing
    }
  };

  if (!questions.length) return <p>Loading questions...</p>;

  const currentQuestion = questions[currentQuestionIndex];

  const CustomButton = styled(Button)({
    backgroundColor: "#ecf3f9",
    fontFamily: "'Oswald', 'sans-serif'",
    padding: "15px 30px",
    fontSize: "16px",
    borderRadius: "50px",
    color: "#101720",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#A5C8E2",
    },
  });

  return (
    <Container>
      <Card
        raised
        sx={{
          padding: { xs: "2rem", md: "4rem" },
          minHeight: "30vh",
          width: { xs: "90vw", sm: "70vw", md: "50vw" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant="h5">Level{currentQuestion.level}</Typography>
        <Typography
          variant="h5"
          sx={{ paddingBottom: "1.5rem", fontFamily: "'Oswald', sans-serif" }}
        >
          Q{currentQuestion.id}. {currentQuestion.question}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {Object.entries(currentQuestion.options).map(([key, value]) => (
            <CustomButton
              variant="text"
              size="small"
              key={key}
              onClick={() => handleAnswerClick(key)}
              disabled={selectedAnswer !== null}
            >
              {key}: {value}
            </CustomButton>
          ))}
        </Box>
      </Card>
    </Container>
  );
}

export default Quiz;
