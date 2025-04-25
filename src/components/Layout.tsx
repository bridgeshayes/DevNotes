import { useState } from 'react';
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
} from '@mui/icons-material';

const drawerWidth = 280;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const location = useLocation();

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
    { text: 'GitHub', icon: <GitHubIcon />, path: 'https://github.com/yourusername/devnotes' },
  ];

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Toolbar sx={{ px: 2, py: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar
            sx={{
              background: 'linear-gradient(135deg, #00B6FF 0%, #FF4B8C 100%)',
              width: 44,
              height: 44,
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
      <Box sx={{ px: 2, py: 1 }}>
        <Chip
          icon={<LightBulbIcon />}
          label="Pro Tips Enabled"
          color="primary"
          sx={{ width: '100%' }}
        />
      </Box>
      <Divider sx={{ my: 1 }} />
      <List sx={{ flex: 1, px: 2 }}>
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
              height: 48,
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
                minWidth: 40,
                color: location.pathname === item.path ? theme.palette.primary.main : theme.palette.text.secondary,
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                fontWeight: location.pathname === item.path ? 600 : 400,
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
                }}
              />
            )}
          </ListItem>
        ))}
      </List>
      <Divider sx={{ my: 1 }} />
      <List sx={{ px: 2 }}>
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
              height: 48,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 40,
                color: theme.palette.text.secondary,
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                color: theme.palette.text.secondary,
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
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(12px)',
          color: 'text.primary',
          borderBottom: '1px solid',
          borderColor: 'rgba(0, 182, 255, 0.1)',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 600, flexGrow: 1 }}>
            {menuItems.find((item) => item.path === location.pathname)?.text || 'DevNotes'}
          </Typography>
          <Tooltip title="Notifications">
            <IconButton 
              color="inherit" 
              sx={{ 
                ml: 1,
                background: 'linear-gradient(135deg, rgba(0, 182, 255, 0.1) 0%, rgba(255, 75, 140, 0.1) 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, rgba(0, 182, 255, 0.2) 0%, rgba(255, 75, 140, 0.2) 100%)',
                }
              }}
            >
              <Badge badgeContent={3} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: '1px solid rgba(0, 182, 255, 0.1)',
              background: 'linear-gradient(180deg, #F0F7FF 0%, #FFFFFF 100%)',
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: '64px',
          backgroundColor: 'background.default',
          minHeight: 'calc(100vh - 64px)',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '240px',
            background: 'linear-gradient(180deg, rgba(0, 182, 255, 0.08) 0%, rgba(255, 75, 140, 0.08) 100%)',
            zIndex: -1,
          },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout; 