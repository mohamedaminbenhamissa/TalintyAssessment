import React, { useRef, useState, useCallback } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Grid,
  Alert,
  Button,
  ButtonGroup,
  Snackbar,
} from "@mui/material";
import parse from "html-react-parser";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";
import StopCircleOutlinedIcon from "@mui/icons-material/StopCircleOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import SendIcon from "@mui/icons-material/Send";
import Webcam from "react-webcam";

type QuestionProps = {
  question: {
    name: string;
    description: string;
    answers: string[];
  };
};

const VideoQuestion: React.FC<QuestionProps> = ({ question }) => {
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const videoPlayerRef = useRef<HTMLVideoElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleStartRecording = useCallback(() => {
    if (webcamRef.current) {
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream!, {
        mimeType: "video/webm",
      });
      mediaRecorderRef.current.ondataavailable = handleDataAvailable;
      mediaRecorderRef.current.start();
      setIsRecording(true);
    }
  }, [webcamRef, mediaRecorderRef, setIsRecording]);

  const handleDataAvailable = useCallback(
    ({ data }: BlobEvent) => {
      if (data.size > 0) {
        setVideoBlob(data);
        setSnackbarMessage("Recording saved successfully!");
        setSnackbarOpen(true);
      }
    },
    [setVideoBlob, setSnackbarMessage, setSnackbarOpen]
  );

  const handleStopRecording = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  }, [mediaRecorderRef, setIsRecording]);

  const handlePlayPause = () => {
    if (videoPlayerRef.current) {
      if (isPlaying) {
        videoPlayerRef.current.pause();
        setIsPlaying(false);
      } else {
        videoPlayerRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleStop = () => {
    if (videoPlayerRef.current) {
      videoPlayerRef.current.pause();
      videoPlayerRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const handleSend = () => {
    if (videoBlob) {
      const formData = new FormData();
      formData.append("video", videoBlob, "recording.webm");

      setSnackbarMessage("Video sent successfully!");
      setSnackbarOpen(true);
    }
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        minWidth: 320,
        boxShadow: 0,
        minHeight: 500,
      }}
    >
      <CardContent sx={{ flex: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography variant="body2" sx={{ mt: 2 }} gutterBottom>
              {parse(question.description)}
            </Typography>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item xs={12} sm={7}>
            <Box
              sx={{
                width: "100%",
                height: { xs: "200px", sm: "300px" },
                borderRadius: "10px",
                p: 2,
              }}
            >
              {videoBlob ? (
                <video ref={videoPlayerRef} width="100%" height="100%" controls>
                  <source
                    src={URL.createObjectURL(videoBlob)}
                    type="video/webm"
                  />
                </video>
              ) : (
                <Webcam
                  audio={true}
                  ref={webcamRef}
                  //videoConstraints={{ width: "100%", height: "100%" }}
                />
              )}
            </Box>
            <ButtonGroup sx={{ borderColor: "#C1986C", mt: 2 }}>
              {!videoBlob ? (
                <Button
                  onClick={
                    isRecording ? handleStopRecording : handleStartRecording
                  }
                >
                  {isRecording ? (
                    <StopCircleOutlinedIcon sx={{ color: "#C1986C" }} />
                  ) : (
                    <PlayCircleOutlinedIcon sx={{ color: "#C1986C" }} />
                  )}
                </Button>
              ) : (
                <>
                  <Button onClick={handlePlayPause}>
                    {isPlaying ? (
                      <ReplayOutlinedIcon sx={{ color: "#C1986C" }} />
                    ) : (
                      <PlayCircleOutlinedIcon sx={{ color: "#C1986C" }} />
                    )}
                  </Button>
                  <Button onClick={handleStop}>
                    <StopCircleOutlinedIcon sx={{ color: "#C1986C" }} />
                  </Button>
                  <Button onClick={handleSend}>
                    <SendIcon sx={{ color: "#C1986C" }} />
                  </Button>
                </>
              )}
            </ButtonGroup>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Le lorem ipsum est, en imprimerie, une suite de mots sans
              signification utilisée à titre provisoire pour calibrer une mise
              en page, le texte définitif venant remplacer le faux-texte dès
              qu'il est prêt ou que la mise en page est achevée. Généralement,
              on utilise un texte en faux latin, le Lorem ipsum ou Lipsum.
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default VideoQuestion;
