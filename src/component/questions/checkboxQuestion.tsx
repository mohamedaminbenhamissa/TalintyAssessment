import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { FormControlLabel, Checkbox } from "@mui/material";
import { useTranslation } from "@/hooks/useTranslation";

const az = () => {
  const [selectedValues, setSelectedValues] = useState(["nottosay"]);
  const handleCheckboxChange = (value: string) => {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter((v) => v !== value));
    } else {
      setSelectedValues([...selectedValues, value]);
    }
  };

  const { t, i18n } = useTranslation("extratime");

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
          bgcolor: "#F6F7F6",
          color: "white",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          px: 2,
          py: 1,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <Typography variant="body1" sx={{ color: "#3A923E" }}>
            Question Progress:
          </Typography>
          <Typography variant="body1" sx={{ color: "#000" }}>
            2/6
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <Typography variant="body1" sx={{ color: "#3A923E" }}>
            Time Spent:
          </Typography>
          <Typography variant="body1" sx={{ color: "#000" }}>
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
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            width: "60%",
            mx: "auto",
            mt: 2,
            gap: 1,
          }}
        >
          {["prefernot", "yes", "no"].map((value) => (
            <Box
              key={value}
              sx={{
                border: "1px solid grey",
                px: 2,
                borderRadius: 2,
                mr: 2,
                display: "flex",
                alignItems: "center",
                height: 40,
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedValues.includes(value)}
                    onChange={() => handleCheckboxChange(value)}
                  />
                }
                label={t(value)}
              />
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default az;
