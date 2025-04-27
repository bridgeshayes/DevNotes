import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
  Paper,
  useTheme,
  alpha,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import MarkdownEditor from '../../components/MarkdownEditor';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Mock data - replace with actual API calls
const mockNotes = [
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
];

interface CodeProps {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

const NotesEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const [note, setNote] = useState(location.state?.note || mockNotes.find(n => n.id === Number(id)));
  const [isNewNote, setIsNewNote] = useState(!id);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (content: string) => {
    if (note) {
      const updatedNote = {
        ...note,
        content,
        updatedAt: new Date().toISOString(),
      };
      setNote(updatedNote);
      setIsEditing(false);
      // Here you would typically save to your backend
    }
  };

  const handleTitleChange = (title: string) => {
    if (note) {
      const updatedNote = {
        ...note,
        title,
        updatedAt: new Date().toISOString(),
      };
      setNote(updatedNote);
      // Here you would typically save to your backend
    }
  };

  const handleDelete = () => {
    // Here you would typically delete from your backend
    navigate('/notes');
  };

  return (
    <Box sx={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      marginBottom: '100px',
    }}>
      {/* Header */}
      <Box sx={{ 
        px: 3,
        py: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        borderBottom: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
        width: '80vw',
      }}>
        <IconButton 
          onClick={() => navigate(-1)}
          sx={{ 
            '&:hover': { 
              bgcolor: alpha(theme.palette.primary.main, 0.1) 
            } 
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" sx={{ fontWeight: 600, flex: 1 }}>
          {isNewNote ? 'New Note' : note?.title || 'Untitled Note'}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {!isNewNote && (
            <Button
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
              sx={{ mr: 1 }}
            >
              Delete
            </Button>
          )}
          <Button
            variant="contained"
            startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Save' : 'Edit'}
          </Button>
        </Box>
      </Box>

      {/* Content */}
      <Box sx={{ 
        flex: 1,
        display: 'flex',
        width: '100%',
        marginBottom: '100px',
      }}>
        {isEditing ? (
          <Box sx={{ 
            flex: 1,
            width: '100%',
            p: 3,
          }}>
            <MarkdownEditor
              content={note?.content || ''}
              onSave={handleSave}
              title={note?.title}
              onTitleChange={handleTitleChange}
            />
          </Box>
        ) : (
          <Paper 
            elevation={0} 
            sx={{ 
              flex: 1,
              width: '100%',
              p: 3,
              borderRadius: 0,
              marginBottom: '50px',
            }}
          >
            <Box sx={{ 
              width: '100%',
              '& > *': { // Target all direct children
                width: '100%',
                maxWidth: 'none',
              },
              '& pre': { // Target code blocks
                width: '100%',
                maxWidth: 'none',
                borderRadius: 1,
                mb: 2,
              },
            }}>
              <ReactMarkdown
                components={{
                  code({ inline, className, children, ...props }: CodeProps) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={atomDark as any}
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
                {note?.content || ''}
              </ReactMarkdown>
            </Box>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default NotesEditor; 