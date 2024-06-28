import { useEffect, useState } from "react";
import { TextField, Snackbar, Alert } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const chorttextQuestion = () => {
  const [text, setText] = useState("");
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
      <Box
        sx={{
          width: "100%",
          bgcolor: "#FBF4E2",
          color: "white",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          px: 2,
          py: 1,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <Typography variant="body1" sx={{ color: "#C1986C" }}>
            Question Progress:
          </Typography>
          <Typography variant="body1" sx={{ color: "#000" }}>
            2/6
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <Typography variant="body1" sx={{ color: "#C1986C" }}>
            Time Spent:
          </Typography>
          <Typography variant="body1" sx={{ color: "#000" }}>
            00:12:12
          </Typography>
        </Box>
      </Box>
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
            Lorem ipsum dolor sit amet consectetur. Ullamcorper sed molestie
            tempus scelerisque. Nunc egestas mattis tempor diam nulla sagittis.
            Vestibulum curabitur blandit eu amet faucibus aliquam eros.
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
          <Typography
            sx={{
              fontSize: { xs: 14, sm: 16 },
              textAlign: "center",
              width: "100%",
              mt: 3,
            }}
          >
            Lorem ipsum dolor sit amet consectetur. Ullamcorper sed molestie
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
