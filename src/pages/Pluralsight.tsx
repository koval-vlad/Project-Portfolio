import { Box, Paper, Typography, IconButton, Collapse, Modal } from '@mui/material';
import { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CloseIcon from '@mui/icons-material/Close';
import usaFlag from '../assets/usa-flag.svg';
import angularGettingStarted from '../assets/2020-Angular-Getting-Started-small.svg';
import angularGettingStartedLarge from '../assets/2020-Angular-Getting-Started-large.svg';
import blazorGettingStarted from '../assets/2020-Blazor-Getting-Started-small.svg';
import blazorGettingStartedLarge from '../assets/2020-Blazor-Getting-Started-large.svg';
import blazorBigPicture from '../assets/2020-Blazor-The-Big-Picture-small.svg';
import blazorBigPictureLarge from '../assets/2020-Blazor-The-Big-Picture-large.svg';
import buildingAsyncApi from '../assets/2020-Building-Async-API-ASP.NET-Core-small.svg';
import buildingAsyncApiLarge from '../assets/2020-Building-Async-API-ASP.NET-Core-large.svg';
import buildingRestfulApi from '../assets/2020-Building-RESTful-API-ASP.NET-Core-small.svg';
import buildingRestfulApiLarge from '../assets/2020-Building-RESTful-API-ASP.NET-Core-large.svg';
import buildRichWebAppsBlazor from '../assets/2020-Build-Rich-Web-Applications-Blazor-small.svg';
import buildRichWebAppsBlazorLarge from '../assets/2020-Build-Rich-Web-Applications-Blazor-large.svg';
import dependencyInjection from '../assets/2020-Dependency-Injection-ASP.NET-Core-small.svg';
import dependencyInjectionLarge from '../assets/2020-Dependency-Injection-ASP.NET-Core-large.svg';
import designingRestfulWebApis from '../assets/2020-Designing-RESTful-Web-APIs-small.svg';
import designingRestfulWebApisLarge from '../assets/2020-Designing-RESTful-Web-APIs-large.svg';
import documentingApi from '../assets/2020-Documenting-ASP.NET-Core-API-OpenAPI-Swagger-small.svg';
import documentingApiLarge from '../assets/2020-Documenting-ASP.NET-Core-API-OpenAPI-Swagger-large.svg';
import frontendDevelopment from '../assets/2020-Front-End-Developmenth-HTML5-CSS-JavaScript-small.svg';
import frontendDevelopmentLarge from '../assets/2020-Front-End-Developmenth-HTML5-CSS-JavaScript-large.svg';
import implementAdvancedRestful from '../assets/2020-Implement-Advanced-RESTful-Concerns-ASP.NET-Core-small.svg';
import implementAdvancedRestfulLarge from '../assets/2020-Implement-Advanced-RESTful-Concerns-ASP.NET-Core-large.svg';
import javascriptGettingStarted from '../assets/2020-JavaScript-Getting-Started-small.svg';
import javascriptGettingStartedLarge from '../assets/2020-JavaScript-Getting-Started-large.svg';
import javascriptObjectsPrototypes from '../assets/2020-JavaScript-Objects-and-Prototypes-small.svg';
import javascriptObjectsPrototypesLarge from '../assets/2020-JavaScript-Objects-and-Prototypes-large.svg';
import reactGettingStarted from '../assets/2020-React-Getting-Started-small.svg';
import reactGettingStartedLarge from '../assets/2020-React-Getting-Started-large.svg';
import reactBigPicture from '../assets/2020-React-The-Big-Picture-small.svg';
import reactBigPictureLarge from '../assets/2020-React-The-Big-Picture-large.svg';
import usingGrpc from '../assets/2020-Using-gRPC-in-ASP.NET-Core-small.svg';
import usingGrpcLarge from '../assets/2020-Using-gRPC-in-ASP.NET-Core-large.svg';
import wpfMvvm from '../assets/2020-WPF-MVVM-in-Depth-small.svg';
import wpfMvvmLarge from '../assets/2020-WPF-MVVM-in-Depth-large.svg';

interface PluralsightCardProps {
  certificateImage: string;
  certificateImageLarge: string;
  topText: string[];
  bottomText: string;
  onImageClick: (largeImage: string, title: string) => void;
}

const PluralsightCard = ({ certificateImage, certificateImageLarge, topText, bottomText, onImageClick }: PluralsightCardProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: '8px',
        backgroundColor: '#fff',
        overflow: 'hidden',
        width: '100%',
        maxWidth: '220px',
        transition: 'box-shadow 0.2s ease-in-out',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
        },
      }}
    >
      {/* Header with flag and text */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          p: 1.5,
          backgroundColor: '#e8f4fc'
        }}
      >
        <img
          src={usaFlag}
          alt="USA Flag"
          style={{ width: '40px', height: 'auto' }}
        />
        <Box>
          {topText.map((line, index) => (
            <Typography
              key={index}
              variant="body2"
              sx={{
                fontWeight: 700,
                color: '#333',
                lineHeight: 1.2,
                fontSize: '0.75rem'
              }}
            >
              {line}
            </Typography>
          ))}
        </Box>
      </Box>

      {/* Certificate Image */}
      <Box sx={{ width: '100%', cursor: 'pointer' }} onClick={() => onImageClick(certificateImageLarge, topText[0])}>
        <img
          src={certificateImage}
          alt="Certificate"
          style={{ width: '100%', height: 'auto', display: 'block', transition: 'opacity 0.2s ease' }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        />
      </Box>

      {/* Bottom Text with Expand/Collapse */}
      <Box sx={{ position: 'relative' }}>
        <Collapse in={expanded}>
          <Box sx={{ p: 1.5, pb: 3 }}>
            <Typography
              variant="body2"
              sx={{
                textAlign: 'left',
                color: '#333',
                lineHeight: 1.4,
                fontSize: '0.7rem'
              }}
            >
              {bottomText}
            </Typography>
          </Box>
        </Collapse>

        {/* Expand/Collapse Arrow */}
        <IconButton
          onClick={() => setExpanded(!expanded)}
          sx={{
            position: 'absolute',
            bottom: 6,
            right: 6,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 1)',
            },
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            width: '24px',
            height: '24px',
          }}
          size="small"
        >
          {expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </Box>
    </Paper>
  );
};

