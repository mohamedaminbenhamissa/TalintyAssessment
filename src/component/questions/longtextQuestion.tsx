import { Alert, Snackbar, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import { useTranslation } from "@/hooks/useTranslation";

type QuestionProps = {
  question: {
    name: string;
    description: string;
    answers: string[];
  };
  answers?: string[];

  onChange: (answer: string[]) => void;
};

const arabicCharPattern = /[\u0600-\u06FF\u0750-\u077F]/;

const isArabicText = (text: string): boolean => {
  return arabicCharPattern.test(text) && text.length > 30;
};

const LongTextQuestion: React.FC<QuestionProps> = ({
  question,
  answers,
  onChange,
}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { t } = useTranslation("progress");
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
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

  // useEffect(() => {
  //   console.log("Answer:", answer);
  // }, [answer]);
  const handleCopy = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSnackbarMessage("Copying is disabled!");
    setSnackbarOpen(true);
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSnackbarMessage("Pasting is disabled!");
    setSnackbarOpen(true);
  };

  // const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const newAnswer = event.target.value;
  //   const newAnswerArray = [newAnswer];
  //   setAnswer(newAnswerArray);
  //   onChange(newAnswerArray);
  // };

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
        <Box sx={{ width: "100%", mt: 2 }}>
          <Typography
              component="div"
            sx={{
              fontSize: { xs: 14, sm: 16 },
              textAlign,
              direction,
              width: "100%",
              mt: 1,
            }}
          >
            {parse(question.description)}
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 14, sm: 16 },
              textAlign: "justify",
              width: "100%",
              mt: 2,
              fontWeight: "bold",
            }}
          >
            {t("quest")}
          </Typography>
          <Typography
          component="div"
            sx={{
              fontSize: { xs: 14, sm: 16 },
              textAlign,
              direction,
              width: "100%",
              mt: 1,
            }}
          >
            {parse(question.name)}
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 14, sm: 16 },
              textAlign: "justify",
              width: "100%",
              mt: 3,
              fontWeight: "bold",
            }}
          >
            {t("rep")}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            width: "60%",
            mx: "auto",
            mt: 2,
            gap: 1,
          }}
        >
          <TextField
            id="outlined-basic"
            label=""
            variant="outlined"
            multiline
            minRows={10}
            maxRows={15}
            onCopy={handleCopy}
            onPaste={handlePaste}
            onChange={(e) => onChange([e.target.value])}
            value={answers?.[0] || ""}
            sx={{
              width: "100%",
            }}
          />
        </Box>
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

export default LongTextQuestion;
