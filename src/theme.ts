import { createTheme, ThemeOptions } from '@mui/material/styles';

const getThemeOptions = (mode: 'light' | 'dark'): ThemeOptions => ({
  palette: {
    mode,
    primary: {
      main: '#00B6FF',
      light: '#4DCFFF',
      dark: '#0091CC',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#FF4B8C',
      light: '#FF7DAD',
      dark: '#CC3C70',
      contrastText: '#ffffff',
    },
    background: {
      default: mode === 'light' ? '#F0F7FF' : '#0A1929',
      paper: mode === 'light' ? '#ffffff' : '#132F4C',
    },
    text: {
      primary: mode === 'light' ? '#2A3950' : '#E3F2FD',
      secondary: mode === 'light' ? '#566584' : '#B0BEC5',
    },
    error: {
      main: '#FF3B30',
    },
    warning: {
      main: '#FFB802',
    },
    success: {
      main: '#34C759',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 800,
      letterSpacing: '-0.025em',
      background: 'linear-gradient(90deg, #00B6FF 0%, #FF4B8C 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      letterSpacing: '-0.025em',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      letterSpacing: '-0.025em',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      letterSpacing: '-0.025em',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      letterSpacing: '-0.025em',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      letterSpacing: '-0.025em',
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      letterSpacing: '0.00938em',
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      letterSpacing: '0.00714em',
    },
    body1: {
      fontSize: '1rem',
      letterSpacing: '0.00938em',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      letterSpacing: '0.01071em',
      lineHeight: 1.43,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 20px',
          textTransform: 'none',
          fontWeight: 600,
          transition: 'all 0.2s ease-in-out',
        },
        contained: {
          background: 'linear-gradient(45deg, #00B6FF 0%, #FF4B8C 180%)',
          boxShadow: mode === 'light' 
            ? '0 4px 14px rgba(0, 182, 255, 0.25)'
            : '0 4px 14px rgba(0, 182, 255, 0.15)',
          '&:hover': {
            background: 'linear-gradient(45deg, #00A1E6 0%, #E6437D 180%)',
            boxShadow: mode === 'light'
              ? '0 6px 20px rgba(0, 182, 255, 0.35)'
              : '0 6px 20px rgba(0, 182, 255, 0.25)',
            transform: 'translateY(-2px)',
          },
        },
        outlined: {
          borderWidth: '2px',
          borderColor: '#00B6FF',
          '&:hover': {
            borderWidth: '2px',
            background: mode === 'light'
              ? 'rgba(0, 182, 255, 0.04)'
              : 'rgba(0, 182, 255, 0.08)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          background: mode === 'light' ? '#FFFFFF' : '#132F4C',
          boxShadow: mode === 'light'
            ? '0 8px 24px rgba(0, 182, 255, 0.12)'
            : '0 8px 24px rgba(0, 0, 0, 0.2)',
          transition: 'all 0.3s ease-in-out',
          border: mode === 'light'
            ? '1px solid rgba(0, 182, 255, 0.08)'
            : '1px solid rgba(255, 255, 255, 0.08)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: mode === 'light'
              ? '0 20px 40px rgba(0, 182, 255, 0.2)'
              : '0 20px 40px rgba(0, 0, 0, 0.3)',
            border: mode === 'light'
              ? '1px solid rgba(0, 182, 255, 0.2)'
              : '1px solid rgba(255, 255, 255, 0.12)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#00B6FF',
                borderWidth: '2px',
              },
            },
            '&.Mui-focused': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderWidth: '2px',
                borderColor: '#00B6FF',
              },
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
        filled: {
          background: 'linear-gradient(45deg, #00B6FF 0%, #FF4B8C 180%)',
          color: '#FFFFFF',
          '&:hover': {
            background: 'linear-gradient(45deg, #00A1E6 0%, #E6437D 180%)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: mode === 'light'
            ? '0 4px 20px rgba(0, 182, 255, 0.1)'
            : '0 4px 20px rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(12px)',
          backgroundColor: mode === 'light'
            ? 'rgba(255, 255, 255, 0.9)'
            : 'rgba(19, 47, 76, 0.9)',
          borderBottom: mode === 'light'
            ? '1px solid rgba(0, 182, 255, 0.1)'
            : '1px solid rgba(255, 255, 255, 0.08)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: mode === 'light'
            ? '1px solid rgba(0, 182, 255, 0.1)'
            : '1px solid rgba(255, 255, 255, 0.08)',
          background: mode === 'light'
            ? 'linear-gradient(180deg, #F0F7FF 0%, #FFFFFF 100%)'
            : 'linear-gradient(180deg, #0A1929 0%, #132F4C 100%)',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          marginBottom: '8px',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: mode === 'light'
              ? 'rgba(0, 182, 255, 0.06)'
              : 'rgba(255, 255, 255, 0.04)',
            transform: 'translateX(4px)',
          },
          '&.Mui-selected': {
            backgroundColor: mode === 'light'
              ? 'rgba(0, 182, 255, 0.1)'
              : 'rgba(255, 255, 255, 0.08)',
            '&:hover': {
              backgroundColor: mode === 'light'
                ? 'rgba(0, 182, 255, 0.15)'
                : 'rgba(255, 255, 255, 0.12)',
            },
          },
        },
      },
    },
  },
});

export const lightTheme = createTheme(getThemeOptions('light'));
export const darkTheme = createTheme(getThemeOptions('dark'));

export default lightTheme; 