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
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Star as StarIcon,
  MoreVert as MoreVertIcon,
  Label as LabelIcon,
} from '@mui/icons-material';

interface Note {
  id: number;
  title: string;
  content: string;
  date: string;
  tags: string[];
  isPinned: boolean;
}

const mockNotes: Note[] = [
  {
    id: 1,
    title: 'React Hooks Best Practices',
    content: 'useEffect cleanup functions are crucial for preventing memory leaks...',
    date: '2024-03-10',
    tags: ['react', 'hooks', 'frontend'],
    isPinned: true,
  },
  {
    id: 2,
    title: 'GraphQL Schema Design',
    content: 'When designing GraphQL schemas, consider using interfaces for shared fields...',
    date: '2024-03-09',
    tags: ['graphql', 'api', 'backend'],
    isPinned: false,
  },
  {
    id: 3,
    title: 'CSS Grid Layout Tips',
    content: 'Use minmax() function for responsive grid columns without media queries...',
    date: '2024-03-08',
    tags: ['css', 'layout', 'frontend'],
    isPinned: true,
  },
  // Add more mock notes as needed
];

const Notes = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

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

  const filteredNotes = mockNotes
    .filter(note => 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(note => 
      selectedTags.length === 0 || 
      note.tags.some(tag => selectedTags.includes(tag))
    );

  const pinnedNotes = filteredNotes.filter(note => note.isPinned);
  const unpinnedNotes = filteredNotes.filter(note => !note.isPinned);

  // Get unique tags from all notes
  const allTags = Array.from(new Set(mockNotes.flatMap(note => note.tags)));

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
          My Notes
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
              placeholder="Search notes..."
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
      <Box sx={{ mb: 4, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {allTags.map(tag => (
          <Chip
            key={tag}
            label={tag}
            icon={<LabelIcon />}
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

      {/* Pinned Notes Section */}
      {pinnedNotes.length > 0 && (
        <>
          <Typography variant="subtitle1" sx={{ mb: 2, color: 'text.secondary', fontWeight: 500 }}>
            Pinned Notes
          </Typography>
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {pinnedNotes.map(note => (
              <Grid item xs={12} sm={6} md={4} key={note.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    overflow: 'visible'
                  }}
                >
                  <CardContent sx={{ height: '100%', pt: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {note.title}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Pinned">
                          <IconButton size="small">
                            <StarIcon sx={{ color: 'warning.main' }} />
                          </IconButton>
                        </Tooltip>
                        <IconButton size="small">
                          <MoreVertIcon />
                        </IconButton>
                      </Box>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {note.content}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 'auto' }}>
                      {note.tags.map(tag => (
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
        </>
      )}

      {/* Other Notes Section */}
      {unpinnedNotes.length > 0 && (
        <>
          <Typography variant="subtitle1" sx={{ mb: 2, color: 'text.secondary', fontWeight: 500 }}>
            All Notes
          </Typography>
          <Grid container spacing={2}>
            {unpinnedNotes.map(note => (
              <Grid item xs={12} sm={6} md={4} key={note.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CardContent sx={{ height: '100%' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {note.title}
                      </Typography>
                      <IconButton size="small">
                        <MoreVertIcon />
                      </IconButton>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {note.content}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 'auto' }}>
                      {note.tags.map(tag => (
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
        </>
      )}

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

      {/* Add Note FAB */}
      <Fab
        color="primary"
        aria-label="add note"
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

export default Notes; 