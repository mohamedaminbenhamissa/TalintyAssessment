import { useEffect, useState } from "react";
import { TextField, Snackbar, Alert } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import parse from "html-react-parser";

type QuestionProps = {
  question: {
    name: string;
    description: string;
    answers: string[];
  };
};

const chorttextQuestion: React.FC<QuestionProps> = ({ question }) => {
  const [, setText] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

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
        <Box sx={{ width: "100%", mt: 2 }}>
          <Typography
            sx={{
              fontSize: { xs: 14, sm: 16 },
              textAlign: "justify",
              width: "100%",
              mt: 2,
              fontWeight: "bold",
            }}
          >
            Question :
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 14, sm: 16 },
              textAlign: "justify",
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
              mt: 3,
              fontWeight: "bold",
            }}
          >
            Answer:
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
            onChange={(e) => setText(e.target.value)}
            id="outlined-basic"
            label=""
            variant="outlined"
            onCopy={handleCopy}
            onPaste={handlePaste}
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

export default chorttextQuestion;
