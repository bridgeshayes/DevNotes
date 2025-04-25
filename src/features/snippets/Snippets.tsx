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
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  ContentCopy as CopyIcon,
  MoreVert as MoreVertIcon,
  Code as CodeIcon,
  Language as LanguageIcon,
} from '@mui/icons-material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeSnippet {
  id: number;
  title: string;
  code: string;
  language: string;
  description: string;
  tags: string[];
  createdAt: string;
}

const mockSnippets: CodeSnippet[] = [
  {
    id: 1,
    title: 'React useEffect Cleanup',
    code: `useEffect(() => {
  const subscription = dataSource.subscribe();
  return () => {
    subscription.unsubscribe();
  };
}, [dataSource]);`,
    language: 'typescript',
    description: 'Pattern for cleaning up side effects in React components',
    tags: ['react', 'hooks', 'typescript'],
    createdAt: '2024-03-10',
  },
  {
    id: 2,
    title: 'Custom React Hook',
    code: `function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue] as const;
}`,
    language: 'typescript',
    description: 'Custom hook for managing localStorage state in React',
    tags: ['react', 'hooks', 'typescript', 'localStorage'],
    createdAt: '2024-03-09',
  },
  {
    id: 3,
    title: 'CSS Grid Layout',
    code: `.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  padding: 1rem;
}`,
    language: 'css',
    description: 'Responsive grid layout using CSS Grid',
    tags: ['css', 'layout', 'responsive'],
    createdAt: '2024-03-08',
  },
];

const languageColors: Record<string, string> = {
  typescript: '#007ACC',
  javascript: '#F7DF1E',
  python: '#3776AB',
  css: '#563D7C',
  html: '#E34F26',
};

const Snippets = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

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

  const handleLanguageClick = (language: string) => {
    setSelectedLanguages(prev =>
      prev.includes(language) ? prev.filter(l => l !== language) : [...prev, language]
    );
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    // You could add a toast notification here
  };

  const filteredSnippets = mockSnippets
    .filter(snippet =>
      snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.code.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(snippet =>
      selectedTags.length === 0 || snippet.tags.some(tag => selectedTags.includes(tag))
    )
    .filter(snippet =>
      selectedLanguages.length === 0 || selectedLanguages.includes(snippet.language)
    );

  // Get unique tags and languages from all snippets
  const allTags = Array.from(new Set(mockSnippets.flatMap(snippet => snippet.tags)));
  const allLanguages = Array.from(new Set(mockSnippets.map(snippet => snippet.language)));

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
          Code Snippets
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
              placeholder="Search snippets..."
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

      {/* Languages Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary', fontWeight: 500 }}>
          Languages
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {allLanguages.map(language => (
            <Chip
              key={language}
              label={language}
              icon={<LanguageIcon />}
              onClick={() => handleLanguageClick(language)}
              color={selectedLanguages.includes(language) ? 'primary' : 'default'}
              sx={{
                borderRadius: 2,
                bgcolor: selectedLanguages.includes(language) 
                  ? alpha(languageColors[language] || '#666', 0.1)
                  : 'transparent',
                borderColor: languageColors[language] || '#666',
                '& .MuiChip-icon': {
                  color: selectedLanguages.includes(language) 
                    ? languageColors[language] 
                    : 'text.secondary',
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
              icon={<CodeIcon />}
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

      {/* Snippets Grid */}
      <Grid container spacing={3}>
        {filteredSnippets.map(snippet => (
          <Grid item xs={12} key={snippet.id}>
            <Card
              sx={{
                position: 'relative',
                overflow: 'visible'
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      {snippet.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {snippet.description}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="Copy code">
                      <IconButton
                        size="small"
                        onClick={() => handleCopyCode(snippet.code)}
                        sx={{
                          background: theme => alpha(theme.palette.primary.main, 0.1),
                          '&:hover': {
                            background: theme => alpha(theme.palette.primary.main, 0.2),
                          },
                        }}
                      >
                        <CopyIcon />
                      </IconButton>
                    </Tooltip>
                    <IconButton size="small">
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                </Box>
                
                <Box
                  sx={{
                    position: 'relative',
                    borderRadius: 2,
                    overflow: 'hidden',
                    mb: 2,
                  }}
                >
                  <SyntaxHighlighter
                    language={snippet.language}
                    style={atomDark}
                    customStyle={{
                      margin: 0,
                      borderRadius: 8,
                      padding: '1rem',
                    }}
                  >
                    {snippet.code}
                  </SyntaxHighlighter>
                </Box>

                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip
                    label={snippet.language}
                    size="small"
                    sx={{
                      borderRadius: 1.5,
                      bgcolor: alpha(languageColors[snippet.language] || '#666', 0.1),
                      color: languageColors[snippet.language] || '#666',
                    }}
                  />
                  {snippet.tags.map(tag => (
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
        <MenuItem onClick={handleMenuClose}>Most Used</MenuItem>
      </Menu>

      {/* Add Snippet FAB */}
      <Fab
        color="primary"
        aria-label="add snippet"
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

export default Snippets; 