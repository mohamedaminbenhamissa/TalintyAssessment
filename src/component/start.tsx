import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
interface AssessmentData {
  firstName: string;
  jobName: string;
  introVideo: string;
  estimatedTime: number;
  webcamScreenshots: boolean;
  numberOfVideoQuestions: number;
  enableExtraTime: boolean;
  testDescription: string;
}
export default function START({
  assessmentData,
}: {
  assessmentData: AssessmentData;
}) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        minWidth: { xs: 280, sm: 320 },
        minHeight: { xs: 450, sm: 500 },
        boxShadow: 0,
      }}
    >
      <CardContent sx={{ flex: 1 }}>
        <Box sx={{ width: "90%", mt: 2, mx: "auto" }}>
          <Typography
            sx={{
              fontSize: { xs: 12, sm: 14 },
              textAlign: "justify",
              width: "100%",
            }}
          >
            {assessmentData.testDescription}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
