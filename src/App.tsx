import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Header from './components/Header';
import Home from './pages/Home';
import TableauProject from './pages/TableauProject';
import ReactProject from './pages/ReactProject';
import DotNetProject from './pages/DotNetProject';
import PythonProject from './pages/PythonProject';
import EducationView from './pages/EducationView';
import Resume from './pages/Resume';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
          <Header />
          <Box component="main" sx={{ pt: 2 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tableau/:id" element={<TableauProject />} />
              <Route path="/react/:id" element={<ReactProject />} />
              <Route path="/dotnet/:id" element={<DotNetProject />} />
              <Route path="/python/:id" element={<PythonProject />} />
              <Route path="/education/view" element={<EducationView />} />
              <Route path="/resume" element={<Resume />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
