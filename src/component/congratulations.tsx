import {
  Card,
  CardContent,
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import congrats from "../assets/congrats.png";
import { useTranslation } from "@/hooks/useTranslation";

export default function CONGRATS() {
  const { t } = useTranslation("popups");
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        minWidth: { xs: "100%", sm: 400, md: 500 },
        boxShadow: 0,
        minHeight: 500,
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
        p: 2,
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
          <img
            src={congrats}
            alt="congrats"
            style={{
              width: "100%",
              maxWidth: 300,
              height: "auto",
            }}
          />
          <Typography
            sx={{
              fontSize: { xs: 24, sm: 36, md: 48 },
              fontWeight: 700,
              color: "#1A1A20",
              marginBottom: 2,
            }}
          >
            {t("cngrats")}
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 14, sm: 16 },
              color: "#1A1A20",
              fontWeight: 400,
              maxWidth: 600,
            }}
          >
            {t("congratsmsg")}
          </Typography>
        </Box>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          gap={3}
          sx={{ justifyContent: "center", alignItems: "center", mt: 5 }}
        >
          <Button
            sx={{
              background: "#fff",
              color: "#023651",
              px: 6,
              border: 1,
              py: 1,
              ":hover": {
                background: "#fff",
                color: "#023651",
              },
              borderRadius: "10px",
              width: { xs: "100%", sm: "auto" },
            }}
            size="small"
          >
            Create account
          </Button>
          <Button
            sx={{
              background: "#023651",
              color: "#fff",
              px: 6,
              py: 1,
              ":hover": {
                background: "#023651",
                color: "#fff",
              },
              borderRadius: "10px",
              width: { xs: "100%", sm: "auto" },
            }}
            size="small"
          >
            Suivi candidature
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
