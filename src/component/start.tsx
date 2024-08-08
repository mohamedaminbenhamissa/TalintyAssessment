import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import parse from "html-react-parser";
type AssessmentData = {
  firstName: string;
  jobName: string;
  introVideo: string;
  packs: Pack[];
  estimatedTime: number;
  webcamScreenshots: boolean;
  numberOfVideoQuestions: number;
  enableExtraTime: boolean;
  testDescription: string;
};
type Pack = {
  description: string;
  // Add other properties as needed
};
export default function START({
  assessmentData,
  currentPackIndex,
}: {
  assessmentData: AssessmentData;
  currentPackIndex: number;
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
            {typeof assessmentData.packs[currentPackIndex].description ===
            "string"
              ? parse(assessmentData.packs[currentPackIndex].description)
              : "Invalid data"}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
