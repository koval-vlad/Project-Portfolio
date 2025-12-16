import { useState, useEffect } from 'react';
import { Box, Card, CardMedia, CardContent, Typography, Fade } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface ProjectSubmenuProps {
  category: string;
  onClose: () => void;
}

export default function ProjectSubmenu({ category, onClose }: ProjectSubmenuProps) {
  const navigate = useNavigate();
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    setVisibleItems([]);
    const timers: NodeJS.Timeout[] = [];

    for (let i = 0; i < 5; i++) {
      const timer = setTimeout(() => {
        setVisibleItems(prev => [...prev, i]);
      }, i * 100);
      timers.push(timer);
    }

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [category]);

  const handleProjectClick = (id: number) => {
    navigate(`/${category}/${id + 1}`);
    onClose();
  };

  const projects = Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    title: `Project ${i + 1}`,
    image: `https://images.pexels.com/photos/${[
      '1181671',
      '546819',
      '1181467',
      '1089438',
      '574071',
    ][i]}/pexels-photo.jpeg?auto=compress&cs=tinysrgb&w=300&h=200`,
  }));

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 2,
        p: 2,
        maxWidth: 600,
      }}
    >
      {projects.map((project, index) => (
        <Fade key={project.id} in={visibleItems.includes(index)} timeout={500}>
          <Card
            sx={{
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
              },
            }}
            onClick={() => handleProjectClick(index)}
          >
            <CardMedia
              component="img"
              height="120"
              image={project.image}
              alt={project.title}
              sx={{ objectFit: 'cover' }}
            />
            <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
              <Typography variant="body2" align="center" fontWeight={500}>
                {project.title}
              </Typography>
            </CardContent>
          </Card>
        </Fade>
      ))}
    </Box>
  );
}
