import { Theme } from "@mui/material";

export type ThemeContextType = {
  darkMode: boolean;
  toggleDarkMode: () => void;
  theme: Theme;
  dir: "rtl" | "ltr" | "auto";
  setTheme: (theme?: "light" | "dark") => void;
  toggleDrawer: () => void;
  drawerOpen: boolean;
};
