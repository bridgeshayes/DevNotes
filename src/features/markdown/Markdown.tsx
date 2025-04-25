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
} from '@mui/icons-material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownFile {
  id: number;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  projectId?: number;
}

const mockMarkdownFiles: MarkdownFile[] = [
  {
    id: 1,
    title: 'Project Setup Guide',
    content: `# Project Setup Guide

## Prerequisites
- Node.js 18+
- npm or yarn
- Git

## Installation Steps
1. Clone the repository
\`\`\`bash
git clone https://github.com/your-repo.git
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Start the development server
\`\`\`bash
npm run dev
\`\`\`

## Project Structure
- \`src/\`: Source code
- \`public/\`: Static assets
- \`docs/\`: Documentation
`,
    tags: ['documentation', 'setup', 'guide'],
    createdAt: '2024-03-10',
    updatedAt: '2024-03-10',
    projectId: 1,
  },
  {
    id: 2,
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
`,
    tags: ['api', 'documentation', 'typescript'],
    createdAt: '2024-03-09',
    updatedAt: '2024-03-09',
    projectId: 1,
  },
];

const Markdown = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<MarkdownFile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');

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

  const handleFileClick = (file: MarkdownFile) => {
    setSelectedFile(file);
    setEditContent(file.content);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (selectedFile) {
      // Here you would typically save to your backend
      const updatedFile = {
        ...selectedFile,
        content: editContent,
        updatedAt: new Date().toISOString(),
      };
      setSelectedFile(updatedFile);
      setIsEditing(false);
    }
  };

  const filteredFiles = mockMarkdownFiles
    .filter(file =>
      file.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(file =>
      selectedTags.length === 0 || file.tags.some(tag => selectedTags.includes(tag))
    );

  // Get unique tags from all files
  const allTags = Array.from(new Set(mockMarkdownFiles.flatMap(file => file.tags)));

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
          Markdown Files
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
              placeholder="Search markdown files..."
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
        {/* File List */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: 'calc(100vh - 300px)', overflow: 'auto' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Files
              </Typography>
              {filteredFiles.map(file => (
                <Card
                  key={file.id}
                  sx={{
                    mb: 2,
                    cursor: 'pointer',
                    bgcolor: selectedFile?.id === file.id ? 'action.selected' : 'background.paper',
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
                  onClick={() => handleFileClick(file)}
                >
                  <CardContent>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {file.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Last updated: {new Date(file.updatedAt).toLocaleDateString()}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
                      {file.tags.map(tag => (
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
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Editor/Viewer */}
        <Grid item xs={12} md={8}>
          <Card sx={{ height: 'calc(100vh - 300px)', overflow: 'auto' }}>
            <CardContent>
              {selectedFile ? (
                <>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      {selectedFile.title}
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
                        {selectedFile.content}
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
                  <Typography>Select a file to view or edit</Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
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

      {/* Add Markdown File FAB */}
      <Fab
        color="primary"
        aria-label="add markdown file"
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

export default Markdown; 