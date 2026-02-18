import { useLayoutEffect, useRef, useState } from 'react';
import { FlipCube } from '@/components/ui/flip-cube';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import usaFlag from '../assets/usa-flag.webp';
import clsClcImage from '../assets/1998-Computer-Learning-Center-large.webp';
import clsUssImage from '../assets/2026-Unique-System-Skills-large.webp';

const MIN_CUBE_SIZE = 380;
const MEASURE_WIDTH = 460;

interface CertificateCubeProps {
  certificateImage: string;
  topText: string[];
  bottomText: string;
  onImageClick: (imageSrc: string) => void;
  size: number;
}

const CertificateCube = ({ certificateImage, topText, bottomText, onImageClick, size }: CertificateCubeProps) => {
  const header = (
    <div className="flex items-center gap-2 p-2 bg-accent" style={{ flexShrink: 0 }}>
      <img src={usaFlag} alt="USA Flag" className="w-8 h-auto" />
      <div>
        {topText.map((line, index) => (
          <p key={index} className="font-bold text-foreground text-sm leading-tight">
            {line}
          </p>
        ))}
      </div>
    </div>
  );

  const frontContent = (
    <>
      {header}
      <div
        className="w-full flex-1 overflow-hidden cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          onImageClick(certificateImage);
        }}
      >
        <img
          src={certificateImage}
          alt="Certificate"
          className="w-full h-full object-cover transition-opacity hover:opacity-80"
        />
      </div>
    </>
  );

  const listItems = bottomText
    .split(/(?<=\.)\s+/)
    .filter((s) => s.trim().length > 0)
    .map((segment) => segment.trim());

  const backContent = (
    <div className="flex flex-col w-full h-full bg-card">
      <div className="flex-shrink-0">{header}</div>
      <div className="flex-1 p-2 [&_li:nth-of-type(even)]:text-primary bg-card min-h-0">
        <ul className="triangle-list mt-2">
          {listItems.map((segment, idx) => (
            <li key={idx} className="text-foreground text-xs leading-relaxed text-left">
              {segment}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <FlipCube
      showBorderGlow
      frontContent={frontContent}
      backContent={backContent}
      size={size}
      imageAlt="Certificate"
    />
  );
};

export default function Certificates() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [cubeSize, setCubeSize] = useState(MIN_CUBE_SIZE);
  const measureRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleImageClick = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedImage('');
  };

  const certificates = [
    {
      certificateImage: clsUssImage,
      topText: ['Certificate in Kubernetes with Cloud and Data Science', 'UNIQUE System Skills LLC (USA)'],
      bottomText:
        'Tableau: Transformed raw data into actionable insights by creating professional, interactive dashboards and various chart types for business intelligence reporting. Python: Learned the fundamentals of Python programming, including core syntax, data structures, and the development of scripts to solve real-world problems or automate tasks. Data Science with Python: Focused on using specialized libraries like NumPy and Pandas to manipulate, clean, and visualize complex datasets while introducing core machine learning techniques. AWS Solution Architect: Gained proficiency in designing and deploying scalable, cost-effective, and highly available cloud infrastructures using the Amazon Web Services Well-Architected Framework. Docker Certified Associate: Focused on the fundamentals of containerization, including building images, managing storage and networking, and orchestrating multi-container deployments. Kubernetes: Gained knowledge to design, deploy, and manage containerized applications at scale using cluster setup, services, controllers, and monitoring tools.'
    },
    {
      certificateImage: clsClcImage,
      topText: ['Certificate in Contemporary Application Development', 'Computer Learning Center (USA)'],
      bottomText:
        'Object-Oriented Programming (OOP): Fundamental principles including classes, inheritance, polymorphism, and encapsulation used in Visual Basic and C++. Database Integration: Connecting applications to data sources using SQL and database management systems (DBMS). Graphical User Interface (GUI) Design: Creating visual components for Windows-based applications in Visual Basic and C++. Software Development Life Cycle (SDLC): Standard phases of development including requirement analysis, design, coding, testing, and deployment. Programming under various operating systems: C programming under Unix, DOS commands.'
    }
  ];

  useLayoutEffect(() => {
    let maxSize = MIN_CUBE_SIZE;
    measureRefs.current.forEach((el) => {
      if (el) {
        const w = el.offsetWidth;
        const h = el.offsetHeight;
        maxSize = Math.max(maxSize, w, h);
      }
    });
    setCubeSize(maxSize);
  }, [certificates]);

  return (
    <div className="relative overflow-visible px-4 pt-12 pb-24 sm:pt-16 sm:pb-28">
      {/* Hidden measure divs - one per certificate */}
      <div className="absolute invisible pointer-events-none flex flex-col gap-4" style={{ left: -9999, width: MEASURE_WIDTH }}>
        {certificates.map((cert, index) => {
          const listItems = cert.bottomText
            .split(/(?<=\.)\s+/)
            .filter((s) => s.trim().length > 0)
            .map((segment) => segment.trim());
          const header = (
            <div className="flex items-center gap-2 p-2 bg-accent" style={{ flexShrink: 0 }}>
              <img src={usaFlag} alt="USA Flag" className="w-8 h-auto" />
              <div>
                {cert.topText.map((line, i) => (
                  <p key={i} className="font-bold text-foreground text-sm leading-tight">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          );
          return (
            <div
              key={index}
              ref={(el) => { measureRefs.current[index] = el; }}
              className="flex flex-col"
              style={{ width: MEASURE_WIDTH }}
            >
              <div className="flex-shrink-0">{header}</div>
              <div className="p-2 [&_li:nth-of-type(even)]:text-primary">
                <ul className="triangle-list mt-2">
                  {listItems.map((segment, idx) => (
                    <li key={idx} className="text-foreground text-xs leading-relaxed text-left">
                      {segment}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-row flex-wrap gap-20 sm:gap-32 justify-center items-start">
        {certificates.map((certificate, index) => (
          <CertificateCube
            key={index}
            certificateImage={certificate.certificateImage}
            topText={certificate.topText}
            bottomText={certificate.bottomText}
            onImageClick={handleImageClick}
            size={cubeSize}
          />
        ))}
      </div>

      <Dialog open={modalOpen} onOpenChange={(open) => { setModalOpen(open); if (!open) setSelectedImage(''); }}>
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
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Certificate"
                  className="max-w-full max-h-[80vh] object-contain rounded shadow-lg"
                />
              ) : (
                <p className="text-muted-foreground">Loading image...</p>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
