import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { FormControlLabel, RadioGroup, Radio } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

export default function EXTRA_TIME() {
  const [selectedValue, setSelectedValue] = useState("nottosay");
  const { t, i18n } = useTranslation("extratime");

  useEffect(() => {
    // Store true or false based on the selected value
    const valueToStore = selectedValue === "yes" ? "true" : "false";
    localStorage.setItem("selectedValue", valueToStore);
  }, [selectedValue]);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    document.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        minWidth: 320,
        boxShadow: 0,
        minHeight: 500,
        border: "ActiveBorder",
      }}
      tabIndex={0}
    >
      <CardContent sx={{ flex: 1 }}>
        <Box sx={{ width: "100%", mt: 2 }}>
          <Typography
            sx={{
              fontSize: { xs: 14, sm: 16 },
              textAlign: "justify",
              width: "100%",
              mt: 2,
            }}
            tabIndex={0}
            aria-label={t("text1")}
          >
            {t("text1")}
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 14, sm: 16 },
              textAlign: "justify",
              width: "100%",
              mt: 1,
            }}
            tabIndex={0}
            aria-label={t("text1")}
          >
            {t("text2")}
          </Typography>
        </Box>

        <Box sx={{ width: "100%", mt: 2 }}>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={selectedValue}
            onChange={handleRadioChange}
            sx={{ mt: 2 }}
            tabIndex={0}
          >
            <FormControlLabel
              value="yes"
              sx={{ mr: 8 }}
              control={<Radio />}
              label={t("yes")}
              tabIndex={0}
              aria-label={t("yes")}
            />
            <FormControlLabel
              value="no"
              sx={{ mr: 8 }}
              control={<Radio />}
              label={t("no")}
              tabIndex={0}
              aria-label={t("no")}
            />
            <FormControlLabel
              value="nottosay"
              sx={{ mr: 2 }}
              control={<Radio />}
              label={t("prefernot")}
              tabIndex={0}
              aria-label={t("prefernot")}
            />
          </RadioGroup>
        </Box>
      </CardContent>
    </Card>
  );
}
