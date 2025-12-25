import { Box, Paper, Typography, Modal, IconButton } from '@mui/material';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import usaFlag from '../assets/usa-flag.svg';
import clsImage from '../assets/1998-Computer-Learning-Center-large.svg';

export default function Certificates() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>('');

  const handleImageClick = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedImage('');
  };

  const kubernetesCoursework = [
    {
      title: 'Tableau',
      description: 'Transformed raw data into actionable insights by creating professional, interactive dashboards and various chart types for business intelligence reporting.'
    },
    {
      title: 'Python',
      description: 'Learned the fundamentals of Python programming, including core syntax, data structures, and the development of scripts to solve real-world problems or automate tasks.'
    },
    {
      title: 'Data Science with Python',
      description: 'Focused on using specialized libraries like NumPy and Pandas to manipulate, clean, and visualize complex datasets while introducing core machine learning techniques.'
    },
    {
      title: 'AWS Solution Architect',
      description: 'Gained proficiency in designing and deploying scalable, cost-effective, and highly available cloud infrastructures using the Amazon Web Services Well-Architected Framework.'
    },
    {
      title: 'Docker Certified Associate',
      description: 'Focused on the fundamentals of containerization, including building images, managing storage and networking, and orchestrating multi-container deployments.'
    },
    {
      title: 'Kubernetes',
      description: 'Gained knowledge to design, deploy, and manage containerized applications at scale using cluster setup, services, controllers, and monitoring tools.'
    }
  ];

  const applicationDevCoursework = [
    {
      title: 'Object-Oriented Programming (OOP)',
      description: 'Fundamental principles including classes, inheritance, polymorphism, and encapsulation used in Visual Basic and C++.'
    },
    {
      title: 'Database Integration',
      description: 'Connecting applications to data sources using SQL and database management systems (DBMS)'
    },
    {
      title: 'Graphical User Interface (GUI) Design',
      description: 'Creating visual components for Windows-based applications in Visual Basic and C++.'
    },
    {
      title: 'Software Development Life Cycle (SDLC)',
      description: 'Standard phases of development including requirement analysis, design, coding, testing, and deployment.'
    },
    {
      title: 'Programming under various operating systems',
      description: 'C programming under Unix, DOS commands.'
    }
  ];

  const KubernetesCertificateCard = ({ onImageClick }: { onImageClick: (imageSrc: string) => void }) => (
    <Paper
      elevation={2}
      sx={{
        borderRadius: '10px',
        backgroundColor: '#fff',
        overflow: 'hidden',
        maxWidth: '400px',
        flex: '1 1 400px',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
        },
      }}
    >
      {/* Header with flag and text */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          p: 2,
          backgroundColor: '#e8f4fc'
        }}
      >
        <img
          src={usaFlag}
          alt="USA Flag"
          style={{ width: '60px', height: 'auto' }}
        />
        <Box>
          <Typography
            variant="body1"
            sx={{ fontWeight: 700, color: '#333', lineHeight: 1.3 }}
          >
            Certificate in Kubernetes with Cloud and Data Science
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontWeight: 700, color: '#333', lineHeight: 1.3 }}
          >
            UNIQUE System Skills LLC (USA)
          </Typography>
        </Box>
      </Box>

      {/* Computer Learning Center Image */}
      <Box sx={{ width: '100%', cursor: 'pointer' }} onClick={() => onImageClick(clsImage)}>
        <img
          src={clsImage}
          alt="Computer Learning Center"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            transition: 'opacity 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        />
      </Box>

      {/* Coursework Description */}
      <Box sx={{ p: 2 }}>
        {kubernetesCoursework.map((item, index) => (
          <Typography
            key={index}
            variant="body2"
            sx={{
              textAlign: 'left',
              mb: index < kubernetesCoursework.length - 1 ? 1.5 : 0,
              color: '#333',
              lineHeight: 1.5
            }}
          >
            <Box component="span" sx={{ fontWeight: 700 }}>
              {item.title}:
            </Box>{' '}
            {item.description}
          </Typography>
        ))}
      </Box>
    </Paper>
  );

  const ApplicationDevCertificateCard = ({ onImageClick }: { onImageClick: (imageSrc: string) => void }) => (
    <Paper
      elevation={2}
      sx={{
        borderRadius: '10px',
        backgroundColor: '#fff',
        overflow: 'hidden',
        maxWidth: '400px',
        flex: '1 1 400px',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
        },
      }}
    >
      {/* Header with flag and text */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          p: 2,
          backgroundColor: '#e8f4fc'
        }}
      >
        <img
          src={usaFlag}
          alt="USA Flag"
          style={{ width: '60px', height: 'auto' }}
        />
        <Box>
          <Typography
            variant="body1"
            sx={{ fontWeight: 700, color: '#333', lineHeight: 1.3 }}
          >
            Certificate in Contemporary Application Development
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontWeight: 700, color: '#333', lineHeight: 1.3 }}
          >
            Computer Learning Center (USA)
          </Typography>
        </Box>
      </Box>

      {/* Computer Learning Center Image */}
      <Box sx={{ width: '100%', cursor: 'pointer' }} onClick={() => onImageClick(clsImage)}>
        <img
          src={clsImage}
          alt="Computer Learning Center"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            transition: 'opacity 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        />
      </Box>

      {/* Coursework Description */}
      <Box sx={{ p: 2 }}>
        {applicationDevCoursework.map((item, index) => (
          <Typography
            key={index}
            variant="body2"
            sx={{
              textAlign: 'left',
              mb: index < applicationDevCoursework.length - 1 ? 1.5 : 0,
              color: '#333',
              lineHeight: 1.5
            }}
          >
            <Box component="span" sx={{ fontWeight: 700 }}>
              {item.title}:
            </Box>{' '}
            {item.description}
          </Typography>
        ))}
      </Box>
    </Paper>
  );

  return (
    <Box sx={{ px: '8px', py: 2 }}>
      <Box
        sx={{
          display: 'flex',
          gap: 3,
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}
      >
        <KubernetesCertificateCard onImageClick={handleImageClick} />
        <ApplicationDevCertificateCard onImageClick={handleImageClick} />
      </Box>

      {/* Image Modal */}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
        }}
      >
        <Box
          sx={{
            position: 'relative',
            minWidth: '600px',
            minHeight: '400px',
            maxWidth: '90vw',
            maxHeight: '90vh',
            backgroundColor: 'white',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Close button */}
          <IconButton
            onClick={handleCloseModal}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              zIndex: 1,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 1)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Large image */}
          <Box
            sx={{
              flex: 1,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 2,
              backgroundColor: '#f5f5f5',
            }}
          >
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Certificate"
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  borderRadius: '4px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
              />
            )}
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
