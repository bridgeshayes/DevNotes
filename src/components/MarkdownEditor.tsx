import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  TextField,
  Typography,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
  Divider,
} from '@mui/material';
import {
  Save as SaveIcon,
  ContentCopy as CopyIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownEditorProps {
  content: string;
  onSave: (content: string) => void;
  title?: string;
  onTitleChange?: (title: string) => void;
}

const MarkdownEditor = ({ content, onSave, title, onTitleChange }: MarkdownEditorProps) => {
  const [editedContent, setEditedContent] = useState(content);
  const [editedTitle, setEditedTitle] = useState(title || '');
  const [isPreview, setIsPreview] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    setEditedContent(content);
  }, [content]);

  useEffect(() => {
    setEditedTitle(title || '');
  }, [title]);

  const handleSave = () => {
    onSave(editedContent);
    if (onTitleChange) {
      onTitleChange(editedTitle);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(editedContent);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        {onTitleChange ? (
          <TextField
            fullWidth
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder="Note Title"
            variant="standard"
            sx={{
              '& .MuiInputBase-input': {
                fontSize: '1.25rem',
                fontWeight: 600,
              },
            }}
          />
        ) : (
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
        )}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Copy Content">
            <IconButton onClick={handleCopy} size="small">
              <CopyIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={isPreview ? "Edit Mode" : "Preview Mode"}>
            <IconButton onClick={() => setIsPreview(!isPreview)} size="small">
              {isPreview ? <EditIcon /> : <ViewIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Save Changes">
            <IconButton onClick={handleSave} size="small" color="primary">
              <SaveIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {(!isPreview || !isMobile) && (
          <Box
            sx={{
              flex: 1,
              p: 2,
              overflow: 'auto',
              borderRight: isPreview ? '1px solid' : 'none',
              borderColor: 'divider',
            }}
          >
            <TextField
              fullWidth
              multiline
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              variant="outlined"
              placeholder="Write your markdown here..."
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: '100%',
                  '& textarea': {
                    height: '100% !important',
                    fontFamily: 'monospace',
                    fontSize: '0.875rem',
                    lineHeight: 1.7,
                  },
                },
              }}
            />
          </Box>
        )}
        {isPreview && (
          <Box
            sx={{
              flex: 1,
              p: 2,
              overflow: 'auto',
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 2,
                height: '100%',
                overflow: 'auto',
                backgroundColor: 'transparent',
              }}
            >
              <ReactMarkdown
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
                {editedContent}
              </ReactMarkdown>
            </Paper>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MarkdownEditor; 