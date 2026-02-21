import { Box } from '@/components/ui/box';
import { Paper } from '@/components/ui/paper';
import { Typography } from '@/components/ui/typography';
import { useEffect, useState } from 'react';
import { ButtonMenu } from '@/components/ui/button-menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShip } from '@fortawesome/free-solid-svg-icons';
import { Code, ExternalLink, Presentation } from 'lucide-react';
import SlideShowViewerModal from '../components/SlideShowViewerModal';
import titanicPresentationPdf from '/docs/Titanic-Presentation.pdf';
import { config } from '@/config';

export default function TitanicSurvivorStory() {
  const [presentationOpen, setPresentationOpen] = useState(false);
  const slideshowImageCount = 19;

  const handleCodePreview = () => {
    window.open(config.tableau.titanic.code, '_blank', 'noopener,noreferrer');
  };
  const handleHostView = () => {
    window.open(config.tableau.titanic.host, '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = config.tableau.apiScript;
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
          <div className="flex items-center gap-2">
            <ButtonMenu
              label="View"
              items={[
                {
                  label: 'Presentation',
                  icon: <Presentation className="h-3.5 w-3.5" />,
                  onSelect: () => setPresentationOpen(true),
                },
                {
                  label: 'Code',
                  icon: <Code className="h-3.5 w-3.5" />,
                  onSelect: handleCodePreview,
                },
                {
                  label: 'Host',
                  icon: <ExternalLink className="h-3.5 w-3.5" />,
                  onSelect: handleHostView,
                },
              ]}
            />
          </div>
        </Typography>
        <Typography variant="p" className="mb-3">
          An interactive data story exploring the Titanic disaster through passenger data,
          survival rates, and demographic analysis.
        </Typography>
        <div className="myTableauViz" style={{ width: '100%', maxWidth: '1400px', marginLeft: 'auto', marginRight: 'auto' }}>
          <tableau-viz
            id="tableauViz"
            src={config.tableau.titanic.embed}
            width="100%"
            height="1000px"
            toolbar="bottom"
            hide-tabs
          ></tableau-viz>
        </div>
        <SlideShowViewerModal
          open={presentationOpen}
          onClose={() => setPresentationOpen(false)}
          title="Titanic Survivor Story Presentation"
          imageDirectory="/images/titanic-presentation"
          pdfUrl={titanicPresentationPdf}
          slideCount={slideshowImageCount}
          fileExtension="webp"
        />
      </Paper>
    </Box>
  );
}
