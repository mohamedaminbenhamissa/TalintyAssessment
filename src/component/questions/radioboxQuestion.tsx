import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { FormControlLabel, RadioGroup, Radio } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

const vv = () => {
  const [selectedValue, setSelectedValue] = useState("nottosay");

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const { t, i18n } = useTranslation("extratime");
  console.log(i18n.language);

  useEffect(() => {
    document.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);
  useEffect(() => {
    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        minWidth: 320,
        boxShadow: 0,
        minHeight: 500,
        border: "ActiveBorder",
        userSelect: "none",
      }}
    >
      <Box
        sx={{
          width: "100%",
          bgcolor: "#FFEEEE",
          color: "white",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          px: 2,
          py: 1,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <Typography variant="body1" sx={{ color: "#D15050" }}>
            Question Progress:
          </Typography>
          <Typography variant="body1" sx={{ color: "#D15050" }}>
            2/6
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <Typography variant="body1" sx={{ color: "#D15050" }}>
            Time Spent:
          </Typography>
          <Typography variant="body1" sx={{ color: "#D15050" }}>
            00:12:12
          </Typography>
        </Box>
      </Box>
      <CardContent sx={{ flex: 1 }}>
        <Box sx={{ width: "100%", mt: 2 }}>
          <Typography
            sx={{
              fontSize: { xs: 14, sm: 16 },
              textAlign: "justify",
              width: "100%",
              mt: 2,
              fontWeight: "bold",
            }}
          >
            Question :
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 14, sm: 16 },
              textAlign: "justify",
              width: "100%",
              mt: 1,
            }}
          >
            Lorem ipsum dolor sit amet consectetur. Ullamcorper sed molestie
            tempus scelerisque. Nunc egestas mattis tempor diam nulla sagittis.
            Vestibulum curabitur blandit eu amet faucibus aliquam eros.
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 14, sm: 16 },
              textAlign: "justify",
              width: "100%",
              mt: 3,
              fontWeight: "bold",
            }}
          >
            Answer:
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 14, sm: 16 },
              textAlign: "center",
              width: "100%",
              mt: 3,
            }}
          >
            Lorem ipsum dolor sit amet consectetur. Ullamcorper sed molestie
          </Typography>
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            mt: 2,
          }}
        >
          <RadioGroup
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={selectedValue}
            onChange={handleRadioChange}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 2,
            }}
          >
            {["prefernot", "yes", "no"].map((value) => (
              <Box
                key={value}
                sx={{
                  border: "1px solid grey",
                  px: 2,
                  borderRadius: 4,
                  mr: 2,
                  display: "flex",
                  width: "90%",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <FormControlLabel
                  value={value}
                  control={<Radio />}
                  label={t(value)}
                />
              </Box>
            ))}
          </RadioGroup>
        </Box>
      </CardContent>
    </Card>
  );
};

export default vv;
