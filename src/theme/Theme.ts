import { PaletteMode } from '@mui/material';


import { overridesButton } from './overridesButton';
import { overridesButtonBase } from './overridesButtonBase';




const Theme = (direction: 'ltr' | 'rtl' | 'auto', mode: PaletteMode) => ({
    direction,
    palette: {
        mode,
        ...(mode === 'dark'
            ? {
                  primary: {
                      main: '#BB9553',
                      light: '#e2b680',
                      contrastText: '#ffffff',
                      dark: '#8a6b3c',
                  },

                  secondary: {
                      main: '#6366F1',
                      light: '#9395FF',
                      contrastText: '#ffffff',
                      dark: '#3C40B2',
                  },
                  background: {
                      default: '#18191A',
                      paper: '#1C1C1C',
                      image: '#18191A',
                      dark: '#1C2536',
                  },
                  divider: '#ffffff30',
                  success: {
                      main: '#88a724',
                      light: '#a8aa09',
                      contrastText: '#ffffff',
                      dark: '#98a918',
                  },
                  action: {
                      hoverOpacity: 0.16,
                  },
                  text: {
                      primary: '#ffffff',
                      secondary: '#ffffff80',
                      disabled: '#ffffff30',
                  },
              }
            : {
                  primary: {
                      main: '#BB9553',
                      light: '#e2b680',
                      contrastText: '#ffffff',
                      dark: '#8a6b3c',
                  },

                  secondary: {
                      main: '#6366F1',
                      light: '#9395FF',
                      contrastText: '#ffffff',
                      dark: '#3C40B2',
                  },
                  background: {
                      default: '#fff',
                      paper: '#fff',
                      image: '#ffffff',
                      dark: '#1C2536',
                  },
                  divider: '#00000015',
                  success: {
                      main: '#9fb020',
                      light: '#819e16',
                      dark: '#6a8012',
                      contrastText: '#ffffff',
                  },
                  action: {
                      hoverOpacity: 0.12,
                  },
                  text: {
                      primary: '#0F0F10',
                      secondary: '#03031755',
                      disabled: '#03031735',
                  },
              }),
    },

    typography: {
        fontFamily: 'inherit',
        fontWeightBold: 600,
        h1: {
            fontSize: '2.8rem',
            lineHeight: 1.22,
            fontWeight: 700,
            fontVariationSettings: "'wght' 660",
        },
        h2: {
            fontSize: '2.5rem',
            lineHeight: 1.35,
            fontWeight: 700,
            fontVariationSettings: "'wght' 630",
        },
        h3: {
            fontSize: '2.2rem',
            lineHeight: 1.55,
            fontWeight: 700,
            fontVariationSettings: "'wght' 660",
        },
        h4: {
            fontSize: '1.8rem',
            lineHeight: 1.55,
            fontWeight: 550,
            fontVariationSettings: "'wght' 550",
        },
        h5: {
            fontSize: '1.7rem',
            lineHeight: 1.55,
            fontWeight: 450,
            fontVariationSettings: "'wght' 650",
        },
        h6: {
            fontSize: '1.6rem',
            lineHeight: 1.8,
            fontWeight: 550,
            fontVariationSettings: "'wght' 510",
        },
        subtitle1: {
            fontSize: '1.4rem',
            lineHeight: 1.7,
            fontWeight: 450,
            fontVariationSettings: "'wght' 460",
        },
        subtitle2: {
            fontSize: '1.2rem',
            lineHeight: 1.7,
            fontWeight: 500,
            fontVariationSettings: "'wght' 520",
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.7,
        },
        body2: {
            fontSize: '0.9rem',
            lineHeight: 1.7,
        },
        caption: {
            fontSize: '0.7rem',
            lineHeight: 1.3,
        },
        button: {
            fontSize: 'inherit',
            fontWeight: 'inherit',
        },
        overline: {
            fontSize: 12,
            lineHeight: 1.2,
            fontWeight: 500,
            letterSpacing: 1,
            textTransform: 'uppercase',
        },
    },

    components: {
    
        ...overridesButton(),
        ...overridesButtonBase(),


        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: '10px',
                    Paper: mode === 'dark' ? '#000' : '#E9E9E9',
                    backgroundColor: mode === 'dark' ? '#1C2536' : '#FFFFFF',
                },
            },
        },

        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    backgroundColor: '#f5f5f9',
                    color: 'rgba(0, 0, 0, 0.87)',
                    maxWidth: 220,
                    border: '1px solid #dadde9',
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    ...(direction === 'rtl' && {
                        transformOrigin: 'right',
                        left: 'inherit',
                        right: '2rem',
                        fontSize: 'small',
                        fontWeight: 400,
                        overflow: 'unset',
                    }),
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                notchedOutline: {
                    textAlign: 'start',
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                indicator: {
                    right: 'auto',
                    insetInlineEnd: '0px !important',
                    width: 3,
                    borderStartStartRadius: 10,
                    borderEndStartRadius: 10,
                },
            },
        },
        MuiListItem: {
            styleOverrides: {
                root: {
                    borderTopRightRadius: 20,
                    borderBottomRightRadius: 20,
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                },
            },
        },
    },
});

export default Theme;
