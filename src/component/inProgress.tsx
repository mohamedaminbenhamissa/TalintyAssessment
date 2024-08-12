import { useState, useEffect, useRef } from "react";
import RadioBoxQuestion from "@/component/questions/radioboxQuestion";
import CheckBoxQuestion from "@/component/questions/checkboxQuestion";
import ShortTextQuestion from "@/component/questions/shorttextQuestion";
import LongTextQuestion from "@/component/questions/longtextQuestion";
import ListQuestion from "@/component/questions/listQuestion";
import VideoQuestion from "@/component/questions/videoQuestion";
import { Alert, Box, Typography } from "@mui/material";
import TIMEOUT from "./timeout";
import { useTranslation } from "@/hooks/useTranslation";

type Question = {
  type: string;
  isTrainingQuestion: boolean;
  currentQuestionCount: number;
  name: string;
  description: string;
  answers: string[];
  numberOfQuestions: number;
};

type AssessmentData = {
  estimatedTime: number;
  numberTotalOfQuestions: number;
  numberOfQuestionsInCurrentPack: number;
  allowedTime: number;
  packId: string;
  packs: any[];
};

const QuestionComponent = ({
  assessmentData,
  currentPackIndex,
  question,
  setAnswers,
  answers,

}: 
{
  assessmentData: AssessmentData;
  send: any;
  currentPackIndex: number;
  setCurrentPackIndex: any;
  answers: any;
  fetchData: (currentPackIndex: number) => void;
  submitAnswer: () => void;
  question: Question | null;
  setAnswers: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [backgroundColor, setBackgroundColor] = useState<string>("#F6F7F6");
  const [textColor, setTextColor] = useState<string>("#3A923E");
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { t } = useTranslation("progress");

  // Start the timer 
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

  // Update background and text color based on the elapsed time
  useEffect(() => {
    if (question) {
      const oneThirdTime = assessmentData.packs[currentPackIndex].allowedTime / 3;
      const twoThirdsTime = (assessmentData.packs[currentPackIndex].allowedTime / 3) * 2;

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

  }, [elapsedTime, question, assessmentData.packs, currentPackIndex]);
console.log("this the all question : ",question)
  // Handle the format of the elapsed time
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (!question) {
    return <div>Loading...</div>;
  }

  if (elapsedTime >= assessmentData.packs[currentPackIndex].allowedTime) {
    return <TIMEOUT />;
  }

  // Dynamically render the appropriate question component based on the question type
  let questionComponent;
  switch (question.type) {
    case "radio":
      questionComponent = <RadioBoxQuestion question={question} onChange={setAnswers} />;
      break;
    case "checkbox":
      questionComponent = <CheckBoxQuestion question={question} onChange={setAnswers} />;
      break;
    case "shortText":
      questionComponent = <ShortTextQuestion question={question} onChange={setAnswers} />;
      break;
    case "text":
      questionComponent = <LongTextQuestion question={question} answers={answers} onChange={setAnswers} />;
      break;
    case "list":
      questionComponent = <ListQuestion question={question} onChange={setAnswers} />;
      break;
    case "video":
      questionComponent = <VideoQuestion question={question} onChange={setAnswers} />;
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
