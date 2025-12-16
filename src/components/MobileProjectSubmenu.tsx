import { useState, useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  Box,
  Typography,
  Fade,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface MobileProjectSubmenuProps {
  category: string;
  onClose: () => void;
}

export default function MobileProjectSubmenu({
  category,
  onClose,
}: MobileProjectSubmenuProps) {
  const navigate = useNavigate();
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    setVisibleItems([]);
    const timers: NodeJS.Timeout[] = [];

    for (let i = 0; i < 5; i++) {
      const timer = setTimeout(() => {
        setVisibleItems(prev => [...prev, i]);
      }, i * 80);
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
    ][i]}/pexels-photo.jpeg?auto=compress&cs=tinysrgb&w=80&h=60`,
  }));

  return (
    <List sx={{ pl: 2, backgroundColor: '#fafafa' }}>
      {projects.map((project, index) => (
        <Fade key={project.id} in={visibleItems.includes(index)} timeout={400}>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleProjectClick(index)}
              sx={{
                display: 'flex',
                gap: 2,
                py: 1.5,
              }}
            >
              <Box
                component="img"
                src={project.image}
                alt={project.title}
                sx={{
                  width: 60,
                  height: 45,
                  objectFit: 'cover',
                  borderRadius: 1,
                }}
              />
              <Typography variant="body2">{project.title}</Typography>
            </ListItemButton>
          </ListItem>
        </Fade>
      ))}
    </List>
  );
}
