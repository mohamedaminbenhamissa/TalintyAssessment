import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  FormControlLabel,
  RadioGroup,
  FormControl,
  FormLabel,
  Checkbox,
} from "@mui/material";
import { useEffect } from "react";
import parse from "html-react-parser";

type QuestionProps = {
  question: {
    name: string;
    description: string;
    answers: string[];
  };
};

const checkboxQuestion: React.FC<QuestionProps> = ({ question }) => {
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

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        minWidth: 320,
        boxShadow: 0,
        minHeight: 500,
        border: "ActiveBorder",
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
                textAlign: "left",
              }}
            >
              {parse(question.description)}
            </Typography>
          </FormLabel>
          <RadioGroup name={question.name}>
            {question.answers.map((option: string, index: number) => (
              <Box
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
                  key={index}
                  value={option}
                  control={<Checkbox />}
                  label={
                    <Typography variant="body2">{parse(option)}</Typography>
                  }
                />
              </Box>
            ))}
          </RadioGroup>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default checkboxQuestion;
