import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActionArea,
  Grid,
  LinearProgress,
  Avatar,
  AvatarGroup,
  Chip,
  alpha,
  useTheme,
} from '@mui/material';
import {
  Add as AddIcon,
  Description as DescriptionIcon,
  Code as CodeIcon,
  Folder as FolderIcon,
} from '@mui/icons-material';
import { RootState } from '../../store';

const Dashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  
  const notes = useSelector((state: RootState) => state.notes.notes);
  const snippets = useSelector((state: RootState) => state.snippets.snippets);
  const projects = useSelector((state: RootState) => state.projects.projects);

  // Get recent items
  const recentNotes = [...notes]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  const recentSnippets = [...snippets]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  const recentProjects = [...projects]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ 
        p: 3, 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: 1,
        borderColor: 'divider'
      }}>
        <Typography variant="h4" fontWeight="bold">
          Dashboard
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/notes/new')}
        >
          New Note
        </Button>
      </Box>

      {/* Content */}
      <Box sx={{ flex: 1, p: 3, overflow: 'auto' }}>
        <Grid container spacing={3}>
          {/* Notes Section */}
          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ height: '100%' }}>
              <CardHeader
                avatar={<DescriptionIcon color="primary" />}
                title={
                  <Typography variant="h6" fontWeight="bold">
                    Recent Notes
                  </Typography>
                }
                action={
                  <Button
                    endIcon={<AddIcon />}
                    onClick={() => navigate('/notes')}
                  >
                    View All
                  </Button>
                }
              />
              <CardContent sx={{ pt: 0 }}>
                {recentNotes.map((note) => (
                  <Card 
                    key={note.id} 
                    variant="outlined"
                    sx={{ 
                      mb: 2,
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.05),
                      },
                      '&:last-child': {
                        mb: 0
                      }
                    }}
                  >
                    <CardActionArea onClick={() => navigate(`/notes/${note.id}`)}>
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="subtitle1" fontWeight="medium">
                            {note.title}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {new Date(note.updatedAt).toLocaleDateString()}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {note.content}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          {note.tags?.map(tag => (
                            <Chip 
                              key={tag} 
                              label={tag} 
                              size="small"
                              sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}
                            />
                          ))}
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </Grid>

          {/* Snippets Section */}
          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ height: '100%' }}>
              <CardHeader
                avatar={<CodeIcon color="primary" />}
                title={
                  <Typography variant="h6" fontWeight="bold">
                    Recent Snippets
                  </Typography>
                }
                action={
                  <Button
                    endIcon={<AddIcon />}
                    onClick={() => navigate('/snippets')}
                  >
                    View All
                  </Button>
                }
              />
              <CardContent sx={{ pt: 0 }}>
                {recentSnippets.map((snippet) => (
                  <Card 
                    key={snippet.id} 
                    variant="outlined"
                    sx={{ 
                      mb: 2,
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.05),
                      },
                      '&:last-child': {
                        mb: 0
                      }
                    }}
                  >
                    <CardActionArea onClick={() => navigate(`/snippets/${snippet.id}`)}>
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="subtitle1" fontWeight="medium">
                            {snippet.title}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {snippet.language}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {snippet.description}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          {snippet.tags?.map(tag => (
                            <Chip 
                              key={tag} 
                              label={tag} 
                              size="small"
                              sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}
                            />
                          ))}
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </Grid>

          {/* Projects Section */}
          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ height: '100%' }}>
              <CardHeader
                avatar={<FolderIcon color="primary" />}
                title={
                  <Typography variant="h6" fontWeight="bold">
                    Active Projects
                  </Typography>
                }
                action={
                  <Button
                    endIcon={<AddIcon />}
                    onClick={() => navigate('/projects')}
                  >
                    View All
                  </Button>
                }
              />
              <CardContent sx={{ pt: 0 }}>
                {recentProjects.map((project) => (
                  <Card 
                    key={project.id} 
                    variant="outlined"
                    sx={{ 
                      mb: 2,
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.05),
                      },
                      '&:last-child': {
                        mb: 0
                      }
                    }}
                  >
                    <CardActionArea onClick={() => navigate(`/projects/${project.id}`)}>
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="subtitle1" fontWeight="medium">
                            {project.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Due {new Date(project.dueDate).toLocaleDateString()}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {project.description}
                        </Typography>
                        <Box sx={{ mb: 2 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                            <Typography variant="caption" color="text.secondary">
                              Progress
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {project.progress}%
                            </Typography>
                          </Box>
                          <LinearProgress 
                            variant="determinate" 
                            value={project.progress}
                            sx={{
                              height: 6,
                              borderRadius: 3,
                              bgcolor: alpha(theme.palette.primary.main, 0.1),
                              '& .MuiLinearProgress-bar': {
                                borderRadius: 3,
                              }
                            }}
                          />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <AvatarGroup max={3}>
                            {project.team?.map(member => (
                              <Avatar 
                                key={member.id} 
                                src={member.avatar}
                                alt={member.name}
                                sx={{ width: 32, height: 32 }}
                              />
                            ))}
                          </AvatarGroup>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard; 