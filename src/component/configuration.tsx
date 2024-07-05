import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Divider, Grid, Switch } from "@mui/material";
import RecordCamera from "../assets/camera";
import KeyboardVoiceOutlinedIcon from "@mui/icons-material/KeyboardVoiceOutlined";
import NotStartedOutlinedIcon from "@mui/icons-material/NotStartedOutlined";
import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

export default function CONFIG_WEBCAM() {
  const [cameraState, setCameraState] = useState(true);
  const [microphoneState, setMicrophoneState] = useState(true);
  const { t } = useTranslation("configuration");

  const handleCameraToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCameraState(event.target.checked);
  };

  const handleMicrophoneToggle = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMicrophoneState(event.target.checked);
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        minWidth: { xs: 280, sm: 320 },
        minHeight: { xs: 450, sm: 500 },
        boxShadow: 0,
      }}
    >
      <CardContent sx={{ flex: 1 }}>
        <Grid container spacing={1}>
          <Grid item xs={12} tabIndex={0}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 1,
                background: "#E8E8F0",
                borderRadius: "10px",
                padding: 2,
              }}
            >
              <Typography
                sx={{
                  fontSize: 14,
                  textAlign: "justify",
                  width: "100%",
                }}
                tabIndex={0}
                aria-label={t("note")}
              >
                {t("note")}
              </Typography>
              <Divider sx={{ my: 2, borderColor: "#E3D9C8", width: "100%" }} />

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <RecordCamera width={24} height={24} />
                  <Typography
                    sx={{
                      fontSize: "16px",
                      lineHeight: "21px",
                      color: "#1A1A20",
                    }}
                    tabIndex={0}
                    aria-label="Camera"
                  >
                    Camera
                  </Typography>
                </Box>
                <Switch
                  checked={cameraState}
                  onChange={handleCameraToggle}
                  style={{ color: "#C1976B" }}
                  inputProps={{ "aria-label": "camera toggle" }}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <KeyboardVoiceOutlinedIcon
                    width={24}
                    height={24}
                    sx={{ color: "#C1976B" }}
                  />
                  <Typography
                    sx={{
                      fontSize: "16px",
                      lineHeight: "21px",
                      color: "#1A1A20",
                    }}
                    tabIndex={0}
                    aria-label="Microphone"
                  >
                    Microphone
                  </Typography>
                </Box>
                <Switch
                  checked={microphoneState}
                  onChange={handleMicrophoneToggle}
                  style={{ color: "#C1976B" }}
                  inputProps={{ "aria-label": "microphone toggle" }}
                />
              </Box>
            </Box>
          </Grid>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 2,
              borderRadius: "5px",
              padding: 1,
              width: "100%",
            }}
          >
            {/* Additional controls if any */}
          </Box>

          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: 2,
              }}
            >
              <Box
                component="video"
                sx={{
                  maxWidth: "100%",
                  height: { xs: "200px", sm: "300px" },
                  borderRadius: "10px",
                }}
                controls
              >
                <source
                  src="https://www.youtube.com/watch?v=ZyQlpX7lCRE"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </Box>
              <Button
                sx={{
                  background: "#C1976B",
                  color: "#fff",
                  px: 2,
                  py: 1,
                  borderRadius: "10px",
                  mt: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  ":hover": {
                    background: "#C1976B",
                    color: "#fff",
                  },
                }}
                size="small"
              >
                <NotStartedOutlinedIcon /> Commencer l'enregistrement
              </Button>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
