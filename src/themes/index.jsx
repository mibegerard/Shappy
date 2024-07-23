import { createTheme } from '@mui/material/styles';

// assets
import colors from 'assets/scss/_themes-vars.module.scss';

// project imports
import componentStyleOverrides from './compStyleOverride';
import themePalette from './palette';
import themeTypography from './typography';

/**
 * Represent theme style and structure as per Material-UI
 * @param {JsonObject} customization customization parameter object
 */

export const theme = (customization) => {
  const color = {
    ...colors,
    orangeMain: '#FC8A1A',
    beigeclaire: '#FFF4E2'
  };

  const themeOption = {
    colors: color,
    heading: color.orangeMain, // Set default heading color to orange
    paper: color.paper,
    backgroundDefault: color.beigeclaire, // Set default background to beigeclaire
    background: color.primaryLight, // Set background to primaryLight
    darkTextPrimary: color.orangeMain, // Set default text color to orange
    darkTextSecondary: color.orangeMain, // Set secondary text color to orange
    textDark: color.orangeMain, // Set dark text color to orange
    menuSelected: color.secondaryDark,
    menuSelectedBack: color.secondaryLight,
    divider: color.grey200,
    customization
  };

  const themeOptions = {
    direction: 'ltr',
    palette: themePalette(themeOption),
    mixins: {
      toolbar: {
        minHeight: '48px',
        padding: '16px',
        '@media (min-width: 600px)': {
          minHeight: '48px'
        }
      }
    },
    typography: themeTypography(themeOption)
  };

  const themes = createTheme(themeOptions);
  themes.components = componentStyleOverrides(themeOption);

  return themes;
};

export default theme;