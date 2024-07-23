/**
 * Typography used in theme
 * @param {JsonObject} theme theme customization object
 */
export default function themeTypography(theme) {
  return {
    fontFamily: theme?.customization?.fontFamily,
    h6: {
      fontWeight: 800,
      fontSize: '1.125rem', // 18px
      color: theme.colors?.orangeMain, // Updated to orange
      fontFamily: 'Poppins',
    },
    h5: {
      fontSize: '1rem', // 16px
      color: theme.colors?.orangeMain, // Updated to orange
      fontWeight: 500,
      fontFamily: 'Tanker',
    },
    h4: {
      fontSize: '1.125rem', // 18px
      color: theme.colors?.orangeMain, // Updated to orange
      fontWeight: 600,
      fontFamily: 'Tanker',
    },
    h3: {
      fontSize: '1.375rem', // 22px
      color: theme.colors?.orangeMain, // Updated to orange
      fontWeight: 600,
      fontFamily: 'Tanker',
    },
    h2: {
      fontSize: '1.75rem', // 28px
      color: theme.colors?.orangeMain, // Updated to orange
      fontWeight: 700,
      fontFamily: 'Tanker',
    },
    h1: {
      fontSize: '2.375rem', // 38px
      color: theme.colors?.orangeMain, // Updated to orange
      fontWeight: 700,
      fontFamily: 'Tanker',
    },
    subtitle1: {
      fontSize: '1rem', // 16px
      fontWeight: 500,
      color: theme.colors?.orangeMain, // Updated to orange
      fontFamily: 'Poppins',
    },
    subtitle2: {
      fontSize: '0.875rem', // 14px
      fontWeight: 400,
      color: theme.colors?.orangeMain, // Updated to orange
      fontFamily: 'Poppins',
    },
    caption: {
      fontSize: '0.875rem', // 14px
      color: theme.colors?.orangeMain, // Updated to orange
      fontWeight: 400,
      fontFamily: 'Poppins',
    },
    body1: {
      fontSize: '1rem', // 16px
      fontWeight: 400,
      lineHeight: '1.334em',
      color: theme.colors?.orangeMain, // Updated to orange
      fontFamily: 'Poppins',
    },
    body2: {
      fontSize: '1rem', // 16px
      letterSpacing: '0em',
      fontWeight: 400,
      lineHeight: '1.5em',
      color: theme.colors?.orangeMain, // Updated to orange
      fontFamily: 'Poppins',
    },
    button: {
      textTransform: 'capitalize',
      fontFamily: 'Poppins',
      color: theme.colors?.beigeclaire 
    },
    customInput: {
      marginTop: 1,
      fontFamily: 'Poppins',
      marginBottom: 1,
      '& > label': {
        top: 23,
        left: 0,
        color: theme.colors?.grey500,
        '&[data-shrink="false"]': {
          top: 5,
        },
      },
      '& > div > input': {
        padding: '30.5px 14px 11.5px !important',
      },
      '& legend': {
        display: 'none',
      },
      '& fieldset': {
        top: 0,
      },
    },
    mainContent: {
      backgroundColor: theme.background,
      fontFamily: 'Poppins',
      width: '100%',
      minHeight: 'calc(100vh - 88px)',
      flexGrow: 1,
      padding: '20px',
      marginTop: '88px',
      marginRight: '20px',
      borderRadius: `${theme?.customization?.borderRadius}px`,
    },
    menuCaption: {
      fontSize: '1rem', // 16px
      fontWeight: 500,
      fontFamily: 'Poppins',
      color: theme.colors?.orangeMain, // Updated to orange
      padding: '6px',
      textTransform: 'capitalize',
      marginTop: '10px',
    },
    subMenuCaption: {
      fontSize: '0.8125rem', // 13px
      fontWeight: 500,
      fontFamily: 'Poppins',
      color: theme.colors?.orangeMain, // Updated to orange
      textTransform: 'capitalize',
    },
    commonAvatar: {
      cursor: 'pointer',
      borderRadius: '8px',
    },
    smallAvatar: {
      width: '22px',
      height: '22px',
      fontSize: '1.125rem', // 18px
    },
    mediumAvatar: {
      width: '34px',
      height: '34px',
      fontSize: '1.4rem', // 22px
    },
    largeAvatar: {
      width: '44px',
      height: '44px',
      fontSize: '1.75rem', // 28px
    },
    components: {
      MuiLink: {
        styleOverrides: {
          root: {
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'none',
            },
          },
        },
      },
    },
  };
}
