import { Box } from '@/components/ui/box';
import { Eye, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MobileResumeSubmenuProps {
  onClose: () => void;
}

export default function MobileResumeSubmenu({ onClose }: MobileResumeSubmenuProps) {
  const navigate = useNavigate();

  const handleView = () => {
    navigate('/resume');
    onClose();
  };

  const handleContact = () => {
    navigate('/contact');
    onClose();
  };

  return (
    <Box className="w-full max-w-full overflow-hidden bg-background">
      <button
        onClick={handleView}
        className="group flex items-center w-full py-2 px-4 text-foreground text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer"
      >
        <Eye className="h-4 w-4 mr-3 text-foreground group-hover:text-accent-foreground" />
        View Resume
      </button>
      <button
        onClick={handleContact}
        className="group flex items-center w-full py-2 px-4 text-foreground text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer"
      >
        <Mail className="h-4 w-4 mr-3 text-foreground group-hover:text-accent-foreground" />
        Contact
      </button>
    </Box>
  );
}
