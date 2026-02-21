import { Box } from '@/components/ui/box';
import { BookOpenText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ResumeSubmenuProps {
  onClose: () => void;
}

export default function ResumeSubmenu({ onClose }: ResumeSubmenuProps) {
  const navigate = useNavigate();

  const handleViewResume = () => {
    navigate('/resume');
    onClose();
  };

  return (
    <Box className="w-full bg-background">
      <button
        onClick={handleViewResume}
        className="group flex items-center w-full py-2 px-4 text-foreground text-sm hover:bg-accent hover:text-accent-foreground hover:cursor-pointer transition-colors"
      >
        <BookOpenText className="h-4 w-4 mr-3 text-foreground group-hover:text-accent-foreground" />
        View Resume
      </button>
    </Box>
  );
}
