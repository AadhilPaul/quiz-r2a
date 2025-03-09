import { useEffect, useState } from "react";
import { Box, Card, Typography } from "@mui/material";

function QuizCompleted() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("quizUsername");

    if (storedUsername) {
      fetch(`/api/get-final-score`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.score !== undefined) {
            setUserData(data);
          }
        })
        .catch((err) => console.error("Error fetching final score:", err));
    }
  }, []);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Card raised sx={{ padding: "4rem", height: "15rem", textAlign: "center" }}>
        <Typography variant="h5">🎉 You have completed the quiz!</Typography>
        {userData ? (
          <>
            <Typography variant="h4">{userData.username}, your final score is:</Typography>
            <Typography variant="h3">{userData.score}</Typography>
          </>
        ) : (
          <Typography variant="h3">Loading...</Typography>
        )}
        <Typography variant="body1" sx={{ mt: 2 }}>
          Thank you for participating.
        </Typography>
      </Card>
    </Box>
  );
}

export default QuizCompleted;
