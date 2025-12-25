import { Box, Paper, Typography, Modal, IconButton } from '@mui/material';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import usaFlag from '../assets/usa-flag.svg';
import oracleAnalyticSql from '../assets/2016-Oracle-Analytic-SQL-Data-Warehousing-large.svg';
import oracleSqlTuning from '../assets/2016-Oracle-SQL-Tuning-for-Developers-large.svg';

interface OracleCardProps {
  certificateImage: string;
  topText: string[];
  bottomText: string;
  onImageClick: (imageSrc: string) => void;
}

const OracleCard = ({ certificateImage, topText, bottomText, onImageClick }: OracleCardProps) => {
  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: '10px',
        backgroundColor: '#fff',
        overflow: 'hidden',
        width: '100%',
        maxWidth: '400px',
        transition: 'box-shadow 0.2s ease-in-out',
        '&:hover': {
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
          {topText.map((line, index) => (
            <Typography
              key={index}
              variant="body1"
              sx={{ fontWeight: 700, color: '#333', lineHeight: 1.3 }}
            >
              {line}
            </Typography>
          ))}
        </Box>
      </Box>

      {/* Certificate Image */}
      <Box sx={{ width: '100%', cursor: 'pointer' }} onClick={() => onImageClick(certificateImage)}>
        <img
          src={certificateImage}
          alt="Certificate"
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

      {/* Bottom Text - Always Visible */}
      <Box sx={{ p: 2 }}>
        <Typography
          variant="body2"
          sx={{
            textAlign: 'left',
            color: '#333',
            lineHeight: 1.5
          }}
        >
          {bottomText}
        </Typography>
      </Box>
    </Paper>
  );
};

export default function OracleUniversity() {
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

  const courses = [
    {
      certificateImage: oracleAnalyticSql,
      topText: ['Oracle Analytic SQL for Data Warehousing', 'Oracle University'],
      bottomText: 'The course teaches how to use advanced SQL features to aggregate, analyze, and model large datasets, focusing on operators like ROLLUP and CUBE and analytic functions such as LAG/LEAD and Ranking. It ensures you master complex data manipulation techniques, including hierarchical retrieval, pivoting operations, and advanced pattern matching using the MODEL and MATCH_RECOGNIZE clauses.'
    },
    {
      certificateImage: oracleSqlTuning,
      topText: ['Oracle SQL Tuning for Developers', 'Oracle University'],
      bottomText: 'The course teaches how to identify and optimize inefficient SQL by mastering the Query Optimizer, interpreting execution plans, and managing optimizer statistics. It allows gaining hands-on experience with Oracle diagnostic tools, such as Automatic SQL Tuning and Real Time SQL monitoring, while learning advanced techniques like application tracing and bind variable usage to ensure high-performance data access.'
    }
  ];

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
        {courses.map((course, index) => (
          <OracleCard
            key={index}
            certificateImage={course.certificateImage}
            topText={course.topText}
            bottomText={course.bottomText}
            onImageClick={handleImageClick}
          />
        ))}
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
