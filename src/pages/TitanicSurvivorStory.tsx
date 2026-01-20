import { Box } from '@/components/ui/box';
import { Paper } from '@/components/ui/paper';
import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShip } from '@fortawesome/free-solid-svg-icons';

export default function TitanicSurvivorStory() {
  const handleCodePreview = () => {
    window.open('https://github.com/koval-vlad/Tableau-Projects/tree/master/Who%20Survived%20Titanic%20Tragedy%20Story', '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js';
    script.type = 'module';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Box className="px-0 py-2">
      <Paper elevation={2} className="p-2 rounded-xl">
        <Typography variant="h4" as="h2" className="mb-2 flex items-center gap-2 justify-between">
          <span className="flex items-center gap-1">
            Titanic Survivor Story<sup style={{ fontSize: '0.8rem', fontWeight: 'normal', fontFamily: 'lucida sans unicode' }}>Personal</sup>
            <FontAwesomeIcon icon={faShip} style={{ fontSize: '1.2rem' }} />
          </span>
          <Button
            variant="super3d"
            size="sm"
            onClick={handleCodePreview}
            className="text-xs h-7 px-2"
          >
            Code Preview
          </Button>
        </Typography>
        <Typography variant="p" className="mb-3">
          An interactive data story exploring the Titanic disaster through passenger data,
          survival rates, and demographic analysis.
        </Typography>
        <div className="myTableauViz" style={{ width: '100%', maxWidth: '1400px', marginLeft: 'auto', marginRight: 'auto' }}>
          <tableau-viz
            id="tableauViz"
            src="https://public.tableau.com/shared/D5J3ZZ2CH?:display_count=n&:origin=viz_share_link"
            width="100%"
            height="1000px"
            toolbar="bottom"
            hide-tabs
          ></tableau-viz>
        </div>
      </Paper>
    </Box>
  );
}
