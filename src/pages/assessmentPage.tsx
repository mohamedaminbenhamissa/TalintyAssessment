import React, { useState, useEffect, useRef } from "react";
import { useMachine } from "@xstate/react";
import { stepsMachine, StepsContext } from "./Evaluation/stepsMachine";
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
import IN_PROGRESS from "@/component/inProgress";
import assessmentData from "../../assessment.json";
import CheatingPopup from "@/component/popupalet/cheatingPopup";
import EVALEXPIRED from "@/component/expired";
import TIMEOUT from "@/component/timeout";
import html2canvas from "html2canvas";
const Break = () => <div>Break</div>;

const StepsPage: React.FC = () => {
  const { t, i18n } = useTranslation("button");
  const [state, send] = useMachine(stepsMachine);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [_cheatingPopupCount, setCheatingPopupCount] = useState(0);
  const ToCaptureRef = useRef(null);
  const [_screenshotCount, setScreenshotCount] = useState(0);
  const [assessment, setAssessment] = useState<StepsContext>({
    currentStep: 1,
    jobName: "",
    testName: "",
    estimatedTime: 0,
    numberOfQuestions: 0,
    firstName: "",
    webcamScreenshots: false,
    numberOfVideoQuestions: 0,
    enableExtraTime: false,
    introVideo: "",
    enableFeedBack: false,
    outroVideo: "",
  });

  useEffect(() => {
    document.dir = i18n.language === "ar" ? "rtl" : "ltr";

    const fetchAssessmentData = async () => {
      const data = assessmentData;

      setAssessment({
        currentStep: 1,
        jobName: data.jobName,
        testName: data.packs[0]?.name ?? "",
        estimatedTime: data.estimatedTime,
        numberOfQuestions: data.numberOfQuestions,
        firstName: "",
        webcamScreenshots: data.webcamScreenshots,
        numberOfVideoQuestions: data.numberOfVideoQuestions,
        enableExtraTime: data.enableExtraTime,
        introVideo: data.introVideo,
        enableFeedBack: data.enableFeedback,
        outroVideo: data.outroVideo,
      });
    };

    fetchAssessmentData();
  }, []);

  useEffect(() => {
    send({ type: "updateContext", context: assessment });
  }, [assessment, send]);

  useEffect(() => {
    const handleFullScreen = () => {
      if (document.fullscreenElement) {
        console.log("Entered full-screen mode");
      } else {
        console.log("Exited full-screen mode");
        if (state.value === "IN_PROGRESS") {
          setPopupOpen(true);
          setCheatingPopupCount((prevCount) => {
            const newCount = prevCount + 1;
            if (newCount > 2) {
              send({ type: "evalExpired" });
            }
            return newCount;
          });
        }
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && state.value === "IN_PROGRESS") {
        setPopupOpen(true);
        setCheatingPopupCount((prevCount) => {
          const newCount = prevCount + 1;
          if (newCount > 2) {
            send({ type: "evalExpired" });
          }
          return newCount;
        });
      }
    };

    const handleBlur = () => {
      if (state.value === "IN_PROGRESS") {
        setPopupOpen(true);
        setCheatingPopupCount((prevCount) => {
          const newCount = prevCount + 1;
          if (newCount > 2) {
            send({ type: "evalExpired" });
          }
          return newCount;
        });
      }
    };

    document.addEventListener("fullscreenchange", handleFullScreen);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("blur", handleBlur);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreen);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("blur", handleBlur);
    };
  }, [state.value, send]);

  useEffect(() => {
    if (state.value === "IN_PROGRESS") {
      const docElm = document.documentElement;
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      }
    } else if (state.value === "FEEDBACK" || state.value === "RESULTS") {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    }
  }, [state.value]);

  const handleStartClick = () => {
    send({ type: "next" });
  };

  const captureScreenshot = () => {
    // Ensure ToCaptureRef.current is not null and assert its type to HTMLElement
    if (ToCaptureRef.current !== null) {
      html2canvas(ToCaptureRef.current as HTMLElement).then((canvas) => {
        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.download = "screenshot.png";
        link.href = image;
        link.click();
        setScreenshotCount((prevCount) => prevCount + 1); // Increment screenshot count
      });
    }
  };

  useEffect(() => {
    const totalTime = assessment.estimatedTime * 1000; // Convert to milliseconds
    let numberOfScreenshots;

    if (totalTime < 10 * 60 * 1000) {
      numberOfScreenshots = 3;
    } else if (totalTime < 20 * 60 * 1000) {
      numberOfScreenshots = 6;
    } else {
      numberOfScreenshots = 9;
    }

    // Generate random intervals
    const intervals = new Set<number>();
    while (intervals.size < numberOfScreenshots - 1) {
      //  the first screenshot is at 1 minute
      intervals.add(
        Math.floor(Math.random() * (totalTime - 1 * 60 * 1000)) + 1 * 60 * 1000
      );
    }

    const sortedIntervals = [
      1 * 60 * 1000,
      ...Array.from(intervals).sort((a, b) => a - b),
    ];

    sortedIntervals.forEach((interval, _index) => {
      setTimeout(() => {
        if (state.value === "IN_PROGRESS") {
          captureScreenshot();
        }
      }, interval);
    });
  }, [assessment.estimatedTime, state.value]);
  const renderStep = () => {
    switch (state.value) {
      case "INIT":
        return <Init assessmentData={assessment} />;
      case "EXTRA_TIME":
        return <EXTRA_TIME />;
      case "CONFIG_WEBCAM":
        return <CONFIG_WEBCAM />;
      case "CONSENT":
        return (
          <CONSENT
            name={assessment.firstName}
            setName={(name) =>
              setAssessment((prev: StepsContext) => ({
                ...prev,
                firstName: name,
              }))
            }
          />
        );

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
      case "EVALEXPIRED":
        return <EVALEXPIRED />;
      case "TIMEOUT":
        return <TIMEOUT />;
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
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "start", sm: "end" },
            gap: { xs: 2, sm: 0 },
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: 20, sm: 25 },
              fontWeight: 500,
              color: "#fff",
            }}
          >
            {assessment.testName}
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Chip
              icon={<AccessAlarmOutlinedIcon />}
              label={`Duration: ${assessment.estimatedTime / 60} mins`}
              sx={{ backgroundColor: "#fff", color: "#023651" }}
            />
            <Chip
              label={`N° questions: ${assessment.numberOfQuestions}`}
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
              flexDirection: { xs: "row", sm: "row" },
              padding: { xs: 2, sm: 2 },
            }}
          >
            <Box
              sx={{
                width: { xs: "1%", sm: "1px" },
                height: { xs: "50px", sm: "50px" },
                backgroundColor: "#000",
                margin: { xs: 2, sm: 2 },
              }}
            />
            <Typography
              sx={{
                color: "#023651",
                padding: { xs: 1, sm: 2 },
                textAlign: { xs: "center", sm: "left" },
                fontSize: { xs: 12, sm: 20 },
              }}
            >
              Evaluation {assessment.jobName}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ p: 4 }}>
          <LangSelect />
        </Box>
      </Box>
      <Card sx={{ marginTop: "20px" }}>
        {state.value !== "LOCKED" && (
          <Box
            sx={{
              display: "flex",
              backgroundImage: `url(${Cover})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              zIndex: 1,
              width: "100%",
              height: "140px",
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
        <CardContent ref={ToCaptureRef}>
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
                  state.value === "FEEDBACK" ||
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
                  state.value === "CONSENT" && assessment.firstName === ""
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
              disabled={
                state.value === "CONSENT" && assessment.firstName === ""
              }
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
      <CheatingPopup open={isPopupOpen} onClose={() => setPopupOpen(false)} />
    </>
  );
};

export default StepsPage;
