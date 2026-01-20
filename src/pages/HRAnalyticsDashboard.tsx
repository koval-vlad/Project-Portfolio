import { Box } from '@/components/ui/box';
import { Paper } from '@/components/ui/paper';
import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import BarChartIcon from '@mui/icons-material/AreaChartOutlined';

export default function HRAnalyticsDashboard() {
  const handleCodePreview = () => {
    window.open('https://github.com/koval-vlad/Tableau-Projects/tree/master/HR%20Analytics%20Dashboard', '_blank', 'noopener,noreferrer');
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
            HR Analytics Dashboard<sup style={{ fontSize: '0.8rem', fontWeight: 'normal', fontFamily: 'lucida sans unicode' }}>Personal</sup>
            <BarChartIcon style={{ fontSize: '1.5rem' }} />
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
          Advanced analytics dashboard for human resources data analysis, featuring interactive visualizations
          and key performance indicators for HR decision making.
        </Typography>
        <tableau-viz
          id="tableauViz"
          src="https://public.tableau.com/views/HRAnalyticsDashboard_17688740732590/HRDashboard?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link"
          width="100%"
          height="800px"
          toolbar="bottom"
          hide-tabs
        ></tableau-viz>
      </Paper>
    </Box>
  );
}
