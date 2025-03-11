import { useEffect, useState } from "react";
import { Box, Card, Typography } from "@mui/material";
import { useNavigate } from "react-router";

function QuizCompleted() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const quizCompleted = localStorage.getItem("quizCompleted");
    if (quizCompleted === "false" || !quizCompleted) navigate("/")
    const storedUsername = localStorage.getItem("quizUsername");

    if (storedUsername) {
      fetch(`https://backend-mocha-eta.vercel.app/api/get-final-score/${storedUsername}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data && data.score !== undefined) {
            setUserData(data);
          }
        })
        .catch((err) => console.error("Error fetching final score:", err));
    }
  }, []);

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
          textAlign: "center",
        }}
      >
        <Typography variant="h5">🎉 You have completed the quiz!</Typography>
        {userData ? (
          <>
            <Typography variant="h6">
              {userData.username}, your final score is:
            </Typography>
            <Typography variant="h3">{userData.score}</Typography>
          </>
        ) : (
          <Typography variant="h6">Loading...</Typography>
        )}
        <Typography variant="body1" sx={{ mt: 2 }}>
          Thank you for participating.
        </Typography>
      </Card>
    </Box>
  );
}

export default QuizCompleted;
