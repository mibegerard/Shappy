/**
 * Typography used in theme
 * @param {JsonObject} theme theme customization object
 */
export default function themeTypography(theme) {
  return {
    fontFamily: theme?.customization?.fontFamily,
    h6: {
      fontWeight: 800,
      fontSize: '15px', // ~0.9375rem
      color: theme.heading,
      fontFamily: 'Poppins',
    },
    h5: {
      fontSize: '0.875rem', // 14px
      color: theme.heading,
      fontWeight: 500,
      fontFamily: 'Tanker',
    },
    h4: {
      fontSize: '1rem', // 16px
      color: theme.heading,
      fontWeight: 600,
      fontFamily: 'Tanker',
    },
    h3: {
      fontSize: '1.25rem', // 20px
      color: theme.heading,
      fontWeight: 600,
      fontFamily: 'Tanker',
    },
    h2: {
      fontSize: '1.5rem', // 24px
      color: theme.heading,
      fontWeight: 700,
      fontFamily: 'Tanker',
    },
    h1: {
      fontSize: '2.125rem', // 34px
      color: theme.heading,
      fontWeight: 700,
      fontFamily: 'Tanker',
    },
    subtitle1: {
      fontSize: '0.875rem', // 14px
      fontWeight: 500,
      color: theme.textDark,
      fontFamily: 'Poppins',
    },
    subtitle2: {
      fontSize: '0.75rem', // 12px
      fontWeight: 400,
      color: theme.darkTextSecondary,
      fontFamily: 'Poppins',
    },
    caption: {
      fontSize: '0.75rem', // 12px
      color: theme.darkTextSecondary,
      fontWeight: 400,
      fontFamily: 'Poppins',
    },
    body1: {
      fontSize: '0.875rem', // 14px
      fontWeight: 400,
      lineHeight: '1.334em',
      fontFamily: 'Poppins',
    },
    body2: {
      fontSize: '0.875rem', // 14px
      letterSpacing: '0em',
      fontWeight: 400,
      lineHeight: '1.5em',
      color: theme.darkTextPrimary,
      fontFamily: 'Poppins',
    },
    button: {
      textTransform: 'capitalize',
      fontFamily: 'Poppins',
    },
    customInput: {
      marginTop: 1,
      fontFamily: 'Poppins',
      marginBottom: 1,
      '& > label': {
        top: 23,
        left: 0,
        color: theme.grey500,
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
      fontSize: '0.875rem', // 14px
      fontWeight: 500,
      fontFamily: 'Poppins',
      color: theme.heading,
      padding: '6px',
      textTransform: 'capitalize',
      marginTop: '10px',
    },
    subMenuCaption: {
      fontSize: '0.6875rem', // 11px
      fontWeight: 500,
      fontFamily: 'Poppins',
      color: theme.darkTextSecondary,
      textTransform: 'capitalize',
    },
    commonAvatar: {
      cursor: 'pointer',
      borderRadius: '8px',
    },
    smallAvatar: {
      width: '22px',
      height: '22px',
      fontSize: '1rem', // 16px
    },
    mediumAvatar: {
      width: '34px',
      height: '34px',
      fontSize: '1.2rem', // 19px
    },
    largeAvatar: {
      width: '44px',
      height: '44px',
      fontSize: '1.5rem', // 24px
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
