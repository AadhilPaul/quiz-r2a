import {
  Button,
  Card,
  Box,
  TextField,
  Typography,
  FormControl,
  FormGroup,
} from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

function Username({ setUsername }) {
  const [nameInput, setNameInput] = useState("");
  const [classInput, setClassInput] = useState("");
  const [batchInput, setBatchInput] = useState("");
  const [quizCompleted, setQuizCompleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isCompleted = localStorage.getItem("quizCompleted");
    if (isCompleted === "true") {
      setQuizCompleted(true);
    }
  }, []);

  const handleNext = () => {
    localStorage.setItem("quizUsername", nameInput);
    setUsername(`${nameInput} ${classInput} ${batchInput}`);
  };

  const primaryColor = "#0f9e99";
  const secondaryColor = "#efe9e0";
  const fontColor = "black";
  const backgroundColor = "#f9f9f9";

  if (quizCompleted) {
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
            color: fontColor,
            borderRadius: "12px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
          }}
        >
          <Typography variant="h5">
            🎉 You have already completed the quiz!
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Thank you for participating.
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/quiz_completed")}
            sx={{
              mt: 2,
              backgroundColor: primaryColor,
              "&:hover": { backgroundColor: "#0d8d89" },
              alignSelf: "end",
              borderRadius: "8px",
              fontSize: "16px",
              textTransform: "capitalize",
            }}
          >
            View Results
          </Button>
        </Card>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{ backgroundColor: backgroundColor }}
    >
      <Card
        raised
        sx={{
          padding: "3rem",
          width: "400px",
          backgroundColor: secondaryColor,
          color: fontColor,
          borderRadius: "12px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            alignItems: "center",
          }}
        >
          <FaceIcon sx={{ fontSize: "80px", color: fontColor }} />
          <Typography variant="h5">Enter Your Details</Typography>

          {/* Username Input */}
          <FormControl fullWidth>
            <TextField
              variant="outlined"
              label="Username"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              fullWidth
              InputLabelProps={{ style: { color: fontColor } }}
              InputProps={{ style: { color: fontColor } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: primaryColor },
                  "&:hover fieldset": { borderColor: primaryColor },
                  "&.Mui-focused fieldset": { borderColor: primaryColor },
                },
              }}
            />
          </FormControl>

          {/* Class & Batch in a row */}
          <FormGroup
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "1rem",
              width: "100%",
            }}
          >
            <TextField
              variant="outlined"
              label="Class"
              value={classInput}
              onChange={(e) => setClassInput(e.target.value)}
              fullWidth
              InputLabelProps={{ style: { color: fontColor } }}
              InputProps={{ style: { color: fontColor } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: primaryColor },
                  "&:hover fieldset": { borderColor: primaryColor },
                  "&.Mui-focused fieldset": { borderColor: primaryColor },
                },
              }}
            />
            <TextField
              variant="outlined"
              label="Batch"
              value={batchInput}
              onChange={(e) => setBatchInput(e.target.value)}
              fullWidth
              InputLabelProps={{ style: { color: fontColor } }}
              InputProps={{ style: { color: fontColor } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: primaryColor },
                  "&:hover fieldset": { borderColor: primaryColor },
                  "&.Mui-focused fieldset": { borderColor: primaryColor },
                },
              }}
            />
          </FormGroup>

          <Button
            variant="contained"
            disabled={
              !nameInput.trim() || !classInput.trim() || !batchInput.trim()
            }
            onClick={handleNext}
            sx={{
              mt: 2,
              backgroundColor: primaryColor,
              "&:hover": { backgroundColor: "#0d8d89" },
              alignSelf: "end",
              borderRadius: "8px",
              fontSize: "16px",
              textTransform: "capitalize",
            }}
          >
            Start Quiz
          </Button>
        </Box>
      </Card>
    </Box>
  );
}

export default Username;
