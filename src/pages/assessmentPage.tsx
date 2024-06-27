import React, { useState, useEffect } from "react";
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

import { LangSelect } from "../component/languageSwitcher";
import { useTranslation } from "../hooks/useTranslation";
import IN_PROGRESS from "@/component/questions/chorttextQuestion";
import assessmentData from "../../assessment.json";

const Break = () => <div>Break</div>;

const StepsPage: React.FC = () => {
  const [jobName, setJobName] = useState("");
  const [testName, setTestkName] = useState("");
  const [estimatedTime, setEstimatedTime] = useState(0);
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  const [state, send] = useMachine(stepsMachine);
  const [name, setName] = useState("");
  const { t, i18n } = useTranslation("button");
  console.log(i18n.language);
  useEffect(() => {
    document.dir = i18n.language === "ar" ? "rtl" : "ltr";

    const fetchAssessmentData = async () => {
      // If the JSON is imported directly:
      const data = assessmentData;

      setJobName(data.jobName);
      setTestkName(data.packs[0]?.name ?? "");
      setEstimatedTime(data.estimatedTime);
      setNumberOfQuestions(data.numberOfQuestions);
    };
    fetchAssessmentData();
  }, [i18n.language]);

  useEffect(() => {
    const handleFullScreen = () => {
      if (document.fullscreenElement) {
        console.log("Entered full-screen mode");
      } else {
        console.log("Exited full-screen mode");
      }
    };

    document.addEventListener("fullscreenchange", handleFullScreen);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreen);
    };
  }, []);

  const handleStartClick = () => {
    const docElm = document.documentElement;
    if (docElm.requestFullscreen) {
      docElm.requestFullscreen();
    } else if (docElm.requestFullscreen) {
      docElm.requestFullscreen();
    } else if (docElm.requestFullscreen) {
      docElm.requestFullscreen();
    } else if (docElm.requestFullscreen) {
      docElm.requestFullscreen();
    }
    send({ type: "next" });
  };

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
        return <IN_PROGRESS />;
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
    if (state.value === "START") {
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
            {testName}
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Chip
              icon={<AccessAlarmOutlinedIcon />}
              label={`Duration: ${estimatedTime / 60} mins`}
              sx={{ backgroundColor: "#fff", color: "#023651" }}
            />
            <Chip
              label={`N° questions: ${numberOfQuestions}`}
              sx={{ backgroundColor: "#fff", color: "#023651" }}
            />
          </Box>
        </Box>
      );
    }

    let title;
    switch (state.value) {
      case "CONFIG_WEBCAM":
        title = t("Configuration");
        break;
      case "FEEDBACK":
        title = t("feedback");
        break;
      case "CONSENT":
        title = t("consent");
        break;
      case "EXTRA_TIME":
        title = t("extratime");
        break;
      case "RESULTS":
        title = t("result");
        break;
      case "IN_PROGRESS":
        title = "IN PROGRESS";
        break;
      default:
        title = t("init");
    }

    return (
      <Typography
        sx={{
          fontSize: 28,
          display: "flex",
          flexDirection: "column",
          fontWeight: "bold",
          color: "#fff",
          alignItems: i18n.language === "ar" ? "flex-end" : "flex-start",
        }}
      >
        {title}
        <Box
          sx={{
            display: "flex",
            justifyContent: i18n.language === "ar" ? "flex-end" : "flex-start",
            width: "20%",
            height: "1px",
            background: "linear-gradient(to right,#000, #fff, #000)",
            marginTop: "4px",
            marginLeft: 2,
            marginRight: i18n.language === "ar" ? 2 : 0,
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
          justifyContent: "space-between",
          alignItems: "center",
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
              display: "flex",
              alignItems: "center",
              flexDirection: { xs: "column", sm: "row" },
              padding: { xs: 1, sm: 2 },
            }}
          >
            <Box
              sx={{
                width: { xs: "100%", sm: "1px" },
                height: { xs: "1px", sm: "50px" },
                backgroundColor: "#000",
                margin: { xs: "8px 0", sm: 2 },
              }}
            />
            <Typography
              sx={{
                color: "#023651",
                padding: { xs: 1, sm: 2 },
                textAlign: { xs: "center", sm: "left" },
              }}
            >
              Evaluation {jobName}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ p: 4 }}>
          <LangSelect />
        </Box>
      </Box>
      <Card sx={{ marginTop: "30px" }}>
        {state.value !== "LOCKED" && (
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
            dir="ltr"
          >
            <Button
              sx={{
                background: "#fff",
                color: "#023651",
                px: 6,
                py: 1,
                display:
                  state.value === "RESULTS" ||
                  state.value === "INIT" ||
                  state.value === "LOCKED" ||
                  state.value === "START" ||
                  state.value == "IN_PROGRESS"
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
              {t("btnPrivious")}
            </Button>
            <Button
              sx={{
                background:
                  state.value === "CONSENT" && name === ""
                    ? "#E8E8F0"
                    : "#023651",

                color: "#fff",
                px: 6,
                py: 1,
                borderRadius: "10px",
                display:
                  state.value === "BREAK" || state.value === "LOCKED"
                    ? "none"
                    : "inline-block",
                ":hover": {
                  background: "#023651",
                  color: "#fff",
                },
              }}
              size="small"
              disabled={state.value === "CONSENT" && name === ""}
              onClick={
                state.value === "START"
                  ? handleStartClick
                  : () => send({ type: "next" })
              }
            >
              {state.value === "START" ? t("btnstart") : t("btnNext")}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default StepsPage;
