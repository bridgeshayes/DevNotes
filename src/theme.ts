import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
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
      default: '#F0F7FF',
      paper: '#ffffff',
    },
    text: {
      primary: '#2A3950',
      secondary: '#566584',
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
          boxShadow: '0 4px 14px rgba(0, 182, 255, 0.25)',
          '&:hover': {
            background: 'linear-gradient(45deg, #00A1E6 0%, #E6437D 180%)',
            boxShadow: '0 6px 20px rgba(0, 182, 255, 0.35)',
            transform: 'translateY(-2px)',
          },
        },
        outlined: {
          borderWidth: '2px',
          borderColor: '#00B6FF',
          '&:hover': {
            borderWidth: '2px',
            background: 'rgba(0, 182, 255, 0.04)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          background: '#FFFFFF',
          boxShadow: '0 8px 24px rgba(0, 182, 255, 0.12)',
          transition: 'all 0.3s ease-in-out',
          border: '1px solid rgba(0, 182, 255, 0.08)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 20px 40px rgba(0, 182, 255, 0.2)',
            border: '1px solid rgba(0, 182, 255, 0.2)',
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
          boxShadow: '0 4px 20px rgba(0, 182, 255, 0.1)',
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderBottom: '1px solid rgba(0, 182, 255, 0.1)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: '1px solid rgba(0, 182, 255, 0.1)',
          background: 'linear-gradient(180deg, #F0F7FF 0%, #FFFFFF 100%)',
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
            backgroundColor: 'rgba(0, 182, 255, 0.06)',
            transform: 'translateX(4px)',
          },
          '&.Mui-selected': {
            backgroundColor: 'rgba(0, 182, 255, 0.1)',
            '&:hover': {
              backgroundColor: 'rgba(0, 182, 255, 0.15)',
            },
          },
        },
      },
    },
  },
});

export default theme; 