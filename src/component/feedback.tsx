import React from "react";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import Happy from "../assets/happy.png";
import Normal from "../assets/normal.png";
import Sad from "../assets/sad.png";
import { useTranslation } from "@/hooks/useTranslation";

export default function Feedback() {
  const [value, setValue] = React.useState("");
  const { t } = useTranslation("feedback");

  const handleSelect = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        boxShadow: 0,
        border: "ActiveBorder",
        minHeight: 500,
        gap: 2,
        width: { xs: "100%", sm: "80%", md: "100%" },
      }}
    >
      <CardContent sx={{ flex: 1 }}>
        <Box sx={{ width: "90%", mt: 2, mx: "auto" }}>
          <Typography
            sx={{
              fontSize: { xs: 12, sm: 14 },
              textAlign: "justify",
            }}
          >
            {t("text1")}
          </Typography>
        </Box>

        <Box sx={{ width: "90%", mt: 2, mx: "auto" }}>
          <Typography
            sx={{
              fontSize: { xs: 14, sm: 16 },
              textAlign: "justify",
              fontWeight: 600,
              color: "#1A1A20",
            }}
          >
            {t("text2")}
          </Typography>
        </Box>

        <Box sx={{ width: "90%", mt: 2, mx: "auto" }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            gap={2}
            sx={{ width: "100%" }}
          >
            <Card
              onClick={() => handleSelect("notSoGreat")}
              sx={{
                flex: 1,
                border: 1,
                borderColor: value === "notSoGreat" ? "#1A1A20" : "#F8F9FA",
                position: "relative",
                paddingTop: 5,
                cursor: "pointer",
                backgroundColor: value === "notSoGreat" ? "#EEE6D8" : "#fff",
                mb: { xs: 2, sm: 0 },
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <img src={Sad} alt="Sad" style={{ maxWidth: "80px" }} />
              </Box>
              <Typography sx={{ textAlign: "center", mt: 2 }}>
                {t("feedback1")}
              </Typography>
            </Card>
            <Card
              onClick={() => handleSelect("good")}
              sx={{
                flex: 1,
                border: 1,
                borderColor: value === "good" ? "#1A1A20" : "#F8F9FA",
                position: "relative",
                paddingTop: 5,
                cursor: "pointer",
                backgroundColor: value === "good" ? "#EEE6D8" : "#fff",
                mb: { xs: 2, sm: 0 },
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <img src={Normal} alt="Normal" style={{ maxWidth: "80px" }} />
              </Box>
              <Typography sx={{ textAlign: "center", mt: 2 }}>
                {t("feedback2")}
              </Typography>
            </Card>
            <Card
              onClick={() => handleSelect("fantastic")}
              sx={{
                flex: 1,
                border: 1,
                borderColor: value === "fantastic" ? "#1A1A20" : "#F8F9FA",
                position: "relative",
                paddingTop: 5,
                cursor: "pointer",
                backgroundColor: value === "fantastic" ? "#EEE6D8" : "#fff",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <img src={Happy} alt="Happy" style={{ maxWidth: "80px" }} />
              </Box>
              <Typography sx={{ textAlign: "center", mt: 2, mb: 4 }}>
                {t("feedback3")}
              </Typography>
            </Card>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