export default function Pluralsight() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedTitle, setSelectedTitle] = useState<string>('');

  const handleImageClick = (largeImage: string, title: string) => {
    setSelectedImage(largeImage);
    setSelectedTitle(title);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedImage('');
    setSelectedTitle('');
  };

  const courses = [
    {
      certificateImage: angularGettingStarted,
      certificateImageLarge: angularGettingStartedLarge,
      topText: ['Angular Getting Started', 'Pluralsight'],
      bottomText: 'The course focuses on how to build professional web applications by mastering core building blocks like components, templates, and data binding. It also explores essential features for real-world projects, including dependency injection, retrieving dynamic data via HTTP and observables, and implementing navigation and routing.'
    },
    {
      certificateImage: blazorGettingStarted,
      certificateImageLarge: blazorGettingStartedLarge,
      topText: ['Blazor Getting Started', 'Pluralsight'],
      bottomText: 'The course teaches you how to build interactive web UIs using C# and data binding instead of JavaScript. It describes how set up your first application, consume data from an API, and create reusable Razor components that can integrate with existing JavaScript libraries.'
    },
    {
      certificateImage: blazorBigPicture,
      certificateImageLarge: blazorBigPictureLarge,
      topText: ['Blazor The Big Picture', 'Pluralsight'],
      bottomText: 'The course provides a high-level overview of Microsoft\'s framework for building interactive web UIs using C# instead of JavaScript. It explores how Blazor works, compares it to modern front-end technologies like Angular and React, and details how to prepare your development environment to start building client-side applications.'
    },
    {
      certificateImage: buildingAsyncApi,
      certificateImageLarge: buildingAsyncApiLarge,
      topText: ['Building Async API with ASP.NET Core', 'Pluralsight'],
      bottomText: 'The course teaches how to improve application scalability by correctly implementing asynchronous programming across all layers, from the data access layer (EF Core) to the API controller. It focuses on the use of async and await effectively, integration with external services asynchronously, and avoidance of common performance pitfalls like thread blocking and deadlocks.'
    },
    {
      certificateImage: buildingRestfulApi,
      certificateImageLarge: buildingRestfulApiLarge,
      topText: ['Building RESTful API with ASP.NET Core', 'Pluralsight'],
      bottomText: 'The course teaches how to construct high-quality APIs by adhering to REST constraints, implementing correct HTTP methods, and managing status codes for resource interaction. It also explores essential features such as input validation, filtering, and searching to ensure your services are robust and developer-friendly.'
    },
    {
      certificateImage: buildRichWebAppsBlazor,
      certificateImageLarge: buildRichWebAppsBlazorLarge,
      topText: ['Build Rich Web Applications with C# using Blazor', 'Pluralsight'],
      bottomText: 'The course focuses on leveraging C# to build interactive front-end web interfaces without relying on JavaScript. It covers foundational concepts like component-based architecture, data binding, and the core differences between Blazor WebAssembly and Blazor Server hosting models.'
    },
    {
      certificateImage: dependencyInjection,
      certificateImageLarge: dependencyInjectionLarge,
      topText: ['Dependency Injection in ASP.NET Core', 'Pluralsight'],
      bottomText: 'The course teaches how to build loosely coupled applications by mastering the built-in Microsoft dependency injection container. Key concepts include registering and resolving services, managing service lifetimes (Transient, Scoped, and Singleton), and extending or replacing the default container for complex scenarios.'
    },
    {
      certificateImage: designingRestfulWebApis,
      certificateImageLarge: designingRestfulWebApisLarge,
      topText: ['Designing RESTful Web APIs', 'Pluralsight'],
      bottomText: 'The course teaches the architectural principles of REST and HTTP to help you design scalable APIs. It covers practical implementation details such as URI design, HTTP verb usage, paging, caching, versioning, and essential security considerations.'
    },
    {
      certificateImage: documentingApi,
      certificateImageLarge: documentingApiLarge,
      topText: ['Documenting ASP.NET Core API with OpenAPI and Swagger', 'Pluralsight'],
      bottomText: 'The course goes in depth on how to integrate OpenAPI (Swagger) into your services to generate interactive UI for testing and documentation. You will explore how to refine these specifications using attributes and conventions, while also mastering advanced scenarios like API versioning, authentication support, and custom UI branding.'
    },
    {
      certificateImage: frontendDevelopment,
      certificateImageLarge: frontendDevelopmentLarge,
      topText: ['Front End Web Development with HTML5, CSS and JavaScript', 'Pluralsight'],
      bottomText: 'The course teaches how to structure web pages with HTML, style them using CSS, and add interactivity with modern JavaScript. It also explores responsive design, browser developer tools, and essential libraries like jQuery and Bootstrap.'
    },
    {
      certificateImage: implementAdvancedRestful,
      certificateImageLarge: implementAdvancedRestfulLarge,
      topText: ['Implementing Advanced RESTful Concerns with ASP.NET Core', 'Pluralsight'],
      bottomText: 'The course focuses on achieving the highest level of API maturity by implementing HATEOAS, advanced content negotiation, and data shaping. It also provides in-depth instruction on handling critical production concerns such as paging, sorting, caching, and concurrency to build robust and evolvable microservices.'
    },
    {
      certificateImage: javascriptGettingStarted,
      certificateImageLarge: javascriptGettingStartedLarge,
      topText: ['JavaScript Getting Started', 'Pluralsight'],
      bottomText: 'The course introduces foundational JavaScipt programming concepts such as variables, constants, types, and operators. It provides hands-on experience in building simple programs and modifying web pages by exploring functions, arrays, and DOM manipulation.'
    },
    {
      certificateImage: javascriptObjectsPrototypes,
      certificateImageLarge: javascriptObjectsPrototypesLarge,
      topText: ['JavaScript Objects and Prototypes', 'Pluralsight'],
      bottomText: 'The course provides an in-depth look at object creation using object literals, constructor functions, and classes. Learners explore advanced property configuration - such as property descriptors, getters, and setters - while gaining a detailed understanding of how prototypes and prototypal inheritance function behind the scenes.'
    },
    {
      certificateImage: reactGettingStarted,
      certificateImageLarge: reactGettingStartedLarge,
      topText: ['React Getting Started', 'Pluralsight'],
      bottomText: 'The course provides a hands-on introduction to building web applications by teaching core concepts such as class and function components, state management, and one-way data flow. It also covers practical tasks like reading data from APIs, handling side effects with custom hooks, and setting up a local JavaScript development environment.'
    },
    {
      certificateImage: reactBigPicture,
      certificateImageLarge: reactBigPictureLarge,
      topText: ['React The Big Picture', 'Pluralsight'],
      bottomText: 'The course explores why React is a dominant choice for front-end development by examining its core mechanics, such as JSX and tree reconciliation. The course also provides a critical analysis of architectural tradeoffs and potential drawbacks - like decision fatigue and build step requirements - to help you determine if React fits your specific project needs.'
    },
    {
      certificateImage: usingGrpc,
      certificateImageLarge: usingGrpcLarge,
      topText: ['Using gRPC in ASP.NET Core', 'Pluralsight'],
      bottomText: 'The course covers API design using Protocol Buffers, implementing gRPC services and clients (C# and JavaScript), understanding gRPC\'s architectural fit in microservices, and implementing security for gRPC endpoints.'
    },
    {
      certificateImage: wpfMvvm,
      certificateImageLarge: wpfMvvmLarge,
      topText: ['WPF MVVM in Depth', 'Pluralsight'],
      bottomText: 'The course designed to describe the Model-View-ViewModel (MVVM) pattern for building WPF and XAML client applications. The course covers the fundamental concepts, motivations for using the pattern, and practical application to real-world scenarios.'
    }
  ];

  return (
    <Box sx={{ px: '8px', py: 2 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 2,
          alignItems: 'start'
        }}
      >
        {courses.map((course, index) => (
          <PluralsightCard
            key={index}
            certificateImage={course.certificateImage}
            certificateImageLarge={course.certificateImageLarge}
            topText={course.topText}
            bottomText={course.bottomText}
            onImageClick={handleImageClick}
          />
        ))}
      </Box>

      {/* Large Image Modal */}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
        }}
      >
        <Box
          sx={{
            position: 'relative',
            minWidth: '600px',
            minHeight: '400px',
            maxWidth: '90vw',
            maxHeight: '90vh',
            backgroundColor: 'white',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Close button */}
          <IconButton
            onClick={handleCloseModal}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              zIndex: 1,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 1)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Large image */}
          <Box
            sx={{
              flex: 1,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 2,
              backgroundColor: '#f5f5f5',
            }}
          >
            {selectedImage ? (
              <>
                <img
                  src={selectedImage}
                  alt={selectedTitle}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    borderRadius: '4px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  }}
                />
              </>
            ) : (
              <Typography>Loading image...</Typography>
            )}
          </Box>

        </Box>
      </Modal>
    </Box>
  );
}
