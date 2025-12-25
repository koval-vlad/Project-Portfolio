import { useState } from 'react';
import { Box, Paper, Typography, IconButton, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import usaFlag from '../assets/usa-flag.svg';

// Import all certificate images
import activeServerPagesSmall from '../assets/2000-Active-Server-Pages-small.svg';
import activeServerPagesLarge from '../assets/2000-Active-Server-Pages-large.svg';
import javaServerPagesSmall from '../assets/2001-Java-Server-Pages-small.svg';
import javaServerPagesLarge from '../assets/2001-Java-Server-Pages-large.svg';
import visualStudioSmall from '../assets/2011-Visual-Studio-small.svg';
import visualStudioLarge from '../assets/2011-Visual-Studio-large.svg';
import businessAnalysisSmall from '../assets/2014-Business-Analysis-small.svg';
import businessAnalysisLarge from '../assets/2014-Business-Analysis-large.svg';

interface OtherEducationCardProps {
  certificateImageSmall: string;
  certificateImageLarge: string;
  topText: string;
  bottomText: string;
  onImageClick: (largeImage: string, title: string) => void;
}

const OtherEducationCard = ({
  certificateImageSmall,
  certificateImageLarge,
  topText,
  bottomText,
  onImageClick,
}: OtherEducationCardProps) => {

  const [titleLine1, titleLine2] = topText.split('\n').map(s => s.trim());

  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: '8px',
        backgroundColor: '#fff',
        overflow: 'hidden',
        maxWidth: '260px',
        flex: '1 1 auto',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        },
      }}
    >
      {/* Header with flag and text */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          p: 1.5,
          backgroundColor: '#e8f4fc',
          minHeight: '70px',
        }}
      >
        <img
          src={usaFlag}
          alt="USA Flag"
          style={{ width: '40px', height: 'auto' }}
        />
        <Box>
          <Typography
            variant="body2"
            sx={{ fontWeight: 700, color: '#333', lineHeight: 1.2, fontSize: '0.75rem' }}
          >
            {titleLine1}
          </Typography>
          {titleLine2 && (
            <Typography
              variant="body2"
              sx={{ fontWeight: 700, color: '#333', lineHeight: 1.2, fontSize: '0.75rem' }}
            >
              {titleLine2}
            </Typography>
          )}
        </Box>
      </Box>

      {/* Certificate Image */}
      <Box
        sx={{
          width: '100%',
          cursor: 'pointer',
          '&:hover img': {
            opacity: 0.8,
          },
        }}
        onClick={() => onImageClick(certificateImageLarge, topText)}
      >
        <img
          src={certificateImageSmall}
          alt={topText}
          style={{ width: '100%', height: 'auto', display: 'block', transition: 'opacity 0.2s' }}
        />
      </Box>

      {/* Coursework Description - Always Visible */}
      <Box sx={{ p: 1.5, flexGrow: 1 }}>
        <Typography
          variant="body2"
          sx={{
            textAlign: 'left',
            color: '#333',
            lineHeight: 1.4,
            fontSize: '0.7rem',
          }}
        >
          {bottomText}
        </Typography>
      </Box>
    </Paper>
  );
};

const OTHER_EDUCATION_CARDS = [
  {
    certificateImageSmall: activeServerPagesSmall,
    certificateImageLarge: activeServerPagesLarge,
    topText: 'Active Server Pages Training\nCreative Data',
    bottomText: 'The course teaches the fundamentals of building dynamic, server-side web applications using classic ASP. It covers core concepts such as the ASP object model (Request, Response, and Session objects), scripting with VBScript, and utilizing ActiveX Data Objects (ADO) for database connectivity and manipulation.',
  },
  {
    certificateImageSmall: javaServerPagesSmall,
    certificateImageLarge: javaServerPagesLarge,
    topText: 'Introduction to Java Server Pages\nWest Lake Internet Training',
    bottomText: 'The course provides a foundational overview of using JSP to create dynamic, data-driven web applications by embedding Java code within HTML. Key concepts include mastering JSP syntax - such as scriptlets, expressions, and declarations - while exploring the integration of JavaBeans, custom tag libraries, and database connectivity.',
  },
  {
    certificateImageSmall: visualStudioSmall,
    certificateImageLarge: visualStudioLarge,
    topText: 'Testers Training Using Visual Studio Ultimate\nNotion Solutions',
    bottomText: 'The course provides a comprehensive look at the application lifecycle with a specific focus on the tools available to testers in the Visual Studio Ultimate release. Key concepts include creating and managing test plans and cases, executing manual and exploratory tests, and utilizing Microsoft Test Manager (MTM) for bug filing and tracking within Team Foundation Server.',
  },
  {
    certificateImageSmall: businessAnalysisSmall,
    certificateImageLarge: businessAnalysisLarge,
    topText: 'Business Analysis Boot Camp\nCorporate Education Group',
    bottomText: 'The boot camp provides an intensive, practical foundation in business analysis aligned with industry standards like the BABOK® Guide. The course covers essential techniques for eliciting and documenting requirements, analyzing stakeholders, and modeling business processes using both predictive (Waterfall) and adaptive (Agile) approaches.',
  },
];

export default function OtherEducation() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');

  const handleImageClick = (image: string, title: string) => {
    setSelectedImage(image);
    setSelectedTitle(title);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedImage('');
    setSelectedTitle('');
  };

  return (
    <Box sx={{ px: '8px', py: 2 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 0.7,
          justifyContent: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {OTHER_EDUCATION_CARDS.map((course, index) => (
          <OtherEducationCard
            key={index}
            certificateImageSmall={course.certificateImageSmall}
            certificateImageLarge={course.certificateImageLarge}
            topText={course.topText}
            bottomText={course.bottomText}
            onImageClick={handleImageClick}
          />
        ))}
      </Box>

      {/* Large Image Modal */}
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
            {selectedImage ? (
              <img
                src={selectedImage}
                alt={selectedTitle}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  borderRadius: '4px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
                onLoad={() => console.log('Image loaded successfully:', selectedImage)}
                onError={(e) => {
                  console.error('Image failed to load:', selectedImage);
                }}
              />
            ) : (
              <Typography>Loading image...</Typography>
            )}
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
