import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import parse from "html-react-parser";
import { SelectChangeEvent } from "@mui/material/Select";

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

const ListQuestion: React.FC<QuestionProps> = ({ question }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, _setSnackbarMessage] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedAnswer(event.target.value);
  };

  useEffect(() => {
    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

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
        userSelect: "none",
      }}
    >
      <CardContent sx={{ flex: 1 }}>
        <FormControl fullWidth>
          <InputLabel id="question-select-label">{question.name}</InputLabel>
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
          <Select
            labelId="question-select-label"
            id="question-select"
            value={selectedAnswer}
            label={question.name}
            onChange={handleChange}
          >
            {question.answers.map((option: string, index: number) => (
              <MenuItem key={index} value={option}>
                {parse(option)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </CardContent>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity="warning">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default ListQuestion;
