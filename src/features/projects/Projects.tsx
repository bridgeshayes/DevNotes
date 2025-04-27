import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  InputBase,
  Chip,
  Tooltip,
  Fab,
  Menu,
  MenuItem,
  alpha,
  Avatar,
  AvatarGroup,
  LinearProgress,
  Grid,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Star as StarIcon,
  MoreVert as MoreVertIcon,
  Schedule as ScheduleIcon,
  Group as TeamIcon,
  Folder as FolderIcon,
} from '@mui/icons-material';

interface Project {
  id: number;
  name: string;
  description: string;
  status: 'In Progress' | 'Completed' | 'Planning';
  progress: number;
  team: { id: number; name: string; avatar: string }[];
  tags: string[];
  dueDate: string;
  isStarred: boolean;
}

const statusColors = {
  'In Progress': '#00B6FF',
  'Completed': '#34C759',
  'Planning': '#FFB802',
};

// Mock data
const mockProjects: Project[] = [
  {
    id: 1,
    name: 'E-commerce Platform',
    description: 'Building a modern e-commerce platform with React and Node.js',
    status: 'In Progress',
    progress: 65,
    team: [
      { id: 1, name: 'Alex', avatar: '/avatars/alex.jpg' },
      { id: 2, name: 'Sarah', avatar: '/avatars/sarah.jpg' },
      { id: 3, name: 'Mike', avatar: '/avatars/mike.jpg' },
    ],
    tags: ['react', 'nodejs', 'mongodb'],
    dueDate: '2024-04-15',
    isStarred: true,
  },
  {
    id: 2,
    name: 'Mobile App Redesign',
    description: 'Redesigning the mobile app UI/UX for better user engagement',
    status: 'Planning',
    progress: 25,
    team: [
      { id: 4, name: 'Emma', avatar: '/avatars/emma.jpg' },
      { id: 5, name: 'John', avatar: '/avatars/john.jpg' },
    ],
    tags: ['ui/ux', 'mobile', 'design'],
    dueDate: '2024-05-01',
    isStarred: false,
  },
  {
    id: 3,
    name: 'API Integration',
    description: 'Integrating third-party APIs for enhanced functionality',
    status: 'Completed',
    progress: 100,
    team: [
      { id: 6, name: 'David', avatar: '/avatars/david.jpg' },
      { id: 7, name: 'Lisa', avatar: '/avatars/lisa.jpg' },
    ],
    tags: ['api', 'backend', 'documentation'],
    dueDate: '2024-03-30',
    isStarred: true,
  },
];

const Projects = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleTagClick = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleStatusClick = (status: string) => {
    setSelectedStatus(prev =>
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  };

  const handleProjectClick = (project: Project) => {
    navigate(`/projects/${project.id}`, { state: { project } });
  };

  const filteredProjects = mockProjects
    .filter(project => 
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(project => 
      selectedTags.length === 0 || 
      project.tags.some(tag => selectedTags.includes(tag))
    )
    .filter(project =>
      selectedStatus.length === 0 ||
      selectedStatus.includes(project.status)
    );

  // Get unique tags and statuses from all projects
  const allTags = Array.from(new Set(mockProjects.flatMap(project => project.tags)));
  const allStatuses = Array.from(new Set(mockProjects.map(project => project.status)));

  return (
    <Box sx={{ height: '100%', position: 'relative' }}>
      {/* Header Section */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 4,
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Projects
        </Typography>
        
        {/* Search and Filter Bar */}
        <Box sx={{ 
          display: 'flex', 
          gap: 2,
          flex: 1,
          maxWidth: 600,
          background: theme => alpha(theme.palette.primary.main, 0.04),
          borderRadius: 3,
          p: 1,
        }}>
          <Box sx={{ 
            display: 'flex',
            alignItems: 'center',
            flex: 1,
            gap: 1,
          }}>
            <SearchIcon sx={{ color: 'text.secondary' }} />
            <InputBase
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ flex: 1 }}
            />
          </Box>
          <Tooltip title="Filter">
            <IconButton
              onClick={handleMenuOpen}
              sx={{
                background: theme => anchorEl ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                '&:hover': {
                  background: theme => alpha(theme.palette.primary.main, 0.1),
                },
              }}
            >
              <FilterIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Status Filters */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary', fontWeight: 500 }}>
          Status
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {allStatuses.map(status => (
            <Chip
              key={status}
              label={status}
              icon={<ScheduleIcon />}
              onClick={() => handleStatusClick(status)}
              color={selectedStatus.includes(status) ? 'primary' : 'default'}
              sx={{
                borderRadius: 2,
                bgcolor: selectedStatus.includes(status) 
                  ? alpha(statusColors[status], 0.1)
                  : 'transparent',
                color: selectedStatus.includes(status) ? statusColors[status] : 'inherit',
                '& .MuiChip-icon': {
                  color: selectedStatus.includes(status) ? statusColors[status] : 'text.secondary',
                },
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Tags Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary', fontWeight: 500 }}>
          Tags
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {allTags.map(tag => (
            <Chip
              key={tag}
              label={tag}
              icon={<FolderIcon />}
              onClick={() => handleTagClick(tag)}
              color={selectedTags.includes(tag) ? 'primary' : 'default'}
              sx={{
                borderRadius: 2,
                '& .MuiChip-icon': {
                  color: selectedTags.includes(tag) ? 'inherit' : 'text.secondary',
                },
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Projects Grid */}
      <Grid container spacing={3}>
        {filteredProjects.map(project => (
          <Grid item xs={12} sm={6} md={4} key={project.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
              onClick={() => handleProjectClick(project)}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {project.name}
                  </Typography>
                  <IconButton size="small">
                    <StarIcon sx={{ color: project.isStarred ? 'warning.main' : 'text.secondary' }} />
                  </IconButton>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {project.description}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
                    Progress
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={project.progress} 
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: alpha(statusColors[project.status], 0.1),
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 3,
                        backgroundColor: statusColors[project.status],
                      },
                    }}
                  />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 24, height: 24 } }}>
                    {project.team.map(member => (
                      <Avatar key={member.id} src={member.avatar} alt={member.name} />
                    ))}
                  </AvatarGroup>
                  <Typography variant="caption" color="text.secondary">
                    Due {new Date(project.dueDate).toLocaleDateString()}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Filter Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            borderRadius: 2,
            minWidth: 180,
          },
        }}
      >
        <MenuItem onClick={handleMenuClose}>Most Recent</MenuItem>
        <MenuItem onClick={handleMenuClose}>Oldest First</MenuItem>
        <MenuItem onClick={handleMenuClose}>Alphabetical</MenuItem>
      </Menu>

      {/* Add Project FAB */}
      <Fab
        color="primary"
        aria-label="add project"
        onClick={() => navigate('/projects/new')}
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          background: 'linear-gradient(45deg, #00B6FF 0%, #FF4B8C 180%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #00A1E6 0%, #E6437D 180%)',
          },
        }}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default Projects; 