import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './store';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import Dashboard from './features/dashboard/Dashboard';
import Notes from './features/notes/Notes';
import NotesEditor from './features/notes/NotesEditor';
import Snippets from './features/snippets/Snippets';
import Projects from './features/projects/Projects';
import ProjectDetails from './features/projects/ProjectDetails';
import Settings from './features/settings/Settings';
import Login from './features/auth/Login';
import Register from './features/auth/Register';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <CssBaseline />
        <Router>
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Main Routes */}
            <Route
              path="/"
              element={
                <Layout>
                  <Dashboard />
                </Layout>
              }
            />
            <Route
              path="/notes"
              element={
                <Layout>
                  <Notes />
                </Layout>
              }
            />
            <Route
              path="/notes/:id"
              element={
                <Layout>
                  <NotesEditor />
                </Layout>
              }
            />
            <Route
              path="/snippets"
              element={
                <Layout>
                  <Snippets />
                </Layout>
              }
            />
            <Route
              path="/projects"
              element={
                <Layout>
                  <Projects />
                </Layout>
              }
            />
            <Route
              path="/projects/:id"
              element={
                <Layout>
                  <ProjectDetails />
                </Layout>
              }
            />
            <Route
              path="/settings"
              element={
                <Layout>
                  <Settings />
                </Layout>
              }
            />

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App; 