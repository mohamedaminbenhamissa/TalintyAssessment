import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  FormControlLabel,
  FormControl,
  FormLabel,
  Checkbox,
} from "@mui/material";
import parse from "html-react-parser";

type QuestionProps = {
  question: {
    name: string;
    description: string;
    answers: string[];
  };
  onChange: (answers: string[]) => void;
};

const arabicCharPattern = /[\u0600-\u06FF\u0750-\u077F]/;

const isArabicText = (text: string): boolean => {
  return arabicCharPattern.test(text) && text.length > 30;
};

const CheckboxQuestion: React.FC<QuestionProps> = ({ question, onChange }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);

  useEffect(() => {
    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  const handleCheckboxChange = (answer: string) => {
    setSelectedAnswers((prevSelectedAnswers) => {
      const newSelectedAnswers = prevSelectedAnswers.includes(answer)
        ? prevSelectedAnswers.filter((a) => a !== answer)
        : [...prevSelectedAnswers, answer];

      onChange(newSelectedAnswers);
      return newSelectedAnswers;
    });
  };

  if (!question || !question.answers) {
    return <Typography variant="body1">No question data available</Typography>;
  }
  const textAlign = isArabicText(question.description) ? "right" : "left";
  const direction = isArabicText(question.description) ? "rtl" : "ltr";

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        minWidth: 320,
        boxShadow: 0,
        minHeight: 500,
        border: "1px solid",
        userSelect: "none",
      }}
    >
      <CardContent sx={{ flex: 1 }}>
        <FormControl component="fieldset">
          <FormLabel component="legend">
            <Typography
              variant="body2"
              sx={{
                fontSize: "0.875rem",
                lineHeight: "1.2",
                textAlign,
                direction,
              }}
              component="div"
            >
              {parse(question.description)}
            </Typography>
          </FormLabel>
          <Box>
            {question.answers.map((option: string, index: number) => (
              <Box
                key={index}
                sx={{
                  border: "1px solid grey",
                  px: 2,
                  borderRadius: 4,
                  display: "flex",
                  width: "90%",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedAnswers.includes(option)}
                      onChange={() => handleCheckboxChange(option)}
                    />
                  }
                  label={
                    <Typography variant="body2">{parse(option)}</Typography>
                  }
                />
              </Box>
            ))}
          </Box>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default CheckboxQuestion;
