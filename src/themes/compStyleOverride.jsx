import { borderColor, fontWeight } from "@mui/system";

export default function componentStyleOverrides(theme) {
  const bgColor = '#ffffff'; // Background color for inputs

  return {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          borderRadius: '10px',
          color: 'white',
          textDecoration: 'none',
          '&:hover': {
            backgroundColor: theme.colors?.vertFonce,
            color: 'white',
            textDecoration: 'none',
          },
        }
      }
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none'
        },
        rounded: {
          borderRadius: `${theme?.customization?.borderRadius}px`
        }
      }
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          color: theme.colors?.textDark,
          padding: '24px'
        },
        title: {
          fontSize: '1.125rem'
        }
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '24px'
        }
      }
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: '24px'
        }
      }
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: theme.darkTextPrimary,
          paddingTop: '10px',
          paddingBottom: '10px',
          '&.Mui-selected': {
            color: theme.menuSelected,
            backgroundColor: theme.menuSelectedBack,
            '&:hover': {
              backgroundColor: theme.menuSelectedBack
            },
            '& .MuiListItemIcon-root': {
              color: theme.menuSelected
            }
          },
          '&:hover': {
            backgroundColor: theme.menuSelectedBack,
            color: theme.menuSelected,
            '& .MuiListItemIcon-root': {
              color: theme.menuSelected
            }
          }
        }
      }
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: theme.darkTextPrimary,
          minWidth: '36px',
        }
      }
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: theme.textDark
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: 'grey',
          '&::placeholder': {
            color: theme.darkTextSecondary,
            fontSize: '0.875rem'
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          background: bgColor,
          borderRadius: '10px',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.colors?.primaryMain
          },
          '&:hover $notchedOutline': {
            borderColor: theme.colors?.primaryMain
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.colors?.primaryMain
          },
          '&.MuiInputBase-multiline': {
            padding: 1
          }
        },
        input: {
          fontWeight: 500,
          background: bgColor,
          borderColor: '#ffffff',
          padding: '15.5px 14px',
          borderRadius: '10px',
          '&.MuiInputBase-inputSizeSmall': {
            padding: '10px 14px',
            '&.MuiInputBase-inputAdornedStart': {
              paddingLeft: 0
            }
          }
        },
        inputAdornedStart: {
          paddingLeft: 4
        },
        notchedOutline: {
          borderRadius: '10px'
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: { 
          padding: '0 4px',
          borderRadius: '4px'
        }
      }
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            color: theme.colors?.grey300
          }
        },
        mark: {
          backgroundColor: theme.paper,
          width: '4px'
        },
        valueLabel: {
          color: theme.colors?.primaryLight
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: theme.colors?.grey200,
          opacity: 1
        }
      }
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          color: theme.colors?.primaryDark,
          background: theme.colors?.primary200
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          '&.MuiChip-deletable .MuiChip-deleteIcon': {
            color: theme.colors?.grey500
          }
        }
      }
    },
    MuiTimelineContent: {
      styleOverrides: {
        root: {
          color: theme.textDark,
          fontSize: '16px'
        }
      }
    },
    MuiTreeItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected > .MuiTreeItem-content .MuiTreeItem-label': {
            backgroundColor: 'transparent'
          },
          '&.Mui-selected:focus > .MuiTreeItem-content .MuiTreeItem-label': {
            backgroundColor: 'transparent'
          }
        }
      }
    },
    MuiTimelineDot: {
      styleOverrides: {
        root: {
          boxShadow: 'none'
        }
      }
    },
    MuiInternalDateTimePickerTabs: {
      styleOverrides: {
        tabs: {
          backgroundColor: theme.colors?.primaryLight
        }
      }
    },

    // Add the colors for MenuItem and Checkbox here
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: theme.darkTextPrimary,
          '&.Mui-selected': {
            color: theme.menuSelected,
            backgroundColor: theme.menuSelectedBack,
            '&:hover': {
              backgroundColor: theme.menuSelectedBack
            },
          },
          '&:hover': {
            backgroundColor: "#FFF4E2",
            color: theme.menuSelected,
          }
        }
      }
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: theme.darkTextPrimary,
          '&.Mui-checked': {
            color: theme.colors?.primaryMain,
          },
          '&:hover': {
            backgroundColor: 'transparent',
          }
        }
      }
    },

    // Add Menu component styling to ensure background color is white when dropdown is open
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: '#ffffff', // Set the background color to white
          color: 'grey',
        }
      }
    }
  };
}
