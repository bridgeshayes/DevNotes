import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Note } from '../notes/notesSlice';
import { Snippet } from '../snippets/snippetsSlice';
import { Project } from '../projects/projectsSlice';

const Dashboard = () => {
  const notes = useSelector((state: RootState) => state.notes.notes);
  const snippets = useSelector((state: RootState) => state.snippets.snippets);
  const projects = useSelector((state: RootState) => state.projects.projects);

  // Get 5 most recent items for each category
  const recentNotes = [...notes].sort((a, b) => 
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  ).slice(0, 5);

  const recentSnippets = [...snippets].sort((a, b) => 
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  ).slice(0, 5);

  const recentProjects = [...projects].sort((a, b) => 
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  ).slice(0, 5);

  const renderNoteCard = (note: Note) => (
    <Card key={note.id} sx={{ mb: 1 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {note.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {note.content}
        </Typography>
      </CardContent>
    </Card>
  );

  const renderSnippetCard = (snippet: Snippet) => (
    <Card key={snippet.id} sx={{ mb: 1 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {snippet.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {snippet.description}
        </Typography>
      </CardContent>
    </Card>
  );

  const renderProjectCard = (project: Project) => (
    <Card key={project.id} sx={{ mb: 1 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {project.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {project.description}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Welcome to DevNotes
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Recent Notes
              </Typography>
              {recentNotes.length > 0 ? (
                recentNotes.map(renderNoteCard)
              ) : (
                <Typography color="text.secondary">No recent notes</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Recent Snippets
              </Typography>
              {recentSnippets.length > 0 ? (
                recentSnippets.map(renderSnippetCard)
              ) : (
                <Typography color="text.secondary">No recent snippets</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Recent Projects
              </Typography>
              {recentProjects.length > 0 ? (
                recentProjects.map(renderProjectCard)
              ) : (
                <Typography color="text.secondary">No recent projects</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 