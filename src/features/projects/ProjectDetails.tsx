import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
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
  Button,
  TextField,
  Avatar,
  AvatarGroup,
  LinearProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  ContentCopy as CopyIcon,
  MoreVert as MoreVertIcon,
  Save as SaveIcon,
  Edit as EditIcon,
  Visibility as ViewIcon,
  Star as StarIcon,
  Group as TeamIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useNavigate, useParams } from 'react-router-dom';
import MarkdownEditor from '../../components/MarkdownEditor';

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

// Mock data for projects
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
    notes: [
      {
        id: 1,
        title: 'API Design Decisions',
        content: `# API Design Decisions

## Architecture Overview
We've decided to use a RESTful API architecture for the following reasons:
- Better caching capabilities
- Simpler implementation
- Easier to maintain and scale
- Better tooling support

## Authentication
Using JWT tokens for authentication with the following structure:
\`\`\`typescript
interface AuthResponse {
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
  };
}
\`\`\`

## Key Endpoints
1. \`/api/products\`
   - GET: List all products
   - POST: Create new product
   - GET /:id: Get product details
   - PUT /:id: Update product
   - DELETE /:id: Delete product

2. \`/api/orders\`
   - GET: List user orders
   - POST: Create new order
   - GET /:id: Get order details

## Error Handling
All errors follow this format:
\`\`\`json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message"
  }
}
\`\`\`

## Next Steps
- [ ] Implement rate limiting
- [ ] Add request validation
- [ ] Set up API documentation
- [ ] Add monitoring and logging`,
        createdAt: '2024-03-10',
        updatedAt: '2024-03-10',
      },
      {
        id: 2,
        title: 'Database Schema',
        content: `# Database Schema Design

## Products Collection
\`\`\`typescript
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}
\`\`\`

## Orders Collection
\`\`\`typescript
interface Order {
  id: string;
  userId: string;
  products: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
\`\`\`

## Indexes
- Products: name, category
- Orders: userId, status, createdAt

## Relationships
- Orders reference Products through productId
- Orders reference Users through userId`,
        createdAt: '2024-03-09',
        updatedAt: '2024-03-09',
      },
      {
        id: 3,
        title: 'Frontend Architecture',
        content: `# Frontend Architecture

## Tech Stack
- React 18
- TypeScript
- Material-UI
- Redux Toolkit
- React Query

## Project Structure
\`\`\`
src/
  ├── components/     # Reusable components
  ├── features/       # Feature-based modules
  ├── hooks/         # Custom hooks
  ├── services/      # API services
  ├── store/         # Redux store
  ├── types/         # TypeScript types
  └── utils/         # Utility functions
\`\`\`

## Key Features
1. Product Catalog
   - Grid/List view
   - Filtering and sorting
   - Search functionality
   - Pagination

2. Shopping Cart
   - Add/Remove items
   - Update quantities
   - Save for later
   - Price calculations

3. Checkout Process
   - Address form
   - Payment integration
   - Order summary
   - Confirmation

## State Management
- Redux for global state
- React Query for server state
- Local storage for persistence

## Performance Considerations
- Code splitting
- Lazy loading
- Image optimization
- Caching strategies`,
        createdAt: '2024-03-08',
        updatedAt: '2024-03-08',
      },
    ],
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
    notes: [
      {
        id: 1,
        title: 'Design System',
        content: `# Design System

## Color Palette
- Primary: #00B6FF
- Secondary: #FF4B8C
- Background: #FFFFFF
- Text: #1A1A1A
- Accent: #34C759

## Typography
- Heading 1: 32px, Bold
- Heading 2: 24px, Bold
- Heading 3: 20px, Semi-bold
- Body: 16px, Regular
- Caption: 14px, Regular

## Components
1. Buttons
   - Primary
   - Secondary
   - Text
   - Icon

2. Cards
   - Basic
   - Interactive
   - Elevated

3. Inputs
   - Text fields
   - Dropdowns
   - Checkboxes
   - Radio buttons

## Spacing
- 4px base unit
- 8px, 16px, 24px, 32px, 48px

## Icons
- Material Design icons
- Custom illustrations
- 24x24px standard size`,
        createdAt: '2024-03-10',
        updatedAt: '2024-03-10',
      },
      {
        id: 2,
        title: 'User Research Findings',
        content: `# User Research Findings

## Key Insights
1. Navigation
   - Users prefer bottom navigation
   - Quick access to main features
   - Clear visual hierarchy

2. Content
   - Shorter is better
   - Visual content preferred
   - Progressive disclosure

3. Interactions
   - Swipe gestures
   - Pull to refresh
   - Double tap to like

## Pain Points
1. Current App
   - Complex navigation
   - Slow loading times
   - Unclear CTAs
   - Inconsistent design

2. User Goals
   - Quick access to information
   - Easy sharing
   - Seamless checkout
   - Social features

## Recommendations
- Simplify navigation
- Improve performance
- Enhance visual hierarchy
- Add gesture controls
- Implement dark mode`,
        createdAt: '2024-03-09',
        updatedAt: '2024-03-09',
      },
    ],
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
    notes: [
      {
        id: 1,
        title: 'API Documentation',
        content: `# API Documentation

## Authentication
All API requests require authentication using JWT tokens.

\`\`\`typescript
interface AuthResponse {
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
  };
}
\`\`\`

## Endpoints
### GET /api/users
Returns a list of users.

### POST /api/users
Creates a new user.

## Error Handling
All errors follow this format:
\`\`\`json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message"
  }
}
\`\`\`

## Rate Limiting
- 100 requests per minute
- 1000 requests per hour

## Best Practices
1. Always include error handling
2. Use proper HTTP methods
3. Validate input data
4. Cache when possible
5. Monitor usage`,
        createdAt: '2024-03-10',
        updatedAt: '2024-03-10',
      },
      {
        id: 2,
        title: 'Integration Checklist',
        content: `# Integration Checklist

## Setup
- [x] API keys obtained
- [x] Development environment configured
- [x] Test environment ready
- [x] Documentation reviewed

## Implementation
- [x] Authentication flow
- [x] User management
- [x] Data synchronization
- [x] Error handling
- [x] Rate limiting
- [x] Caching

## Testing
- [x] Unit tests
- [x] Integration tests
- [x] Load testing
- [x] Security testing

## Deployment
- [x] Staging deployment
- [x] Production deployment
- [x] Monitoring setup
- [x] Backup configuration

## Documentation
- [x] API documentation
- [x] Integration guide
- [x] Troubleshooting guide
- [x] Maintenance procedures`,
        createdAt: '2024-03-09',
        updatedAt: '2024-03-09',
      },
    ],
  },
];

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | undefined>(
    mockProjects.find((p) => p.id === Number(id))
  );
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedNote, setSelectedNote] = useState<Project['notes'][0] | null>(null);
  const [isCreatingNote, setIsCreatingNote] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');

  if (!project) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Project not found</Typography>
      </Box>
    );
  }

  const handleTagClick = (tag: string) => {
    // Handle tag click
  };

  const handleNoteClick = (note: Project['notes'][0]) => {
    navigate(`/notes/${note.id}`, { state: { note } });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Save changes
  };

  const handleCreateNote = () => {
    setIsCreatingNote(true);
  };

  const handleSaveNewNote = () => {
    // Save new note
    setIsCreatingNote(false);
    setNewNoteTitle('');
    setNewNoteContent('');
  };

  const handleNoteSave = (content: string) => {
    if (selectedNote) {
      const updatedNote = {
        ...selectedNote,
        content,
        updatedAt: new Date().toISOString(),
      };
      setSelectedNote(updatedNote);
      // Here you would typically save to your backend
    }
  };

  const handleNoteTitleChange = (title: string) => {
    if (selectedNote) {
      const updatedNote = {
        ...selectedNote,
        title,
        updatedAt: new Date().toISOString(),
      };
      setSelectedNote(updatedNote);
      // Here you would typically save to your backend
    }
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton onClick={() => navigate('/projects')} sx={{ display: { xs: 'flex', sm: 'none' } }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' }, fontWeight: 600 }}>
          {project.title}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton
          onClick={() => setProject({ ...project, isStarred: !project.isStarred })}
          sx={{ color: project.isStarred ? 'warning.main' : 'inherit' }}
        >
          <StarIcon />
        </IconButton>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Chip
                  label={project.status}
                  sx={{
                    backgroundColor: alpha(statusColors[project.status], 0.1),
                    color: statusColors[project.status],
                    fontWeight: 600,
                  }}
                />
                <Box sx={{ flexGrow: 1 }} />
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={handleEdit}
                  sx={{ display: { xs: 'none', sm: 'flex' } }}
                >
                  Edit Project
                </Button>
                <IconButton onClick={handleEdit} sx={{ display: { xs: 'flex', sm: 'none' } }}>
                  <EditIcon />
                </IconButton>
              </Box>

              <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                {project.description}
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                  Progress
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={project.progress}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: alpha(statusColors[project.status], 0.1),
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: statusColors[project.status],
                    },
                  }}
                />
                <Typography variant="caption" sx={{ mt: 1, color: 'text.secondary' }}>
                  {project.progress}% Complete
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                  Team Members
                </Typography>
                <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
                  {project.team.map((member) => (
                    <Avatar key={member.name} src={member.avatar} alt={member.name} />
                  ))}
                </AvatarGroup>
              </Box>

              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                  Tags
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {project.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      onClick={() => handleTagClick(tag)}
                      sx={{ backgroundColor: alpha('#00B6FF', 0.1) }}
                    />
                  ))}
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Box sx={{ mb: 3, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'background.paper',
                borderRadius: 2,
                px: 2,
                py: 1,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
              <InputBase
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ flexGrow: 1 }}
              />
            </Box>
            <IconButton
              onClick={(e) => setFilterAnchorEl(e.currentTarget)}
              sx={{
                backgroundColor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <FilterIcon />
            </IconButton>
          </Box>

          <Grid container spacing={2}>
            {project.notes.map((note) => (
              <Grid item xs={12} sm={6} key={note.id}>
                <Card
                  sx={{
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                    },
                  }}
                  onClick={() => handleNoteClick(note)}
                >
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 1, fontSize: { xs: '1rem', sm: '1.1rem' } }}>
                      {note.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        mb: 2,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {note.content}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      Last updated: {new Date(note.updatedAt).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ position: { xs: 'fixed', sm: 'sticky' }, top: { xs: 'auto', sm: 88 }, bottom: { xs: 0, sm: 'auto' }, left: { xs: 0, sm: 'auto' }, right: { xs: 0, sm: 'auto' }, width: { xs: '100%', sm: 'auto' }, zIndex: 1000, borderRadius: { xs: '16px 16px 0 0', sm: 2 } }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                Project Details
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                  Due Date
                </Typography>
                <Typography variant="body1">
                  {new Date(project.dueDate).toLocaleDateString()}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                  Status
                </Typography>
                <Typography variant="body1" sx={{ color: statusColors[project.status] }}>
                  {project.status}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                  Team Size
                </Typography>
                <Typography variant="body1">{project.team.length} members</Typography>
              </Box>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleCreateNote}
                fullWidth
                sx={{ mt: 2 }}
              >
                Add Note
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Menu
        anchorEl={filterAnchorEl}
        open={Boolean(filterAnchorEl)}
        onClose={() => setFilterAnchorEl(null)}
      >
        <MenuItem>All Notes</MenuItem>
        <MenuItem>Recent</MenuItem>
        <MenuItem>Starred</MenuItem>
      </Menu>

      {selectedNote && (
        <Card sx={{ mt: 3, height: 'calc(100vh - 300px)' }}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {selectedNote.title}
            </Typography>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
              {selectedNote.content}
            </Typography>
          </Box>
        </Card>
      )}

      {isCreatingNote && (
        <Card sx={{ mt: 3, height: 'calc(100vh - 300px)' }}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              New Note
            </Typography>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
              Click on a note to edit it in the markdown editor.
            </Typography>
          </Box>
        </Card>
      )}
    </Box>
  );
};

export default ProjectDetails; 