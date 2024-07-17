import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useTranslation } from "@/hooks/useTranslation";

import { useEffect } from "react";

interface AssessmentData {
  firstName: string;
  jobName: string;
  introVideo: string;
  estimatedTime: number;
  webcamScreenshots: boolean;
  numberOfVideoQuestions: number;
  enableExtraTime: boolean;
}

export default function Init({
  assessmentData,
}: {
  assessmentData: AssessmentData;
}) {
  const { t, i18n } = useTranslation("init");

  useEffect(() => {
    document.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  const minTime = Math.ceil(assessmentData.estimatedTime / 60 / 2);
  const maxTime = Math.ceil(assessmentData.estimatedTime / 60);

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
                  aria-label={assessmentData.firstName}
                >
                  {assessmentData.firstName}
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
                {t("text1")} <b>{assessmentData.jobName}</b>.
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
                {t("text2")}
              </Typography>
              {assessmentData.introVideo !== "" && (
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
                Duration: The test will take approximately <b>{minTime}</b> to{" "}
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
                1. {t("l1")}
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
                2. {t("2")}
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
                3. {t("3")}
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
                4. <b> {t("4")}</b>
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
                5. {t("6")}
              </Typography>
              {!(
                assessmentData.webcamScreenshots === false ||
                assessmentData.numberOfVideoQuestions < 1
              ) && (
                <Typography
                  sx={{
                    fontSize: { xs: 14, sm: 16 },
                    textAlign: "justify",
                    width: "100%",
                    mt: 1,
                  }}
                  tabIndex={0}
                >
                  6. {t("5")}
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
                <i>{t("bestofluck")}</i>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
