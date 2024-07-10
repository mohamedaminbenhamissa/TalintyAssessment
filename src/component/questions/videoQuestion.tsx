import { useRef, useState } from "react";
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

type QuestionProps = {
  question: {
    name: string;
    description: string;
    answers: string[];
  };
};

const VideoQuestion: React.FC<QuestionProps> = ({ question }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, _setSnackbarMessage] = useState("");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleStop = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
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
              component="video"
              sx={{
                width: "100%",
                height: { xs: "200px", sm: "300px" },
                borderRadius: "10px",
                p: 2,
              }}
              controls
            >
              <video ref={videoRef} width="100%" height="100%" controls></video>
            </Box>
            <ButtonGroup sx={{ borderColor: "#C1986C", mt: 2 }}>
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
              <Button>
                <SendIcon sx={{ color: "#C1986C" }} />
              </Button>
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
        <Alert onClose={handleSnackbarClose} severity="warning">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default VideoQuestion;
