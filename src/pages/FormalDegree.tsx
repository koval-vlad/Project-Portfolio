import { useLayoutEffect, useRef, useState } from 'react';
import { FlipCube } from '@/components/ui/flip-cube';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import ukrFlag from '../assets/ukr-flag.webp';
import znuImage from '../assets/ZNU.webp';

const MIN_CUBE_SIZE = 320;
const MEASURE_WIDTH = 440;

export default function FormalDegree() {
  const measureRef = useRef<HTMLDivElement>(null);
  const [cubeSize, setCubeSize] = useState(MIN_CUBE_SIZE);
  const [modalOpen, setModalOpen] = useState(false);
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

  // Shared header: flag + degree/university (shown on both front and back)
  const degreeHeader = (
    <div className="flex items-center gap-2 p-2 bg-accent" style={{ flexShrink: 0 }}>
      <img
        src={ukrFlag}
        alt="Ukrainian Flag"
        className="w-8 h-auto"
      />
      <div>
        <p className="font-bold text-foreground text-sm leading-tight">
          BA in English Language and Literature
        </p>
        <p className="font-bold text-foreground text-sm leading-tight">
          Zaporizhzhia National University (Ukraine)
        </p>
      </div>
    </div>
  );

  // Back face: header on top, then coursework list (solid bg-card to match face, no edge)
  const backContent = (
    <div className="flex flex-col w-full h-full bg-card">
      <div className="flex-shrink-0">
        {degreeHeader}
      </div>
      <div className="flex-1 p-2 [&_li:nth-of-type(even)]:text-primary bg-card min-h-0">
        <ul className="triangle-list mt-2">
          {coursework.map((item, index) => (
            <li key={index} className="text-foreground text-xs leading-relaxed text-left">
              <span className="font-bold">{item.title}:</span>{' '}
              {item.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const handleImageClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Measure back content to size the cube so all text fits (no scrollbars)
  useLayoutEffect(() => {
    const el = measureRef.current;
    if (!el) return;
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    const size = Math.max(MIN_CUBE_SIZE, w, h);
    setCubeSize(size);
  }, [coursework.length]);

  // Front face: header + image
  const frontContent = (
    <>
      {degreeHeader}

      {/* University Image - click to enlarge */}
      <div
        className="w-full flex-1 overflow-hidden cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          handleImageClick();
        }}
      >
        <img
          src={znuImage}
          alt="Zaporizhzhia National University"
          className="w-full h-full object-cover transition-opacity hover:opacity-80"
        />
      </div>
    </>
  );

  return (
    <div className="relative overflow-visible px-6 sm:px-4 pt-12 pb-24 sm:pt-16 sm:pb-28 flex items-center justify-center min-h-[calc(100vh-200px)]">
      {/* Hidden measure div: same structure as back face so cube size fits content */}
      <div
        ref={measureRef}
        aria-hidden
        className="absolute invisible pointer-events-none flex flex-col"
        style={{ width: MEASURE_WIDTH, left: -9999 }}
      >
        <div className="flex-shrink-0">
          {degreeHeader}
        </div>
        <div className="p-2 [&_li:nth-of-type(even)]:text-primary">
          <ul className="triangle-list mt-2">
            {coursework.map((item, index) => (
              <li key={index} className="text-foreground text-xs leading-relaxed text-left">
                <span className="font-bold">{item.title}:</span>{' '}
                {item.description}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <FlipCube
        showBorderGlow
        frontContent={frontContent}
        backContent={backContent}
        size={cubeSize}
        imageAlt="BA in English Language and Literature"
      />

      {/* Image Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] p-0">
          <div className="relative min-h-[250px] bg-background rounded-lg overflow-hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCloseModal}
              className="absolute top-2 right-2 bg-card/90 hover:bg-card shadow-sm z-10 h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
            <div className="flex items-center justify-center p-4 min-h-[250px]">
              <img
                src={znuImage}
                alt="Zaporizhzhia National University"
                className="max-w-full max-h-[80vh] object-contain rounded shadow-lg"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
