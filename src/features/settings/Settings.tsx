import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Switch,
  FormControlLabel,
  Divider,
  Button,
  TextField,
  Grid,
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';

const Settings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    updates: false,
  });

  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    bio: 'Full-stack developer passionate about creating amazing user experiences.',
  });

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleThemeChange = (event: any) => {
    setTheme(event.target.value);
  };

  const handleLanguageChange = (event: any) => {
    setLanguage(event.target.value);
  };

  const handleProfileEdit = () => {
    setIsEditingProfile(true);
  };

  const handleProfileSave = () => {
    setIsEditingProfile(false);
    // Save profile changes
  };

  const handleProfileCancel = () => {
    setIsEditingProfile(false);
    // Reset profile changes
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Typography variant="h4" sx={{ mb: 3, fontSize: { xs: '1.5rem', sm: '2rem' } }}>
        Settings
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Profile Settings
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    mr: 2,
                    background: 'linear-gradient(135deg, #00B6FF 0%, #FF4B8C 100%)',
                  }}
                >
                  {profile.name.charAt(0)}
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  {isEditingProfile ? (
                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                      <Button
                        variant="contained"
                        startIcon={<SaveIcon />}
                        onClick={handleProfileSave}
                      >
                        Save
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<CancelIcon />}
                        onClick={handleProfileCancel}
                      >
                        Cancel
                      </Button>
                    </Box>
                  ) : (
                    <Button
                      variant="outlined"
                      startIcon={<EditIcon />}
                      onClick={handleProfileEdit}
                    >
                      Edit Profile
                    </Button>
                  )}
                </Box>
              </Box>

              {isEditingProfile ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    fullWidth
                    label="Name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Bio"
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  />
                </Box>
              ) : (
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {profile.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {profile.email}
                  </Typography>
                  <Typography variant="body2">
                    {profile.bio}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Notifications
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Email Notifications"
                    secondary="Receive notifications via email"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={notifications.email}
                      onChange={() => handleNotificationChange('email')}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Push Notifications"
                    secondary="Receive push notifications"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={notifications.push}
                      onChange={() => handleNotificationChange('push')}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Product Updates"
                    secondary="Receive updates about new features"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={notifications.updates}
                      onChange={() => handleNotificationChange('updates')}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Appearance
              </Typography>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Theme</InputLabel>
                <Select
                  value={theme}
                  label="Theme"
                  onChange={handleThemeChange}
                >
                  <MenuItem value="light">Light</MenuItem>
                  <MenuItem value="dark">Dark</MenuItem>
                  <MenuItem value="system">System</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Language</InputLabel>
                <Select
                  value={language}
                  label="Language"
                  onChange={handleLanguageChange}
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="es">Spanish</MenuItem>
                  <MenuItem value="fr">French</MenuItem>
                  <MenuItem value="de">German</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Account
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Change Password"
                    secondary="Update your password"
                  />
                  <ListItemSecondaryAction>
                    <Button variant="outlined" size="small">
                      Change
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Two-Factor Authentication"
                    secondary="Add an extra layer of security"
                  />
                  <ListItemSecondaryAction>
                    <Switch edge="end" />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Delete Account"
                    secondary="Permanently delete your account"
                  />
                  <ListItemSecondaryAction>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings; 