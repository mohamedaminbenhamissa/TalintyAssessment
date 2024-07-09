import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import expired from "../assets/expired.png";
import { Box, Typography } from "@mui/material";

export default function EVALEXPIRED() {
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
          <img src={expired} alt="congrats" />
          <Typography
            sx={{
              fontSize: 48,
              fontWeight: 700,
              color: "#1A1A20",
              marginBottom: 2,
            }}
          >
            Evaluation expired !
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
      </CardContent>
    </Card>
  );
}
