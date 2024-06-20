import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Checkbox, FormControlLabel, TextField, Stack } from "@mui/material";

function formatDate(date: Date) {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return new Intl.DateTimeFormat("fr-FR", options).format(date);
}

export default function CONSENT({
  name,
  setName,
}: {
  name: string;
  setName: (value: string) => void;
}) {
  const currentDate = formatDate(new Date());

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value.toUpperCase());
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

        <Box
          sx={{
            width: "100%",
            mt: 3,
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <FormControlLabel
            control={<Checkbox name="agree" />}
            label="Lorem ipsum dolor sit amet consectetur. Ullamcorper sed molestie tempus scelerisque. "
          />
        </Box>

        <Box
          sx={{
            width: "100%",
            mt: 4,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              marginBottom: 1,
              fontWeight: "bold",
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            Your signature
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems="center"
          >
            <TextField
              id="outlined-basic"
              label=""
              variant="outlined"
              value={name}
              onChange={handleNameChange}
              sx={{ flex: 1 }}
            />
            <Typography
              variant="body1"
              sx={{
                fontSize: 14,
                textAlign: "center",
                minWidth: "fit-content",
              }}
            >
              Date: {currentDate}
            </Typography>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
