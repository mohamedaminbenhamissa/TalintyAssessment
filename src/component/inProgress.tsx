import React, { useState, useEffect, useRef } from "react";
import RadioBoxQuestion from "@/component/questions/radioboxQuestion";
import CheckBoxQuestion from "@/component/questions/checkboxQuestion";
import ShortTextQuestion from "@/component/questions/chorttextQuestion";
import LongTextQuestion from "@/component/questions/longtextQuestion";
import ListQuestion from "@/component/questions/listQuestion";
import VideoQuestion from "@/component/questions/videoQuestion";
import { Alert, Box, Typography } from "@mui/material";
import assessmentData from "../../assessment.json";
import TIMEOUT from "./timeout";
import html2canvas from "html2canvas";

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
  const [estimatedTime, setEstimatedTime] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [backgroundColor, setBackgroundColor] = useState<string>("#F6F7F6");
  const [textColor, setTextColor] = useState<string>("#3A923E");
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const ToCaptureRef = useRef(null);
  useEffect(() => {
    if (assessmentData.numberOfQuestions) {
      setNumberOfQuestions(assessmentData.numberOfQuestions);
      setEstimatedTime(assessmentData.estimatedTime);
    }
  }, []);

  useEffect(() => {
    fetch("../../question.json")
      .then((response) => response.json())
      .then((data) => setQuestion(data))
      .catch((error) => console.error("Error loading question.json:", error));
  }, []);

  useEffect(() => {
    if (question) {
      timerRef.current = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [question]);

  useEffect(() => {
    if (question) {
      const oneThirdTime = estimatedTime / 3;
      const twoThirdsTime = (estimatedTime / 3) * 2;

      if (elapsedTime < oneThirdTime) {
        setBackgroundColor("#F6F7F6");
        setTextColor("#3A923E");
      } else if (elapsedTime >= oneThirdTime && elapsedTime < twoThirdsTime) {
        setBackgroundColor("#FBF4E2");
        setTextColor("#C1986C");
      } else {
        setBackgroundColor("#FFEEEE");
        setTextColor("#D15050");
      }
    }
  }, [elapsedTime, question]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (!question) {
    return <div>Loading...</div>;
  }

  if (elapsedTime >= estimatedTime) {
    return <TIMEOUT />;
  }

  let questionComponent;
  switch (question.type) {
    case "radio":
      questionComponent = <RadioBoxQuestion question={question} />;
      break;
    case "checkbox":
      questionComponent = <CheckBoxQuestion question={question} />;
      break;
    case "shortText":
      questionComponent = <ShortTextQuestion question={question} />;
      break;
    case "text":
      questionComponent = <LongTextQuestion question={question} />;
      break;
    case "list":
      questionComponent = <ListQuestion question={question} />;
      break;
    case "video":
      questionComponent = <VideoQuestion question={question} />;
      break;
    default:
      questionComponent = <div>Unknown question type</div>;
  }

  return (
    <>
      <Box
        sx={{
          width: "100%",
          bgcolor: backgroundColor,
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
          <Typography variant="body1" sx={{ color: textColor }}>
            Question Progress:
          </Typography>
          <Typography variant="body1" sx={{ color: "#000" }}>
            {`2/${numberOfQuestions}`}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <Typography variant="body1" sx={{ color: textColor }}>
            Difficulty:
          </Typography>
          <Typography variant="body1" sx={{ color: "#000" }}>
            {question.difficulty}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <Typography variant="body1" sx={{ color: textColor }}>
            Time Spent:
          </Typography>
          <Typography variant="body1" sx={{ color: "#000" }}>
            {formatTime(elapsedTime)}
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
