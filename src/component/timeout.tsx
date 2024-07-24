import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import timeout from "../assets/timeout.png";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "@/hooks/useTranslation";

export default function TIMEOUT() {
  const { t } = useTranslation("popups");
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        minWidth: 500,
        boxShadow: 0,
        minHeight: 500,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <img src={timeout} alt="congrats" />
          <Typography
            sx={{
              fontSize: 48,
              fontWeight: 700,
              color: "#1A1A20",
              marginBottom: 2,
            }}
          >
            {t("timeout")}
          </Typography>
          <Typography
            sx={{
              fontSize: 16,
              color: "#1A1A20",
              fontWeight: 400,
            }}
          >
            {t("timeoutmsg")}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
