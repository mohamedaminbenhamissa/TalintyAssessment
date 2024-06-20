import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import timeout from "../assets/timeout.png";
import { Box, Button, Stack, Typography } from "@mui/material";

export default function TIMEOUT() {
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
            Congratulations!
          </Typography>
          <Typography
            sx={{
              fontSize: 16,
              color: "#1A1A20",
              fontWeight: 400,
            }}
          >
            Lorem ipsum dolor sit amet consectetur. Ullamcorper sed molestie
            tempus scelerisque. Nunc egestas mattis tempor diam nulla sagittis.
          </Typography>
        </Box>
        <Stack
          direction={"row"}
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
            }}
            size="small"
            style={{ borderRadius: "10px" }}
          >
            Create account{" "}
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
            }}
            size="small"
            style={{ borderRadius: "10px" }}
          >
            Suivi candidature
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
