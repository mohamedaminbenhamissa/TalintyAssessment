import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { FormControlLabel, RadioGroup, Radio } from "@mui/material";
import { useState } from "react";

export default function EXTRA_TIME() {
  const [selectedValue, setSelectedValue] = useState("nottosay");

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

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
    >
      <CardContent sx={{ flex: 1 }}>
        <Box sx={{ width: "100%", mt: 2 }}>
          <Typography
            sx={{
              fontSize: 14,
              textAlign: "justify",
            }}
          >
            Le lorem ipsum est, en imprimerie, une suite de mots sans
            signification utilisée à titre provisoire pour calibrer une mise en
            page, le texte définitif venant remplacer le faux-texte dès qu'il
            est prêt ou que la mise en page est achevée. Généralement, on
            utilise un texte en faux latin, le Lorem ipsum ou Lipsum. Le lorem
            ipsum est, en imprimerie, une suite de mots sans signification
            utilisée à titre provisoire pour calibrer une mise en page, le texte
            définitif venant remplacer le faux-texte dès qu'il est prêt ou que
            la mise en page est achevée. Généralement, on utilise un texte en
            faux latin, le Lorem ipsum ou Lipsum. Le lorem ipsum est, en
            imprimerie, une suite de mots sans signification utilisée à titre
            provisoire pour calibrer une mise en page, le texte définitif venant
            remplacer le faux-texte dès qu'il est prêt ou que la mise en page
            est achevée. Généralement, on utilise un texte en faux latin, le
            Lorem ipsum ou Lipsum.
          </Typography>
        </Box>

        <Box sx={{ width: "100%", mt: 2 }}>
          <Typography
            sx={{
              fontSize: 14,
              textAlign: "justify",
              fontWeight: 600,
              color: "#1A1A20",
            }}
          >
            Do you have a disability?
          </Typography>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={selectedValue}
            onChange={handleRadioChange}
            sx={{ mt: 2 }}
          >
            <FormControlLabel
              value="yes"
              sx={{ mr: 8 }}
              control={<Radio />}
              label="Yes"
            />
            <FormControlLabel
              value="no"
              sx={{ mr: 8 }}
              control={<Radio />}
              label="No"
            />
            <FormControlLabel
              value="nottosay"
              sx={{ mr: 2 }}
              control={<Radio />}
              label="I prefer not to say"
            />
          </RadioGroup>
        </Box>
      </CardContent>
    </Card>
  );
}
