import { useState, useEffect, useRef, useCallback } from "react";
import RadioBoxQuestion from "@/component/questions/radioboxQuestion";
import CheckBoxQuestion from "@/component/questions/checkboxQuestion";
import ShortTextQuestion from "@/component/questions/shorttextQuestion";
import LongTextQuestion from "@/component/questions/longtextQuestion";
import ListQuestion from "@/component/questions/listQuestion";
import VideoQuestion from "@/component/questions/videoQuestion";
import { Alert, Box, Button, Typography } from "@mui/material";
import TIMEOUT from "./timeout";
import { useTranslation } from "@/hooks/useTranslation";
import axios from "axios";
import SkipPopup from "@/component/popupalet/skipPopup";

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
  packId: string;
  packs: any[];
};

const QuestionComponent = ({
  assessmentData,
  send,
}: {
  assessmentData: AssessmentData;
  send: any;
}) => {
  const [question, setQuestion] = useState<Question | null>(null);
  const [answers, setAnswers] = useState<any>([]);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [backgroundColor, setBackgroundColor] = useState<string>("#F6F7F6");
  const [textColor, setTextColor] = useState<string>("#3A923E");
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const { t } = useTranslation("progress");
  const selectedValue = localStorage.getItem("selectedValue");
  const [currentPackIndex, setCurrentPackIndex] = useState<number>(0);

  const POST_EVAL_URL = `http://localhost:5002/api/v1/evaluation/031d6d67-85d8-4c93-81eb-30c754797d79/answer`;

  const handleAnswerChange = (answers: any) => {
    setAnswers(answers);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!assessmentData || currentPackIndex >= assessmentData.packs.length) {
        console.log("No more packs to process or assessmentData is missing");
        return;
      }
      const currentPack = assessmentData.packs[currentPackIndex];
      const API_BASE_URL = `http://localhost:5002/api/v1/evaluation/031d6d67-85d8-4c93-81eb-30c754797d79/start/${currentPack.id}`;
      try {
        const response = await axios.patch(API_BASE_URL, {
          hasHandicap: selectedValue,
        });

        const data = response.data;

        setQuestion({
          numberOfQuestions: data?.numberOfQuestions || 0,
          currentQuestionCount: data?.currentQuestionCount || 0,
          type: data?.nextQuestion?.type || "",
          isTrainingQuestion: data?.nextQuestion?.isTrainingQuestion || false,
          name: data?.nextQuestion?.name || "",
          description: data?.nextQuestion?.description || "",
          answers: data?.nextQuestion?.answers || [],
        });
        setCurrentPackIndex(currentPackIndex + 1);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    fetchData();
  }, [currentPackIndex, assessmentData]);

  const submitAnswer = useCallback(async () => {
    if (answers.length === 0) {
      setPopupOpen(true);
      
    }

    try {
      const response = await axios.patch(POST_EVAL_URL, {
        answers: answers,
      });

      console.log("Answer submitted successfully:", response.data);

      if (response.data.hasNext) {
        setAnswers([]);
        const deliveredData = response.data;
        setQuestion({
          numberOfQuestions: deliveredData?.numberOfQuestions || 0,
          currentQuestionCount: deliveredData?.currentQuestionCount || 0,
          type: deliveredData?.nextQuestion?.type || "",
          isTrainingQuestion:
            deliveredData?.nextQuestion?.isTrainingQuestion || false,
          name: deliveredData?.nextQuestion?.name || "",
          description: deliveredData?.nextQuestion?.description || "",
          answers: deliveredData?.nextQuestion?.answers || [],
        });
      }
      if (
        !response.data.finished &&
        response.data.feedback &&
        response.data.hasNext &&
        !response.data.nextQuestion
      ) {
        send({ type: "CallFeedback" });
      }
      if (
        response.data.finished &&
        !response.data.feedback &&
        !response.data.nextQuestion
      ) {
        send({ type: "CallResult" });
      }
      if (
        response.data.finished &&
        response.data.feedback &&
        !response.data.nextQuestion
      ) {
        send({ type: "CallFeedback" });
        
      }
      if (
        !response.data.feedback &&
        response.data.hasNext &&
        !response.data.nextQuestion
      ) {
        send({ type: "CallStart" });
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  }, [send, answers]);

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
  }, [elapsedTime, question, assessmentData.estimatedTime]);

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
        <LongTextQuestion
          question={question}
          answers={answers}
          onChange={handleAnswerChange}
        />
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
        <Button onClick={submitAnswer}>send</Button>
      </Box>
      {questionComponent}
      {question.isTrainingQuestion && (
        <Alert severity="info">{t("test")}</Alert>
      )}
      <SkipPopup open={isPopupOpen} onClose={() => setPopupOpen(false)} />
    </>
  );
};

export default QuestionComponent;
