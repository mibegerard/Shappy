/**
 * Color intention that you want to use in your theme
 * @param {JsonObject} theme Theme customization object
 */

export default function themePalette(theme) {
  return {
    background: {
      paper: theme.paper,
      default: theme.colors?.beigeclaire, // Set default background to beigeclaire
    },
    mode: theme?.customization?.navType,
    common: {
      black: theme.colors?.darkPaper
    },
    primary: {
      light: theme.colors?.primaryLight,
      main: theme.colors?.primaryMain,
      dark: theme.colors?.primaryDark,
      200: theme.colors?.primary200,
      800: theme.colors?.primary800
    },
    secondary: {
      light: theme.colors?.secondaryLight,
      main: theme.colors?.secondaryMain,
      dark: theme.colors?.secondaryDark,
      200: theme.colors?.secondary200,
      800: theme.colors?.secondary800
    },
    error: {
      light: theme.colors?.errorLight,
      main: theme.colors?.errorMain,
      dark: theme.colors?.errorDark
    },
    orange: {
      light: theme.colors?.orangeLight,
      main: theme.colors?.orangeMain,
      dark: theme.colors?.orangeDark
    },
    warning: {
      light: theme.colors?.warningLight,
      main: theme.colors?.warningMain,
      dark: theme.colors?.warningDark
    },
    success: {
      light: theme.colors?.successLight,
      200: theme.colors?.success200,
      main: theme.colors?.successMain,
      dark: theme.colors?.successDark
    },
    grey: {
      50: theme.colors?.grey50,
      100: theme.colors?.grey100,
      500: theme.darkTextSecondary,
      600: theme.heading,
      700: theme.darkTextPrimary,
      900: theme.textDark
    },
    dark: {
      light: theme.colors?.darkTextPrimary,
      main: theme.colors?.darkLevel1,
      dark: theme.colors?.darkLevel2,
      800: theme.colors?.darkBackground,
      900: theme.colors?.darkPaper
    },
    text: {
      primary: theme.colors?.orangeMain, // Set primary text color to orange
      secondary: theme.colors?.orangeMain, // Set secondary text color to orange
      dark: theme.colors?.orangeMain, // Set dark text color to orange
      hint: theme.colors?.grey100
    },
    beige: {
      main: theme.colors?.beigeMain,
      clair: theme.colors?.beigeClair,
      40: theme.colors?.beige40
    },
    vert: {
      fonce60: theme.colors?.vertFonce60,
      claire: theme.colors?.vertClaire,
      fonce: theme.colors?.vertFonce
    },
    jaune: {
      main: theme.colors?.jauneMain
    },
    red: {
      main: theme.colors?.redMain
    }
  };
}
