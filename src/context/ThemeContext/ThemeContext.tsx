import { ReactNode, useEffect, useState } from "react";

import {
  createTheme,
  ThemeProvider as MuiTheme,
  Paper,
  ThemeOptions,
} from "@mui/material";

import { ThemeContext } from "../../hooks/useTheme";

import { useTranslation } from "react-i18next";

import Theme from "../../theme/Theme";

const LOCAL_STORAGE_KEY = "Theme";

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { i18n } = useTranslation();
  const { language } = i18n;

  const [darkMode, setDarkMode] = useState<boolean | null>(null);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const dir = language === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.dir = dir;
    const savedTheme = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedTheme !== null) {
      setDarkMode(savedTheme === "dark");
    } else {
      const systemDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setDarkMode(systemDarkMode);
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        systemDarkMode ? "dark" : "light"
      );
    }
  }, [language, dir]);

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => {
      const newDarkMode = !prevDarkMode;
      localStorage.setItem(LOCAL_STORAGE_KEY, newDarkMode ? "dark" : "light");
      return newDarkMode;
    });
  };
  const setTheme = (theme?: "dark" | "light") => {
    if (theme) {
      setDarkMode(theme === "dark");
      localStorage.setItem(LOCAL_STORAGE_KEY, theme);
    }
  };

  // Create the MUI theme based on the current settings
  const theme = createTheme(
    Theme(dir, darkMode ? "dark" : "light") as ThemeOptions
  );

  return (
    <ThemeContext.Provider
      value={{
        darkMode: darkMode || false,
        toggleDarkMode,
        toggleDrawer,
        drawerOpen,
        setTheme,
        theme,
        dir,
      }}
    >
      <MuiTheme theme={theme}>
        <Paper
          elevation={3}
          sx={{
            borderRadius: 0,
            height: "100%",
            minHeight: "100dvh",
          }}
        >
          {children}
        </Paper>
      </MuiTheme>
    </ThemeContext.Provider>
  );
};
