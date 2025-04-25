import { useState } from 'react';
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
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedNote, setSelectedNote] = useState<Project['notes'][0] | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');
  const [isCreatingNote, setIsCreatingNote] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');

  // Find the project based on the ID from the URL
  const project = mockProjects.find(p => p.id === Number(id));

  if (!project) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" color="error">
          Project not found
        </Typography>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/projects')}
          sx={{ mt: 2 }}
        >
          Back to Projects
        </Button>
      </Box>
    );
  }

  const handleTagClick = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleNoteClick = (note: Project['notes'][0]) => {
    setSelectedNote(note);
    setEditContent(note.content);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (selectedNote) {
      // Here you would typically save to your backend
      const updatedNote = {
        ...selectedNote,
        content: editContent,
        updatedAt: new Date().toISOString(),
      };
      setSelectedNote(updatedNote);
      setIsEditing(false);
    }
  };

  const handleCreateNote = () => {
    setIsCreatingNote(true);
    setNewNoteTitle('');
    setEditContent('');
  };

  const handleSaveNewNote = () => {
    if (newNoteTitle.trim()) {
      // Here you would typically save to your backend
      const newNote = {
        id: Date.now(), // Temporary ID
        title: newNoteTitle,
        content: editContent,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setSelectedNote(newNote);
      setIsCreatingNote(false);
    }
  };

  const filteredNotes = project.notes
    .filter(note =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(note =>
      selectedTags.length === 0 || project.tags.some(tag => selectedTags.includes(tag))
    );

  // Get unique tags from project
  const allTags = Array.from(new Set(project.tags));

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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={() => navigate('/projects')}>
            <ArrowBackIcon />
          </IconButton>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {project.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {project.description}
            </Typography>
          </Box>
        </Box>
        
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
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ flex: 1 }}
            />
          </Box>
        </Box>
      </Box>

      {/* Project Info */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Project Details
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

          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {project.description}
          </Typography>

          <Box sx={{ mb: 3 }}>
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
        </CardContent>
      </Card>

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

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Notes List */}
        <Grid xs={12} md={4}>
          <Card sx={{ height: 'calc(100vh - 200px)', overflow: 'auto' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Notes
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleCreateNote}
                  size="small"
                >
                  New Note
                </Button>
              </Box>
              {filteredNotes.map(note => (
                <Card
                  key={note.id}
                  sx={{
                    mb: 2,
                    cursor: 'pointer',
                    bgcolor: selectedNote?.id === note.id ? 'action.selected' : 'background.paper',
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
                  onClick={() => handleNoteClick(note)}
                >
                  <CardContent>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {note.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Last updated: {new Date(note.updatedAt).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Editor/Viewer */}
        <Grid xs={12} md={8}>
          <Card sx={{ height: 'calc(100vh - 200px)', overflow: 'auto' }}>
            <CardContent>
              {isCreatingNote ? (
                <>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <TextField
                      placeholder="Note Title"
                      value={newNoteTitle}
                      onChange={(e) => setNewNoteTitle(e.target.value)}
                      variant="outlined"
                      fullWidth
                      sx={{ mr: 2 }}
                    />
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Tooltip title="Save">
                        <IconButton onClick={handleSaveNewNote}>
                          <SaveIcon />
                        </IconButton>
                      </Tooltip>
                      <IconButton onClick={() => setIsCreatingNote(false)}>
                        <MoreVertIcon />
                      </IconButton>
                    </Box>
                  </Box>
                  <TextField
                    fullWidth
                    multiline
                    rows={20}
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    variant="outlined"
                    placeholder="Write your note in markdown..."
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        fontFamily: 'monospace',
                      },
                    }}
                  />
                </>
              ) : selectedNote ? (
                <>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      {selectedNote.title}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {isEditing ? (
                        <Tooltip title="Save">
                          <IconButton onClick={handleSave}>
                            <SaveIcon />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        <Tooltip title="Edit">
                          <IconButton onClick={handleEdit}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                      <IconButton>
                        <MoreVertIcon />
                      </IconButton>
                    </Box>
                  </Box>
                  {isEditing ? (
                    <TextField
                      fullWidth
                      multiline
                      rows={20}
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          fontFamily: 'monospace',
                        },
                      }}
                    />
                  ) : (
                    <Box sx={{ 
                      '& pre': { 
                        backgroundColor: '#1E1E1E',
                        borderRadius: 1,
                        padding: 2,
                        overflow: 'auto',
                      },
                      '& code': {
                        fontFamily: 'monospace',
                      },
                    }}>
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '');
                            return !inline && match ? (
                              <SyntaxHighlighter
                                style={atomDark}
                                language={match[1]}
                                PreTag="div"
                                {...props}
                              >
                                {String(children).replace(/\n$/, '')}
                              </SyntaxHighlighter>
                            ) : (
                              <code className={className} {...props}>
                                {children}
                              </code>
                            );
                          },
                        }}
                      >
                        {selectedNote.content}
                      </ReactMarkdown>
                    </Box>
                  )}
                </>
              ) : (
                <Box sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: 'text.secondary',
                }}>
                  <Typography>Select a note to view or edit</Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProjectDetails; 