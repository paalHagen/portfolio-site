"use client";
import * as React from "react";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  GlobalStyles,
} from "@mui/material";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { useThemeMode } from "../context/ThemeContext";

// ThemeRegistry.tsx includes:
// - applies the current theme (light or dark) from ThemeContext.tsx
// - sets up Emotion for styling
// - wraps the app with ThemeProvider, CacheProvider, and some global styles

// font stack to use in the theme
const fontStack = ["Helvetica Neue", "Arial", "Helvetica", "sans-serif"].join(
  ","
);

// create a Material-UI theme object based on light or dark mode
function getTheme(mode: "light" | "dark") {
  return createTheme({
    typography: {
      fontFamily: fontStack,
    },
    palette: {
      mode,
    },
  });
}

// create an Emotion cache (used for styling)
function createEmotionCache() {
  return createCache({ key: "css", prepend: true });
}

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  // store the Emotion cache in state
  const [cache] = React.useState(() => createEmotionCache());

  // get the current theme mode (light or dark) from ThemeContext
  const { mode } = useThemeMode();

  // build the theme whenever the mode changes
  const theme = React.useMemo(() => getTheme(mode), [mode]);

  return (
    // wrap the app in Emotion and MUI theme providers
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        {/* reset some default browser styles */}
        <CssBaseline />
        {/* set a global background color */}
        <GlobalStyles
          styles={{
            body: { backgroundColor: theme.palette.background.default },
          }}
        />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
