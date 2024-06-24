import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Checkbox, FormControlLabel, TextField, Stack } from "@mui/material";
import { useTranslation } from "@/hooks/useTranslation";
import { useEffect } from "react";

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
  const { t, i18n } = useTranslation("consent");
  console.log(i18n.language);
  useEffect(() => {
    document.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);
  const currentDate = formatDate(new Date());

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value.toUpperCase());
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
      }}
    >
      <CardContent sx={{ flex: 1 }}>
        <Box sx={{ width: "100%", mt: 2 }}>
          <Typography
            sx={{
              fontSize: 14,
              textAlign: "justify",
            }}
          >
            {t("text1")}
          </Typography>
          <Typography
            sx={{
              fontSize: 14,
              textAlign: "justify",
              mt: 2, // Add margin top for separation
            }}
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
            control={<Checkbox name="agree" />}
            label={t("agreepolicy")}
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
          >
            Your signature
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
            />
            <Typography
              variant="body1"
              sx={{
                fontSize: 14,
                textAlign: "center",
                minWidth: "fit-content",
              }}
            >
              Date: {currentDate}
            </Typography>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
