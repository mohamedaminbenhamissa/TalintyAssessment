import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function START() {
  return (
    <Card
      sx={{
        display: "flex",
        boxShadow: 0,
        flexDirection: "column",
        minWidth: { xs: "100%", sm: 400, md: 500 },
        minHeight: 500,
        margin: "auto",
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
      </CardContent>
    </Card>
  );
}
