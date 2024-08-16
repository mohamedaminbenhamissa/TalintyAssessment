import { Alert, Snackbar, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import { useTranslation } from "@/hooks/useTranslation";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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

  const handleQuillChange = (content: string) => {
    onChange([content]);
  };

  useEffect(() => {
    const quill = document.querySelector(".ql-editor");
    if (quill) {
      quill.addEventListener("copy", (event) => {
        event.preventDefault();
        setSnackbarMessage("Copying is disabled!");
        setSnackbarOpen(true);
      });
      quill.addEventListener("cut", (event) => {
        event.preventDefault();
        setSnackbarMessage("Cutting is disabled!");
        setSnackbarOpen(true);
      });
      quill.addEventListener("paste", (event) => {
        event.preventDefault();
        setSnackbarMessage("Pasting is disabled!");
        setSnackbarOpen(true);
      });
    }

    return () => {
      if (quill) {
        quill.removeEventListener("copy", (event) => event.preventDefault());
        quill.removeEventListener("cut", (event) => event.preventDefault());
        quill.removeEventListener("paste", (event) => event.preventDefault());
      }
    };
  }, []);

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
              // mt: 1,
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
              // mt: 1,
            }}
          >
            {parse(question.name)}
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 14, sm: 16 },
              textAlign: "justify",
              width: "100%",
              mt: 1,
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
            width: "80%",

            mx: "auto",
            mt: 1,
            gap: 1,
          }}
        >
          <ReactQuill
            value={answers?.[0] || ""}
            onChange={handleQuillChange}
            modules={{
              toolbar: [
                [{ font: [] }],
                [{ size: [] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [
                  { list: "ordered" },
                  { list: "bullet" },
                  { indent: "-1" },
                  { indent: "+1" },
                ],

                ["clean"],
              ],
            }}
            formats={[
              "header",
              "font",
              "size",
              "bold",
              "italic",
              "underline",
              "strike",
              "blockquote",
              "list",
              "bullet",
              "indent",
              "link",
              "image",
            ]}
            style={{ height: "200px", width: "100%" }}
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
