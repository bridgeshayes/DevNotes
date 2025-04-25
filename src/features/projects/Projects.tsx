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
  title: string;
  description: string;
  status: 'In Progress' | 'Completed' | 'Planning';
  progress: number;
  team: { name: string; avatar: string }[];
  tags: string[];
  dueDate: string;
  isStarred: boolean;
  notes: {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
  }[];
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
    title: 'E-commerce Platform',
    description: 'Building a modern e-commerce platform with React and Node.js',
    status: 'In Progress',
    progress: 65,
    team: [
      { name: 'Alex', avatar: '/avatars/alex.jpg' },
      { name: 'Sarah', avatar: '/avatars/sarah.jpg' },
      { name: 'Mike', avatar: '/avatars/mike.jpg' },
    ],
    tags: ['react', 'nodejs', 'mongodb'],
    dueDate: '2024-04-15',
    isStarred: true,
    notes: [],
  },
  {
    id: 2,
    title: 'Mobile App Redesign',
    description: 'Redesigning the mobile app UI/UX for better user engagement',
    status: 'Planning',
    progress: 25,
    team: [
      { name: 'Emma', avatar: '/avatars/emma.jpg' },
      { name: 'John', avatar: '/avatars/john.jpg' },
    ],
    tags: ['ui/ux', 'mobile', 'design'],
    dueDate: '2024-05-01',
    isStarred: false,
    notes: [],
  },
  {
    id: 3,
    title: 'API Integration',
    description: 'Integrating third-party APIs for enhanced functionality',
    status: 'Completed',
    progress: 100,
    team: [
      { name: 'David', avatar: '/avatars/david.jpg' },
      { name: 'Lisa', avatar: '/avatars/lisa.jpg' },
      { name: 'Tom', avatar: '/avatars/tom.jpg' },
      { name: 'Anna', avatar: '/avatars/anna.jpg' },
    ],
    tags: ['api', 'backend', 'documentation'],
    dueDate: '2024-03-30',
    isStarred: true,
    notes: [],
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
    console.log('Navigating to project:', project.id);
    navigate(`/projects/${project.id}`);
  };

  const filteredProjects = mockProjects
    .filter(project =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(project =>
      selectedTags.length === 0 || project.tags.some(tag => selectedTags.includes(tag))
    )
    .filter(project =>
      selectedStatus.length === 0 || selectedStatus.includes(project.status)
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
      <Grid container spacing={2}>
        {filteredProjects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'visible',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 20px 40px rgba(0, 182, 255, 0.2)',
                },
              }}
              onClick={() => handleProjectClick(project)}
            >
              <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {project.title}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {project.isStarred && (
                      <Tooltip title="Starred Project">
                        <IconButton size="small">
                          <StarIcon sx={{ color: 'warning.main' }} />
                        </IconButton>
                      </Tooltip>
                    )}
                    <IconButton size="small">
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {project.description}
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
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
                      bgcolor: alpha(statusColors[project.status], 0.1),
                      '& .MuiLinearProgress-bar': {
                        bgcolor: statusColors[project.status],
                      },
                    }}
                  />
                </Box>

                <Box sx={{ mt: 'auto' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <TeamIcon sx={{ color: 'text.secondary', mr: 1, fontSize: 20 }} />
                      <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 24, height: 24, fontSize: '0.875rem' } }}>
                        {project.team.map((member, index) => (
                          <Tooltip key={index} title={member.name}>
                            <Avatar alt={member.name} src={member.avatar} />
                          </Tooltip>
                        ))}
                      </AvatarGroup>
                    </Box>
                    <Chip
                      label={project.status}
                      size="small"
                      sx={{
                        borderRadius: 1.5,
                        bgcolor: alpha(statusColors[project.status], 0.1),
                        color: statusColors[project.status],
                      }}
                    />
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {project.tags.map(tag => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        sx={{ borderRadius: 1.5 }}
                      />
                    ))}
                  </Box>
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
        <MenuItem onClick={handleMenuClose}>Progress (High to Low)</MenuItem>
        <MenuItem onClick={handleMenuClose}>Due Date</MenuItem>
      </Menu>

      {/* Add Project FAB */}
      <Fab
        color="primary"
        aria-label="add project"
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