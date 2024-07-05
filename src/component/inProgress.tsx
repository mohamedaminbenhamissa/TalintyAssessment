import { useState, useEffect } from "react";
import RadioBoxQuestion from "@/component/questions/radioboxQuestion";
import CheckBoxQuestion from "@/component/questions/checkboxQuestion";
import ShortTextQuestion from "@/component/questions/chorttextQuestion";
import LongTextQuestion from "@/component/questions/longtextQuestion";

import { Alert, Box, Typography } from "@mui/material";
import assessmentData from "../../assessment.json";

type Question = {
  type: string;
  isTrainingQuestion: boolean;
  difficulty: string;
  name: string;
  description: string;
  answers: string[];
};

const QuestionComponent = () => {
  const [question, setQuestion] = useState<Question | null>(null);
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(0);

  useEffect(() => {
    if (assessmentData.numberOfQuestions) {
      setNumberOfQuestions(assessmentData.numberOfQuestions);
    }
  }, []);
  useEffect(() => {
    fetch("../../question.json")
      .then((response) => response.json())
      .then((data) => setQuestion(data))
      .catch((error) => console.error("Error loading question.json:", error));

    const fetchAssessmentData = async () => {};
    fetchAssessmentData();
  }, []);

  if (!question) {
    return <div>Loading...</div>;
  }

  let questionComponent;
  switch (question.type) {
    case "radio":
      questionComponent = <RadioBoxQuestion question={question} />;
      break;
    case "checkbox":
      questionComponent = <CheckBoxQuestion question={question} />;
      break;

    case "shorttext":
      questionComponent = <ShortTextQuestion question={question} />;
      break;
    case "longtext":
      questionComponent = <LongTextQuestion question={question} />;
      break;
    // case "video":
    //   questionComponent = <VideoQuestion question={question} />;
    //   break;
    default:
      questionComponent = <div>Unknown question type</div>;
  }

  return (
    <>
      <Box
        sx={{
          width: "100%",
          bgcolor: "#FFEEEE",
          color: "white",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: { sm: "space-evenly" },
          alignItems: "center",
          py: 1,
          gap: { xs: 1, sm: 0 },
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <Typography variant="body1" sx={{ color: "#D15050" }}>
            Question Progress:
          </Typography>
          <Typography variant="body1" sx={{ color: "#D15050" }}>
            {`2/${numberOfQuestions}`}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <Typography variant="body1" sx={{ color: "#D15050" }}>
            Difficulty:
          </Typography>
          <Typography variant="body1" sx={{ color: "#D15050" }}>
            {question.difficulty}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <Typography variant="body1" sx={{ color: "#D15050" }}>
            Time Spent:
          </Typography>
          <Typography variant="body1" sx={{ color: "#D15050" }}>
            00:12:12
          </Typography>
        </Box>
      </Box>
      {questionComponent}
      {question.isTrainingQuestion && (
        <Alert severity="info">
          This question doesn't count towards your score. It's part of a trial
          phase.
        </Alert>
      )}
    </>
  );
};

export default QuestionComponent;
