import { useRef } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, ButtonGroup } from "@mui/material";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";
import StopCircleOutlinedIcon from "@mui/icons-material/StopCircleOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";

const videoQuestion = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

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
              textAlign: "start",
              width: "100%",
              mt: 3,
              mb: 1,
            }}
          >
            Lorem ipsum dolor sit amet consectetur. Ullamcorper sed molestie
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            mt: 3,
          }}
        >
          <Box
            component="video"
            sx={{
              maxWidth: "600px",
              height: { xs: "200px", sm: "300px" },
              borderRadius: "10px",
            }}
            controls
          >
            <video ref={videoRef} width="400" height="300" controls></video>
          </Box>
          <ButtonGroup sx={{ borderColor: "#C1986C" }}>
            <Button>
              <PlayCircleOutlinedIcon sx={{ color: "#C1986C" }} />
            </Button>
            <Button>
              <StopCircleOutlinedIcon sx={{ color: "#C1986C" }} />
            </Button>
            <Button>
              <ReplayOutlinedIcon sx={{ color: "#C1986C" }} />
            </Button>
          </ButtonGroup>
        </Box>
      </CardContent>
    </Card>
  );
};

export default videoQuestion;
