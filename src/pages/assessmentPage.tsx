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

import axios from "axios";
import Cover from "../assets/cover.png";
import FEEDBACK from "../component/feedback";
import CONGRATS from "../component/congratulations";
import START from "../component/start";
import RESULT from "../component/result";
import { LangSelect } from "../component/languageSwitcher";
import { useTranslation } from "../hooks/useTranslation";
import IN_PROGRESS from "@/component/inProgress";

import CheatingPopup from "@/component/popupalet/cheatingPopup";
import EVALEXPIRED from "@/component/expired";
import TIMEOUT from "@/component/timeout";
import ReportPopup from "@/component/report";

// type Question = {
//   type: string;
//   isTrainingQuestion: boolean;
//   currentQuestionCount: number;
//   name: string;
//   description: string;
//   answers: string[];
//   numberOfQuestions: number;
// };

const API_URL =
  "http://localhost:5002/api/v1/evaluation/evaluation/6bb17186-0439-479e-a45b-f0cce9ed9b65";
const LOCKED_API_URL = `http://localhost:5002/api/v1/evaluation/6bb17186-0439-479e-a45b-f0cce9ed9b65/lockEvaluationFromCandidate/`;

const Break = () => <div>Break</div>;

const StepsPage: React.FC = () => {
  const { t, i18n } = useTranslation("button");
  const [state, send] = useMachine(stepsMachine);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [_cheatingPopupCount, setCheatingPopupCount] = useState(0);
  const ToCaptureRef = useRef(null);
  const [_screenshotCount, _setScreenshotCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [currentPackIndex, setCurrentPackIndex] = useState<number>(0);
  const [assessment, setAssessment] = useState<StepsContext>({
    currentStep: 1,
    jobName: "",
    testName: "",
    packId: "",
    estimatedTime: 0,
    numberTotalOfQuestions: 0,
    firstName: "",
    jobImage: "",
    webcamScreenshots: false,
    numberOfVideoQuestions: 0,
    enableExtraTime: false,
    introVideo: "",
    enableFeedBack: false,
    outroVideo: "",
    testDescription: "",
    evaluationStaus: "",
    numberOfQuestionsInCurrentPack: 0,
    allowedTime: 0,
    packs:[""]
  });

  const [packIndex, setPackIndex] = useState(0);
  const selectedValue = localStorage.getItem("selectedValue");
  const fetchAssessmentData = async () => {
    try {
      const response = await axios.get(API_URL);
      const data = response.data;
      const packs = data?.finalEvaluation?.packs || [];
      const currentPack = packs[packIndex];

      setAssessment({
        currentStep: 1,
        jobName: data?.finalEvaluation?.jobName || null,
        packId: currentPack?.id || null,
        packs: data?.finalEvaluation?.packs || null,
        testName: currentPack?.name || null,
        numberOfQuestionsInCurrentPack:data?.finalEvaluation?.numberOfQuestionsInCurrentPack || null,
        allowedTime: currentPack?.allowedTime || null,
        testDescription: currentPack?.description || null,
        estimatedTime: data?.finalEvaluation?.estimatedTime || null,
        numberTotalOfQuestions:
          data?.finalEvaluation?.numberTotalOfQuestions || null,
        firstName: data?.finalEvaluation?.firstName || null,
        jobImage: data?.finalEvaluation?.jobImage || null,
        webcamScreenshots: data?.finalEvaluation?.webcamScreenshots || null,
        numberOfVideoQuestions:
          data?.finalEvaluation?.numberOfVideoQuestions || null,
        enableExtraTime: data?.finalEvaluation?.enableExtraTime || null,
        introVideo: data?.finalEvaluation?.introVideo || null,
        enableFeedBack: data?.finalEvaluation?.enableFeedback || null,
        outroVideo: data?.finalEvaluation?.outroVideo || null,
        evaluationStaus: data?.evaluationStaus || null,
        
      });
      
     
    setPackIndex(packIndex + 1);
     console.log("*-*",packs)
     
    } catch (error) {
      console.error("Error fetching assessment data:", error);
    }
  };
  useEffect(() => {
    document.dir = i18n.language === "ar" ? "rtl" : "ltr";
    fetchAssessmentData();
  }, []);

  useEffect(() => {
    send({ type: "updateContext", context: assessment });
  }, [assessment, send]);
  const sendFeedback = async () => {
    const feedbackData = {
      feedback: {
        comment: "test",
        rating: 5,
      },
    };

    try {
      const response = await axios.patch(
        "http://localhost:5002/api/v1/evaluation/6bb17186-0439-479e-a45b-f0cce9ed9b65/feedback/",
        feedbackData
      );
      console.log("Feedback sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending feedback:", error);
    }

  };


  // *-*-*-*-*-*-*-*-*-*-*-* cheaing *-*-*-*-*-*-*-*-*-*-**--*-*-*

  // useEffect(() => {
  //   const handleFullScreen = () => {
  //     if (document.fullscreenElement) {
  //       console.log("Entered full-screen mode");
  //     } else {
  //       console.log("Exited full-screen mode");
  //       if (state.value === "IN_PROGRESS") {
  //         setPopupOpen(true);
  //         setCheatingPopupCount((prevCount) => {
  //           const newCount = prevCount + 1;
  //           if (newCount > 2) {
  //             send({ type: "evalExpired" });
  //             lockEvaluation("Fullscreen exited more than twice");
  //           }
  //           return newCount;
  //         });
  //       }
  //     }
  //   };

  //   const handleKeyDown = (event: KeyboardEvent) => {
  //     if (event.key === "Escape" && state.value === "IN_PROGRESS") {
  //       setPopupOpen(true);
  //       setCheatingPopupCount((prevCount) => {
  //         const newCount = prevCount + 1;
  //         if (newCount > 2) {
  //           send({ type: "evalExpired" });
  //           lockEvaluation("Escape key pressed more than twice");
  //         }
  //         return newCount;
  //       });
  //     }
  //   };

  //   const handleBlur = () => {
  //     if (state.value === "IN_PROGRESS") {
  //       setPopupOpen(true);
  //       setCheatingPopupCount((prevCount) => {
  //         const newCount = prevCount + 1;
  //         if (newCount > 2) {
  //           send({ type: "evalExpired" });
  //           lockEvaluation("Window lost focus more than twice");
  //         }
  //         return newCount;
  //       });
  //     }
  //   };
  //   if (state.value === "IN_PROGRESS") {
  //     const docElm = document.documentElement;
  //     if (docElm.requestFullscreen) {
  //       docElm.requestFullscreen();
  //     }
  //   } else if (state.value === "FEEDBACK" || state.value === "RESULTS") {
  //     if (document.fullscreenElement) {
  //       document.exitFullscreen();
  //     }
  //   }

  //   document.addEventListener("fullscreenchange", handleFullScreen);
  //   document.addEventListener("keydown", handleKeyDown);
  //   window.addEventListener("blur", handleBlur);

  //   return () => {
  //     document.removeEventListener("fullscreenchange", handleFullScreen);
  //     document.removeEventListener("keydown", handleKeyDown);
  //     window.removeEventListener("blur", handleBlur);
  //   };
  // }, [state.value, send]);

  const handleStartClick = () => {
  
      send({ type: "next" });
    
  };


  // const captureScreenshot = () => {
  //   // Ensure ToCaptureRef.current is not null and assert its type to HTMLElement
  //   if (ToCaptureRef.current !== null) {
  //     html2canvas(ToCaptureRef.current as HTMLElement).then((canvas) => {
  //       const image = canvas.toDataURL("image/png");
  //       const link = document.createElement("a");
  //       link.download = "screenshot.png";
  //       link.href = image;
  //       link.click();
  //       setScreenshotCount((prevCount) => prevCount + 1); // Increment screenshot count
  //     });
  //   }
  // };

  // useEffect(() => {
  //   const totalTime = assessment.estimatedTime * 1000; // Convert to milliseconds
  //   let numberOfScreenshots;

  //   if (totalTime < 10 * 60 * 1000) {
  //     numberOfScreenshots = 3;
  //   } else if (totalTime < 20 * 60 * 1000) {
  //     numberOfScreenshots = 6;
  //   } else {
  //     numberOfScreenshots = 9;
  //   }

  //   // Generate random intervals
  //   const intervals = new Set<number>();
  //   while (intervals.size < numberOfScreenshots - 1) {
  //     //  the first screenshot is at 1 minute
  //     intervals.add(
  //       Math.floor(Math.random() * (totalTime - 1 * 60 * 1000)) + 1 * 60 * 1000
  //     );
  //   }

  //   const sortedIntervals = [
  //     1 * 60 * 1000,
  //     ...Array.from(intervals).sort((a, b) => a - b),
  //   ];

  //   sortedIntervals.forEach((interval, _index) => {
  //     setTimeout(() => {
  //       if (state.value === "IN_PROGRESS") {
  //         captureScreenshot();
  //       }
  //     }, interval);
  //   });
  // }, [assessment.estimatedTime, state.value]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const lockEvaluation = async (reason: string) => {
    try {
      await axios.patch(LOCKED_API_URL, {
        reason,
        isUnlockOperation: true,
      });
      console.log("Evaluation locked successfully");
    } catch (error) {
      console.error("Error locking evaluation:", error);
    }
  };
  //------------------ inPROGRESS ------------------
  
  // const fetchData =   async (currentPackIndex: number) => {
  //   if (!assessment || currentPackIndex >= assessment.packs.length) {
  //     console.log("No more packs to process or assessmentData is missing");
  //     return;
  //   }
  //   const currentPack = assessment.packs[currentPackIndex];
  //   console.log("current pack", currentPackIndex);
  //   const API_BASE_URL = `http://localhost:5002/api/v1/evaluation/6bb17186-0439-479e-a45b-f0cce9ed9b65/start/${currentPack.id}`;
  //   console.log("-*-*-*-*-**-*-*-* id",currentPack.id)
  //   try {
  //     const response = await axios.patch(API_BASE_URL, {
  //       hasHandicap: selectedValue,
  //     });

  //     const data = response.data;

  //     setQuestion({
  //       numberOfQuestions: data?.numberOfQuestions || 0,
  //       currentQuestionCount: data?.currentQuestionCount || 0,
  //       type: data?.nextQuestion?.type || "",
  //       isTrainingQuestion: data?.nextQuestion?.isTrainingQuestion || false,
  //       name: data?.nextQuestion?.name || "",
  //       description: data?.nextQuestion?.description || "",
  //       answers: data?.nextQuestion?.answers || [],
  //     });
     
  //   } catch (error) {
  //     console.error("Error loading data:", error);
  //   }
  // };
  // useEffect(() => {
  //   console.log("useeffect",currentPackIndex)
  //   fetchData(currentPackIndex);
  //   if(currentPackIndex === 0) {}
  // }, [currentPackIndex]);



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
        return <START assessmentData={assessment} />;
      case "IN_PROGRESS":
        return <IN_PROGRESS assessmentData={assessment}   send = {send} currentPackIndex={currentPackIndex} setCurrentPackIndex={setCurrentPackIndex}   />;
      case "FEEDBACK":
        return <FEEDBACK send={send} sendFeedback={sendFeedback} />;
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
            {assessment.packs[packIndex].name}
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Chip
              icon={<AccessAlarmOutlinedIcon />}
              label={`${t("Duration:")} ${assessment.packs[packIndex].allowedTime / 60} ${t(
                "minutes"
              )}`}
              sx={{ backgroundColor: "#fff", color: "#023651" }}
            />
            <Chip
              label={`${t("nquest")} ${assessment.numberOfQuestionsInCurrentPack}`}
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
        styles={{
          body: { backgroundColor: "#F8F9FA", color: "white" },
        }}
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
        <Typography
          sx={{ color: "#023651", marginRight: 2, cursor: "pointer", p: 1 }}
          onClick={handleOpen}
        >
          {t("report")}
        </Typography>
        <ReportPopup open={open} onClose={handleClose} />
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
            src={assessment.jobImage}
            width={100}
            height={100}
            style={{ objectFit: "contain" }}
            alt="Job"
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
              {t("evalfor")} {assessment.jobName}
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
        <CardContent ref={ToCaptureRef} sx={{ minWidth: "60vw" }}>
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
                state.value === "FEEDBACK"
                  ? () => {sendFeedback() 
                   send({ type: "next" })}
                  : state.value === "START"
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
