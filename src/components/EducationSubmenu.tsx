import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import educationLogo from '../assets/education.svg';

interface EducationSubmenuProps {
  onClose: () => void;
}

export default function EducationSubmenu({ onClose }: EducationSubmenuProps) {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  const secondaryEducationItems = [
    { label: 'Formal Degree', path: '/education/formal-degree' },
    { label: 'Certificates', path: '/education/certificates' },
  ];

  const professionalDevItems = [
    { label: 'Pluralsight', path: '/education/pluralsight' },
    { label: 'Oracle University', path: '/education/oracle-university' },
    { label: 'Other', path: '/education/other' },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        p: 2,
        minWidth: 400,
        backgroundColor: '#f8fafc',
        borderRadius: 2,
      }}
    >
      {/* Left side - Education logo only */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pr: 2,
          borderRight: '1px solid #e2e8f0',
        }}
      >
        <img
          src={educationLogo}
          alt="Education Logo"
          style={{ width: 200, height: 150, objectFit: 'contain' }}
        />
      </Box>

      {/* Right side - Two columns */}
      <Box sx={{ display: 'flex', gap: 4, flex: 1 }}>
        {/* Secondary Education Column */}
        <Box sx={{ minWidth: 150 }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 600,
              color: '#000',
              mb: 2,
              fontSize: '0.9rem',
            }}
          >
            Secondary Education
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {secondaryEducationItems.map((item) => (
              <Typography
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  color: '#1976d2',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  py: 0.5,
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                {item.label}
              </Typography>
            ))}
          </Box>
        </Box>

        {/* Professional Development Column */}
        <Box sx={{ minWidth: 150 }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 600,
              color: '#000',
              mb: 2,
              fontSize: '0.9rem',
            }}
          >
            Professional Development
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {professionalDevItems.map((item) => (
              <Typography
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  color: '#1976d2',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  py: 0.5,
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                {item.label}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
