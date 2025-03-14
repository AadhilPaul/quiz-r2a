import axios from "axios";

const API_URL = "https://backend-mocha-eta.vercel.app/api";

// Fetch quiz questions
export const fetchQuestions = async () => {
  try {
    const res = await axios.get(`${API_URL}/questions`);
    return res.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
};

// Submit quiz response
export const submitResponse = async (username, qId, selectedAnswer) => {
  try {
    await axios.post(`${API_URL}/submit`, {
      username,
      qId,
      selectedAnswer,
    });
  } catch (error) {
    console.error("Error submitting response:", error);
  }
};
