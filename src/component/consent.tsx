import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  Checkbox,
  FormControlLabel,
  TextField,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import { useTranslation } from "@/hooks/useTranslation";
import { useEffect, useState } from "react";

function formatDate(date: Date) {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return new Intl.DateTimeFormat("fr-FR", options).format(date);
}

export default function CONSENT({
  name,
  setName,
}: {
  name: string;
  setName: (value: string) => void;
}) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isChecked, setIsChecked] = useState(false);
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

  const { t, i18n } = useTranslation("consent");

  useEffect(() => {
    document.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);
  const currentDate = formatDate(new Date());

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value.toUpperCase());
  };
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
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
      <CardContent sx={{ flex: 1 }}>
        <Box sx={{ width: "100%", mt: 2 }}>
          <Typography
            sx={{
              fontSize: 14,
              textAlign: "justify",
            }}
            tabIndex={0}
            aria-label={t("text1")}
          >
            {t("text1")}
          </Typography>
          <Typography
            sx={{
              fontSize: 14,
              textAlign: "justify",
              mt: 2,
            }}
            tabIndex={0}
            aria-label={t("text2")}
          >
            {t("text2")}
          </Typography>
        </Box>

        <hr style={{ margin: "20px 0" }} />

        <Box
          sx={{
            width: "100%",
            mt: 3,
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          {/* Third Part */}
          <Typography
            sx={{
              fontSize: 14,
              textAlign: "justify",
            }}
            tabIndex={0}
            aria-label={t("text3")}
          >
            {t("text3")}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            mt: 3,
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <FormControlLabel
            control={
              <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
            }
            label={t("agreepolicy")}
            tabIndex={0}
            aria-label={t("agreepolicy")}
          />
        </Box>
        <Box
          sx={{
            width: "100%",
            mt: 4,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              marginBottom: 1,
              fontWeight: "bold",
              display: "flex",
              alignItems: "flex-start",
            }}
            tabIndex={0}
            aria-label="Your signature"
          >
            {t("signature")}
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems="center"
          >
            <TextField
              id="outlined-basic"
              label=""
              variant="outlined"
              value={name}
              onChange={handleNameChange}
              sx={{ flex: 1 }}
              onCopy={handleCopy}
              onPaste={handlePaste}
            />
            <Typography
              variant="body1"
              sx={{
                fontSize: 14,
                textAlign: "center",
                minWidth: "fit-content",
              }}
              tabIndex={0}
              aria-label={currentDate}
            >
              Date: {currentDate}
            </Typography>
          </Stack>
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
}
