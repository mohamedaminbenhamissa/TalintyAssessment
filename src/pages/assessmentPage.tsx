import React, { useState } from "react";
import { useMachine } from "@xstate/react";
import { stepsMachine } from "./Evaluation/stepsMachine";
import Init from "../component/init";
import CONFIG_WEBCAM from "../component/configuration";
import EXTRA_TIME from "../component/extraTime";
import CONSENT from "../component/consent";
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  GlobalStyles,
  Typography,
} from "@mui/material";
import Cover from "../assets/cover.png";
import FEEDBACK from "../component/feedback";
import CONGRATS from "../component/congratulations";
import START from "../component/start";
import RESULT from "../component/result";

const InProgress = () => <div>In Progress</div>;
const Break = () => <div>Break</div>;

const StepsPage: React.FC = () => {
  const [state, send] = useMachine(stepsMachine);
  const [name, setName] = useState("");
  const renderStep = () => {
    switch (state.value) {
      case "INIT":
        return <Init />;
      case "EXTRA_TIME":
        return <EXTRA_TIME />;
      case "CONFIG_WEBCAM":
        return <CONFIG_WEBCAM />;
      case "CONSENT":
        return <CONSENT name={name} setName={setName} />;
      case "START":
        return <START />;
      case "IN_PROGRESS":
        return <InProgress />;
      case "FEEDBACK":
        return <FEEDBACK />;
      case "RESULTS":
        return <RESULT />;
      case "LOCKED":
        return <CONGRATS />;
      case "BREAK":
        return <Break />;
      default:
        return null;
    }
  };

  const renderHeaderContent = () => {
    if (state.matches("START")) {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "end",
          }}
        >
          <Typography
            sx={{
              fontSize: 25,
              fontWeight: 500,
              color: "#fff",
            }}
          >
            Lorem ipsum dolor sit amet consectetur.
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Chip
              icon={<AccessAlarmOutlinedIcon />}
              label="Duration: 30 mins"
              sx={{ backgroundColor: "#fff", color: "#023651" }}
            />
            <Chip
              label="N° questions: 10"
              sx={{ backgroundColor: "#fff", color: "#023651" }}
            />
          </Box>
        </Box>
      );
    }

    let title;
    switch (state.value) {
      case "CONFIG_WEBCAM":
        title = "Configuration";
        break;
      case "FEEDBACK":
        title = "How’s it Going ?";
        break;
      case "CONSENT":
        title = "Trust commitment";
        break;
      case "EXTRA_TIME":
        title = "Extra Time";
        break;
      case "RESULTS":
        title = "Performence report";
        break;
      default:
        title = "Recruitment process";
    }

    return (
      <Typography
        sx={{
          fontSize: 28,
          display: "flex",
          flexDirection: "column",
          fontWeight: "bold",
          color: "#fff",
        }}
      >
        {title}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            width: "20%",
            height: "1px",
            background: "linear-gradient(to right,#000, #fff, #000)",
            marginTop: "4px",
            marginLeft: 2,
          }}
        />
      </Typography>
    );
  };

  return (
    <>
      <GlobalStyles
        styles={{ body: { backgroundColor: "#F8F9FA", color: "white" } }}
      />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          height: "40px",
          position: "fixed",
          bottom: 0,
          left: 0,
          backgroundColor: "white",
          borderTop: "1px solid #ccc",
          zIndex: 10,
        }}
      >
        <Typography sx={{ color: "#023651", marginRight: 2 }}>
          Report Issue
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100vw",
          display: "flex",
          height: 70,
          marginBottom: 2,
          position: "fixed",
          top: 0,
          left: 0,
          backgroundColor: "white",
          zIndex: 10,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", px: 2 }}>
          <img
            src="https://astrolab.co/wp-content/uploads/2023/10/astrolab-1.svg"
            width={100}
            height={100}
            style={{ objectFit: "contain" }}
          />
          <Box
            sx={{
              width: "1px",
              height: "50px",
              backgroundColor: "#000",
              marginLeft: 2,
            }}
          />
          <Typography sx={{ color: "#023651", padding: 2 }}>
            Evaluation for UX/UI Designer position
          </Typography>
        </Box>
      </Box>
      <Card sx={{ marginTop: "30px" }}>
        {!state.matches("LOCKED") && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              backgroundImage: `url(${Cover})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              zIndex: 1,
              width: "100%",
              height: "130px",
            }}
          >
            <Box
              sx={{
                flex: 1,
                textAlign: "left",
                padding: 3,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              {renderHeaderContent()}
            </Box>
          </Box>
        )}
        <CardContent>
          {renderStep()}

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "6px",
              zIndex: 1,
              width: "100%",
            }}
          >
            <Button
              sx={{
                background: "#fff",
                color: "#023651",
                px: 6,
                py: 1,
                display:
                  state.matches("RESULTS") ||
                  state.matches("INIT") ||
                  state.matches("LOCKED") ||
                  state.matches("START")
                    ? "none"
                    : "inline-block",

                ":hover": {
                  background: "#fff",
                  color: "#023651",
                },
              }}
              onClick={() => send({ type: "previous" })}
              size="small"
              style={{ borderRadius: "10px" }}
            >
              Previous
            </Button>
            <Button
              sx={{
                background: "#023651",
                color: "#fff",
                px: 6,
                py: 1,
                borderRadius: "10px",
                display:
                  state.matches("BREAK") || state.matches("LOCKED")
                    ? "none"
                    : "inline-block",
                ":hover": {
                  background: "#023651",
                  color: "#fff",
                },
              }}
              size="small"
              disabled={state.value === "CONSENT" && name === ""}
              onClick={() => send({ type: "next" })}
            >
              {state.matches("START") ? "Get Started" : "Next"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default StepsPage;
