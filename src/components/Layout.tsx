import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
  Divider,
  Avatar,
  Tooltip,
  Badge,
  Chip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Note as NoteIcon,
  Code as CodeIcon,
  Folder as FolderIcon,
  Settings as SettingsIcon,
  GitHub as GitHubIcon,
  Notifications as NotificationsIcon,
  EmojiObjects as LightBulbIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
} from '@mui/icons-material';
import { useTheme as useAppTheme } from '../context/ThemeContext';

// Responsive drawer width
const drawerWidth = {
  xs: '100%',
  sm: 200,
  md: 240,
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useAppTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Notes', icon: <NoteIcon />, path: '/notes', badge: 3 },
    { text: 'Snippets', icon: <CodeIcon />, path: '/snippets', badge: 2 },
    { text: 'Projects', icon: <FolderIcon />, path: '/projects' },
  ];

  const bottomMenuItems = [
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
    { text: 'GitHub', icon: <GitHubIcon />, path: 'https://github.com' },
  ];

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Toolbar sx={{ px: { xs: 2, sm: 2 }, py: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar
            sx={{
              background: 'linear-gradient(135deg, #00B6FF 0%, #FF4B8C 100%)',
              width: { xs: 40, sm: 44 },
              height: { xs: 40, sm: 44 },
              boxShadow: '0 8px 16px rgba(0, 182, 255, 0.25)',
              border: '2px solid #FFFFFF',
            }}
          >
            D
          </Avatar>
          <Box>
            <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 700 }}>
              DevNotes
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
              Your coding companion
            </Typography>
          </Box>
        </Box>
      </Toolbar>
      <Box sx={{ px: { xs: 2, sm: 2 }, py: { xs: 1, sm: 1 } }}>
        <Chip
          icon={<LightBulbIcon />}
          label="Pro Tips Enabled"
          color="primary"
          sx={{ width: '100%' }}
        />
      </Box>
      <Divider sx={{ my: 1 }} />
      <List sx={{ flex: 1, px: { xs: 1, sm: 2 } }}>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => {
              navigate(item.path);
              if (isMobile) {
                setMobileOpen(false);
              }
            }}
            selected={location.pathname === item.path}
            sx={{
              borderRadius: 3,
              mb: 1,
              height: { xs: 44, sm: 48 },
              position: 'relative',
              overflow: 'visible',
              '&.Mui-selected': {
                background: 'linear-gradient(90deg, rgba(0, 182, 255, 0.12) 0%, rgba(255, 75, 140, 0.12) 100%)',
                color: theme.palette.primary.main,
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: -8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 4,
                  height: 24,
                  background: 'linear-gradient(180deg, #00B6FF 0%, #FF4B8C 100%)',
                  borderRadius: 4,
                },
                '&:hover': {
                  background: 'linear-gradient(90deg, rgba(0, 182, 255, 0.16) 0%, rgba(255, 75, 140, 0.16) 100%)',
                },
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: { xs: 36, sm: 40 },
                color: location.pathname === item.path ? theme.palette.primary.main : theme.palette.text.secondary,
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                fontWeight: location.pathname === item.path ? 600 : 400,
                fontSize: { xs: '0.9rem', sm: '1rem' },
              }}
            />
            {item.badge && (
              <Chip
                label={item.badge}
                size="small"
                color="secondary"
                sx={{
                  height: 20,
                  minWidth: 20,
                  borderRadius: '10px',
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                }}
              />
            )}
          </ListItem>
        ))}
      </List>
      <Divider sx={{ my: 1 }} />
      <List sx={{ px: { xs: 1, sm: 2 } }}>
        {bottomMenuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => {
              if (item.path.startsWith('http')) {
                window.open(item.path, '_blank');
              } else {
                navigate(item.path);
              }
              if (isMobile) {
                setMobileOpen(false);
              }
            }}
            sx={{
              borderRadius: 3,
              mb: 1,
              height: { xs: 44, sm: 48 },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: { xs: 36, sm: 40 },
                color: theme.palette.text.secondary,
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                color: theme.palette.text.secondary,
                fontSize: { xs: '0.9rem', sm: '1rem' },
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth.sm}px)`, md: `calc(100% - ${drawerWidth.md}px)` },
          ml: { sm: `${drawerWidth.sm}px`, md: `${drawerWidth.md}px` },
          backgroundColor: isDarkMode ? 'rgba(19, 47, 76, 0.9)' : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(12px)',
          color: isDarkMode ? '#E3F2FD' : '#2A3950',
          borderBottom: '1px solid',
          borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 182, 255, 0.1)',
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ minHeight: { xs: 56, sm: 64 } }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Typography 
              variant="h6" 
              noWrap 
              component="div" 
              sx={{ 
                fontWeight: 600,
                fontSize: { xs: '1.1rem', sm: '1.25rem' },
                color: isDarkMode ? '#E3F2FD' : '#2A3950',
                letterSpacing: '-0.02em',
              }}
            >
              {menuItems.find((item) => item.path === location.pathname)?.text || 'DevNotes'}
            </Typography>
            <Chip
              label={menuItems.find((item) => item.path === location.pathname)?.text || 'Home'}
              size="small"
              sx={{
                display: { xs: 'none', sm: 'flex' },
                background: isDarkMode 
                  ? 'rgba(255, 255, 255, 0.08)'
                  : 'rgba(0, 182, 255, 0.08)',
                color: isDarkMode ? '#E3F2FD' : '#2A3950',
                fontWeight: 500,
                fontSize: '0.75rem',
                height: 24,
                '& .MuiChip-label': {
                  px: 1,
                },
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
              <IconButton 
                color="inherit" 
                onClick={toggleTheme}
                sx={{ 
                  background: isDarkMode 
                    ? 'rgba(255, 255, 255, 0.08)'
                    : 'rgba(0, 182, 255, 0.08)',
                  '&:hover': {
                    background: isDarkMode 
                      ? 'rgba(255, 255, 255, 0.12)'
                      : 'rgba(0, 182, 255, 0.12)',
                  },
                  width: { xs: 36, sm: 40 },
                  height: { xs: 36, sm: 40 },
                }}
              >
                {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Notifications">
              <IconButton 
                color="inherit" 
                sx={{ 
                  background: isDarkMode 
                    ? 'rgba(255, 255, 255, 0.08)'
                    : 'rgba(0, 182, 255, 0.08)',
                  '&:hover': {
                    background: isDarkMode 
                      ? 'rgba(255, 255, 255, 0.12)'
                      : 'rgba(0, 182, 255, 0.12)',
                  },
                  width: { xs: 36, sm: 40 },
                  height: { xs: 36, sm: 40 },
                }}
              >
                <Badge 
                  badgeContent={3} 
                  color="secondary"
                  sx={{
                    '& .MuiBadge-badge': {
                      fontSize: { xs: '0.75rem', sm: '0.875rem' },
                      height: { xs: 16, sm: 20 },
                      minWidth: { xs: 16, sm: 20 },
                    }
                  }}
                >
                  <NotificationsIcon sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }} />
                </Badge>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth.sm, md: drawerWidth.md }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth.xs,
              borderRight: '1px solid',
              borderColor: 'rgba(0, 182, 255, 0.1)',
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: { sm: drawerWidth.sm, md: drawerWidth.md },
              borderRight: '1px solid',
              borderColor: 'rgba(0, 182, 255, 0.1)',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          width: { 
            xs: '100%',
            sm: `calc(100% - 40px)`, 
            md: `calc(100% - 40px)` 
          },
          ml: { sm: '40px', md: '40px' },
          mt: { xs: '56px', sm: '64px' },
          height: `calc(100vh - ${isMobile ? '56px' : '64px'})`,
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          '& > *': {
            width: '100%',
            flex: 1,
            display: 'flex',
            flexDirection: 'column'
          }
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout; 