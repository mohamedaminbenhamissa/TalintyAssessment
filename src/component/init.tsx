import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useTranslation } from "@/hooks/useTranslation";
import { useEffect, useState } from "react";

// Assuming the assessment.json file is in the public directory or can be fetched from an API endpoint
import assessmentData from "../../assessment.json";

export default function Init() {
  const { t, i18n } = useTranslation("init");
  const [firstName, setFirstName] = useState("");
  const [estimatedTime, setEstimatedTime] = useState(0);
  const [isintroVideo, setIntroVideo] = useState("");
  const [webcamScreenshots, setWebcamScreenshots] = useState(false);
  const [numberOfVideoQuestions, setNumberOfVideoQuestions] = useState(0);
  const [jobName, setJobName] = useState("");
  useEffect(() => {
    console.log(i18n.language);
    document.dir = i18n.language === "ar" ? "rtl" : "ltr";

    const fetchAssessmentData = async () => {
      // If the JSON is imported directly:
      const data = assessmentData;

      setFirstName(data.firstName);
      setEstimatedTime(data.estimatedTime);
      setIntroVideo(data.introVideo);
      setWebcamScreenshots(data.webcamScreenshots);
      setNumberOfVideoQuestions(data.numberOfVideoQuestions);
      setJobName(data.jobName);
    };

    fetchAssessmentData();
  }, [i18n.language]);
  const minTime = Math.ceil(estimatedTime / 60 / 2);
  const maxTime = Math.ceil(estimatedTime / 60);

  return (
    <Card
      sx={{
        display: "flex",
        boxShadow: 0,
        flexDirection: "column",
        minWidth: { xs: "100%", sm: 400, md: 500 },
        minHeight: 500,
        margin: "auto",
      }}
    >
      <CardContent sx={{ flex: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={5} tabIndex={0}>
            <Box sx={{ width: "90%", mt: 1, mx: "auto" }}>
              <Typography
                sx={{
                  fontSize: { xs: 14, sm: 16 },
                  textAlign: "justify",
                  width: "100%",
                }}
                tabIndex={0}
                aria-label={t("dear")}
              >
                <b>
                  {" "}
                  <i>{t("dear")}</i>
                </b>
                <Typography
                  sx={{
                    color: "#C1976B",
                    mt: 1,
                    textAlign: "center",
                  }}
                  tabIndex={0}
                  aria-label={firstName}
                >
                  {firstName}
                </Typography>
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: 14, sm: 16 },
                  textAlign: "justify",
                  width: "100%",
                  mt: 1,
                }}
                tabIndex={0}
                aria-label={t("welcome")}
              >
                We are excited to welcome you to the next stage of our selection
                process for <b>{jobName}</b>. Your qualifications have impressed
                us, and we are eager to see your skills in action through this
                assessment. This assessment is designed to give us a deeper
                understanding of your abilities and how you might fit within our
                team. We encourage you to approach it with confidence and
                showcase your best work.
              </Typography>
              {isintroVideo !== "" && (
                <Box sx={{ width: "100%", mt: 2 }} tabIndex={0}>
                  <video width="100%" controls>
                    <source src="your-video-url.mp4" type="video/mp4" />
                  </video>
                </Box>
              )}
            </Box>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item xs={12} sm={6} tabIndex={0}>
            <Box sx={{ width: "90%", mt: 1, mx: "auto" }}>
              <Typography
                sx={{
                  fontSize: { xs: 14, sm: 16 },
                  textAlign: "justify",
                  width: "100%",
                }}
                tabIndex={0}
                aria-label={t("beforestarting")}
              >
                {t("beforestarting")}
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: 14, sm: 16 },
                  textAlign: "justify",
                  width: "100%",
                  mt: 1,
                }}
                tabIndex={0}
              >
                Your test will take approximately between <b>{minTime}</b> and{" "}
                <b>{maxTime} minutes</b> to complete.
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: 14, sm: 16 },
                  textAlign: "justify",
                  width: "100%",
                  mt: 2,
                  color: "#C1976B",
                }}
                tabIndex={0}
                aria-label={t("important")}
              >
                {t("important")}
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: 14, sm: 16 },
                  textAlign: "justify",
                  width: "100%",
                  mt: 1,
                }}
                tabIndex={0}
              >
                1.<b> Stable Internet Connection:</b> Make sure you have a
                stable internet connection to avoid any disruptions.
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: 14, sm: 16 },
                  textAlign: "justify",
                  width: "100%",
                  mt: 1,
                }}
                tabIndex={0}
              >
                2. <b>Stay Within the Test Browser:</b> Do not navigate away
                from the test browser or open any other tabs/windows during the
                assessment. Doing so will result in an automatic ban from the
                test.
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: 14, sm: 16 },
                  textAlign: "justify",
                  width: "100%",
                  mt: 1,
                }}
                tabIndex={0}
              >
                3. <b>Quiet Environment:</b> Find a quiet and comfortable place
                where you can focus without interruptions.
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: 14, sm: 16 },
                  textAlign: "justify",
                  width: "100%",
                  mt: 1,
                }}
                tabIndex={0}
              >
                4. <b> You are free to use a calculator, pen and paper.</b>
              </Typography>
              {!(webcamScreenshots === false || numberOfVideoQuestions < 1) && (
                <Typography
                  sx={{
                    fontSize: { xs: 14, sm: 16 },
                    textAlign: "justify",
                    width: "100%",
                    mt: 1,
                  }}
                  tabIndex={0}
                >
                  5. <b>Activate Your Camera and Microphone:</b> Ensure your
                  camera and microphone are enabled, as we may need to verify
                  your identity and monitor the test.
                </Typography>
              )}
              <Typography
                sx={{
                  fontSize: { xs: 14, sm: 16 },
                  textAlign: "justify",
                  width: "100%",
                  mt: 2,
                }}
                tabIndex={0}
              >
                <i>
                  We wish you the best of luck and look forward to seeing your
                  results!
                </i>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
