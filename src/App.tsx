import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Header from './components/Header';
import Home from './pages/Home';
import TableauProject from './pages/TableauProject';
import DotNetProject from './pages/DotNetProject';
import VBProject from './pages/VBProject';
import EducationView from './pages/EducationView';
import FormalDegree from './pages/FormalDegree';
import Certificates from './pages/Certificates';
import Pluralsight from './pages/Pluralsight';
import OracleUniversity from './pages/OracleUniversity';
import OtherEducation from './pages/OtherEducation';
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
              <Route path="/dotnet/:id" element={<DotNetProject />} />
              <Route path="/vb/:id" element={<VBProject />} />
              <Route path="/education/view" element={<EducationView />} />
              <Route path="/education/formal-degree" element={<FormalDegree />} />
              <Route path="/education/certificates" element={<Certificates />} />
              <Route path="/education/pluralsight" element={<Pluralsight />} />
              <Route path="/education/oracle-university" element={<OracleUniversity />} />
              <Route path="/education/other" element={<OtherEducation />} />
              <Route path="/resume" element={<Resume />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
