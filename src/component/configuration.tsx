import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Divider, Grid } from "@mui/material";
import RecordCamera from "../assets/camera";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import NotStartedOutlinedIcon from "@mui/icons-material/NotStartedOutlined";

export default function CONFIG_WEBCAM() {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        minWidth: 320,
        minHeight: 500,
        boxShadow: 0,
        border: "ActiveBorder",
      }}
    >
      <CardContent sx={{ flex: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 1,
                background: "#E8E8F0",
                borderRadius: "10px",
                padding: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <RecordCamera width={24} height={24} />
                <Typography
                  sx={{
                    fontSize: "20px",
                    lineHeight: "21px",
                    color: "#1A1A20",
                    fontWeight: "bold",
                  }}
                >
                  Camera
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontSize: 14,
                  textAlign: "justify",
                  width: "100%",
                }}
              >
                Le lorem ipsum est, en imprimerie, une suite de mots sans
                signification utilisée à titre provisoire pour calibrer une mise
                en page,
              </Typography>
              <Divider sx={{ my: 2, borderColor: "#E3D9C8", width: "100%" }} />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 1,
                  background: "#FFE6E6",
                  borderRadius: "5px",
                  padding: 2,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 14,
                    textAlign: "justify",
                    width: "100%",
                    color: "#D15050",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <ReportProblemOutlinedIcon
                    sx={{ fontSize: "inherit", width: "24px", height: "24px" }}
                  />
                  Le lorem ipsum est, en imprimerie, une suite de mots sans
                  signification utilisée à titre provisoire pour calibrer une
                  mise en page, Le lorem ipsum est, en imprimerie, une suite de
                  mots sans signification utilisée à titre provisoire pour
                  calibrer une mise en page,
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: 1,
              }}
            >
              <video
                width="40%"
                height="30%"
                controls
                style={{ maxWidth: "100%", borderRadius: "10px" }}
              >
                <source
                  src="https://www.youtube.com/watch?v=ZyQlpX7lCRE"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
              <Button
                sx={{
                  background: "#C1976B",
                  color: "#fff",
                  px: 2,
                  py: 1,
                  borderRadius: "10px",
                  mt: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  ":hover": {
                    background: "#C1976B",
                    color: "#fff",
                  },
                }}
                size="small"
              >
                <NotStartedOutlinedIcon /> Commencer l'enregistrement
              </Button>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
