import { Box, Paper, Typography } from '@mui/material';
import ukrFlag from '../assets/ukr-flag.svg';
import znuImage from '../assets/ZNU.svg';

export default function FormalDegree() {
  const coursework = [
    {
      title: 'Theoretical Linguistics',
      description: "Advanced study of the English language's cognitive, functional, and pragmatic peculiarities, along with historical and theoretical grammar, lexicology, and stylistics."
    },
    {
      title: 'Literature and Culture',
      description: 'Comprehensive analysis of English and world literature, focusing on the historical development of literary theory, cultural concepts (such as the "American Dream"), and linguacultural aspects.'
    },
    {
      title: 'Translation and Interpretation',
      description: 'Intensive training in the theory and practice of translation, involving a second foreign language (French) to prepare students as professional translators and interpreters.'
    },
    {
      title: 'Academic and Research Skills',
      description: 'Specialized courses in ESL Academic Writing designed to develop research, composition, and argumentation skills for international scholarly publishing.'
    },
    {
      title: 'Pedagogy and Teaching Methodology',
      description: 'Preparation for roles as English language and world literature teachers, including modern teaching techniques and the use of technology in language acquisition.'
    }
  ];

  return (
    <Box sx={{ px: '8px', py: 2 }}>
      <Paper
        elevation={2}
        sx={{
          borderRadius: '10px',
          backgroundColor: '#fff',
          overflow: 'hidden',
          maxWidth: '800px',
          mx: 'auto'
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
            src={ukrFlag}
            alt="Ukrainian Flag"
            style={{ width: '60px', height: 'auto' }}
          />
          <Box>
            <Typography
              variant="body1"
              sx={{ fontWeight: 700, color: '#333', lineHeight: 1.3 }}
            >
              BA in English Language and Literature
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontWeight: 700, color: '#333', lineHeight: 1.3 }}
            >
              Zaporizhzhia National University (Ukraine)
            </Typography>
          </Box>
        </Box>

        {/* University Image */}
        <Box sx={{ width: '100%' }}>
          <img
            src={znuImage}
            alt="Zaporizhzhia National University"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </Box>

        {/* Coursework Description */}
        <Box sx={{ p: 2 }}>
          {coursework.map((item, index) => (
            <Typography
              key={index}
              variant="body2"
              sx={{
                textAlign: 'left',
                mb: index < coursework.length - 1 ? 1.5 : 0,
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
    </Box>
  );
}
