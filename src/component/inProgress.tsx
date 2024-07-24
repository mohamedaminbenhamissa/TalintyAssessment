import { useState, useEffect, useRef } from "react";
import RadioBoxQuestion from "@/component/questions/radioboxQuestion";
import CheckBoxQuestion from "@/component/questions/checkboxQuestion";
import ShortTextQuestion from "@/component/questions/chorttextQuestion";
import LongTextQuestion from "@/component/questions/longtextQuestion";
import ListQuestion from "@/component/questions/listQuestion";
import VideoQuestion from "@/component/questions/videoQuestion";
import { Alert, Box, Typography } from "@mui/material";

import TIMEOUT from "./timeout";
import { useTranslation } from "@/hooks/useTranslation";
import axios from "axios";
type Question = {
  type: string;
  isTrainingQuestion: boolean;
  currentQuestionCount: number;
  name: string;
  description: string;
  answers: string[];
  numberOfQuestions: number;
};

interface AssessmentData {
  estimatedTime: number;
  numberTotalOfQuestions: number;
}

const API_BASE_URL = `http://localhost:5002/api/v1/evaluation/115e0442-b0c4-4a10-a86b-1ccdda809214/start/664486309fd39c20961b092f`;

const QuestionComponent = ({
  assessmentData,
}: {
  assessmentData: AssessmentData;
}) => {
  const [question, setQuestion] = useState<Question | null>(null);
  const [answer, setAnswer] = useState<any>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [backgroundColor, setBackgroundColor] = useState<string>("#F6F7F6");
  const [textColor, setTextColor] = useState<string>("#3A923E");
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { t } = useTranslation("progress");
  const selectedValue = localStorage.getItem("selectedValue");
  console.log("object", selectedValue);
  const fetchData = async () => {
    try {
      const response = await axios.patch(API_BASE_URL, {
        hasHandicap: selectedValue,
      });

      const data = response.data;

      setQuestion({
        numberOfQuestions: data?.numberOfQuestions || 0,
        currentQuestionCount: data?.currentQuestionCount || 0,
        type: data?.nextQuestion.type || "",
        isTrainingQuestion: data?.nextQuestion.isTrainingQuestion || false,
        name: data?.nextQuestion.name || "",
        description: data?.nextQuestion.description || "",
        answers: data?.nextQuestion.answers || [],
      });
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };
  const handleAnswerChange = (newAnswer: any) => {
    setAnswer(newAnswer);
  };
  useEffect(() => {
    fetchData();
  }, []);
  // useEffect(() => {
  //   fetch("../../question.json")
  //     .then((response) => response.json())
  //     .then((data) => setQuestion(data))
  //     .catch((error) => console.error("Error loading question.json:", error));
  // }, []);
  console.log(
    "++++++++++++++++++-+++++++",
    assessmentData.estimatedTime,
    assessmentData.numberTotalOfQuestions
  );

  const submitAnswer = async () => {
    try {
      const response = await axios.post(API_BASE_URL, {
        questionId: question?.name,
        answer: answer,
      });
      console.log("Answer submitted successfully:", response.data);
      // Fetch next question or handle completion
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

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
      const oneThirdTime = assessmentData.estimatedTime / 3;
      const twoThirdsTime = (assessmentData.estimatedTime / 3) * 2;

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

  if (elapsedTime >= assessmentData.estimatedTime) {
    return <TIMEOUT />;
  }

  let questionComponent;
  switch (question.type) {
    case "radio":
      questionComponent = (
        <RadioBoxQuestion question={question} onChange={handleAnswerChange} />
      );
      break;
    case "checkbox":
      questionComponent = (
        <CheckBoxQuestion question={question} onChange={handleAnswerChange} />
      );
      break;
    case "shortText":
      questionComponent = (
        <ShortTextQuestion question={question} onChange={handleAnswerChange} />
      );
      break;
    case "text":
      questionComponent = (
        <LongTextQuestion question={question} onChange={handleAnswerChange} />
      );
      break;
    case "list":
      questionComponent = (
        <ListQuestion question={question} onChange={handleAnswerChange} />
      );
      break;
    case "video":
      questionComponent = (
        <VideoQuestion question={question} onChange={handleAnswerChange} />
      );
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
          justifyContent: { sm: "space-between" },
          alignItems: "center",
          py: 1,
          gap: { xs: 1, sm: 0 },
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <Typography variant="body1" sx={{ color: textColor }}>
            {t("tprogress")}
          </Typography>
          <Typography variant="body1" sx={{ color: "#000" }}>
            {`${question.currentQuestionCount}/${question.numberOfQuestions}`}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <Typography variant="body1" sx={{ color: textColor }}>
            {t("tspent")}
          </Typography>
          <Typography variant="body1" sx={{ color: "#000" }}>
            {formatTime(elapsedTime)}
          </Typography>
        </Box>
      </Box>
      {questionComponent}
      {question.isTrainingQuestion && (
        <Alert severity="info">{t("test")}</Alert>
      )}
    </>
  );
};

export default QuestionComponent;
