import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Divider, Grid, Switch } from "@mui/material";
import RecordCamera from "../assets/camera";
import KeyboardVoiceOutlinedIcon from "@mui/icons-material/KeyboardVoiceOutlined";
import NotStartedOutlinedIcon from "@mui/icons-material/NotStartedOutlined";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import StopCircleOutlinedIcon from "@mui/icons-material/StopCircleOutlined";

export default function CONFIG_WEBCAM() {
  const [cameraState, setCameraState] = useState(false);
  const [microphoneState, setMicrophoneState] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recording, setRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunks = useRef<Blob[]>([]);
  const { t } = useTranslation("configuration");

  useEffect(() => {
    const getMedia = async () => {
      try {
        const userMediaStream = await navigator.mediaDevices.getUserMedia({
          video: cameraState,
          audio: microphoneState,
        });
        setStream(userMediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = userMediaStream;
        }
        setError(null);
      } catch (err) {
        console.error("Error accessing media devices.", err);
        // setError("Error accessing media devices.");
      }
    };

    if (cameraState || microphoneState) {
      getMedia();
    } else {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [cameraState, microphoneState]);

  const handleCameraToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCameraState(event.target.checked);
  };

  const handleMicrophoneToggle = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMicrophoneState(event.target.checked);
  };

  const handleStartRecording = () => {
    if (stream) {
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunks.current.push(event.data);
        }
      };
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunks.current, {
          type: "video/webm",
        });
        const url = URL.createObjectURL(blob);
        if (videoRef.current) {
          videoRef.current.srcObject = null;
          videoRef.current.src = url;
          videoRef.current.controls = true;
          videoRef.current.play();
        }
        recordedChunks.current = [];
      };
      mediaRecorderRef.current.start();
      setRecording(true);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
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
                ref={videoRef}
                sx={{
                  maxWidth: "100%",
                  height: { xs: "200px", sm: "300px" },
                  borderRadius: "10px",
                }}
                autoPlay
                muted
              />
              {error && (
                <Typography color="error" sx={{ mt: 2 }}>
                  {error}
                </Typography>
              )}
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
                onClick={recording ? handleStopRecording : handleStartRecording}
              >
                {recording ? (
                  <StopCircleOutlinedIcon />
                ) : (
                  <NotStartedOutlinedIcon />
                )}

                {recording ? "Stop Recording" : "Start Recording"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
