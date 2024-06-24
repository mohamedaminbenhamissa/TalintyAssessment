import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useTranslation } from "@/hooks/useTranslation";
import { useEffect } from "react";

export default function Init() {
  const { t, i18n } = useTranslation("init");
  console.log(i18n.language);
  useEffect(() => {
    document.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);
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
          <Grid item xs={12} sm={5}>
            <Box sx={{ width: "90%", mt: 1, mx: "auto" }}>
              <Typography
                sx={{
                  fontSize: { xs: 14, sm: 16 },
                  textAlign: "justify",
                  width: "100%",
                }}
              >
                {t("dear")}
                <Typography
                  sx={{
                    color: "#C1976B",
                    mt: 1,
                    textAlign: "center",
                  }}
                >
                  Condidate
                </Typography>
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: 14, sm: 16 },
                  textAlign: "justify",
                  width: "100%",
                  mt: 1,
                }}
              >
                {t("welcome")}
              </Typography>
            </Box>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item xs={12} sm={6}>
            <Box sx={{ width: "90%", mt: 1, mx: "auto" }}>
              <Typography
                sx={{
                  fontSize: { xs: 14, sm: 16 },
                  textAlign: "justify",
                  width: "100%",
                }}
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
              >
                Your test will take approximately between 20 and 40 minutes to
                complete.
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: 14, sm: 16 },
                  textAlign: "justify",
                  width: "100%",
                  mt: 2,
                  color: "#C1976B",
                }}
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
              >
                1. <b>Activate Your Camera and Microphone:</b> Ensure your
                camera and microphone are enabled, as we may need to verify your
                identity and monitor the test.
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: 14, sm: 16 },
                  textAlign: "justify",
                  width: "100%",
                  mt: 1,
                }}
              >
                2.<b> Stable Internet Connection:</b> Make sure you have a
                stable internet connection to avoid any disruptions.
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: 14, sm: 16 },
                  textAlign: "justify",
                  width: "100%",
                  mt: 1,
                }}
              >
                3. <b>Stay Within the Test Browser:</b> Do not navigate away
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
              >
                4. <b>Quiet Environment:</b> Find a quiet and comfortable place
                where you can focus without interruptions. You are free to use a
                calculator, pen and paper.
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: 14, sm: 16 },
                  textAlign: "justify",
                  width: "100%",
                  mt: 1,
                }}
              >
                4. <b> You are free to use a calculator, pen and paper.</b>
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: 14, sm: 16 },
                  textAlign: "justify",
                  width: "100%",
                  mt: 2,
                }}
              >
                We wish you the best of luck and look forward to seeing your
                results!
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
