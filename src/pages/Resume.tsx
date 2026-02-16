import { Box } from '@/components/ui/box';
import { Typography } from '@/components/ui/typography';
import { Paper } from '@/components/ui/paper';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import LanguageIcon from '@mui/icons-material/Language';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useState } from 'react';
import Tooltip from '@/components/ui/tooltip';
import { Download } from 'lucide-react';
import { config } from '@/config';

interface ExperienceEntry {
  title: string;
  company: string;
  location: string;
  period: string;
  website?: string;
  description: string[];
  skills: string[];
}

interface EducationEntry {
  title: string;
  institution: string;
  location: string;
  period?: string;
  courses: string[];
}

const experiences: ExperienceEntry[] = [
  {
    title: 'Software Developer',
    company: 'Independent',
    location: 'Sharon, MA',
    period: '2025 – 2026',
    description: [
      'Building and maintaining multiple software projects while completing data science coursework.',
      'Leveraging AI development tools (Cursor, Lovable, Bolt, GitHub Copilot, Claude AI) to accelerate prototyping and improve code quality.',
      'Developed a modern, interactive portfolio website showcasing professional projects, education, and skills. Built with React, TypeScript, Tailwind CSS and a comprehensive set of modern web technologies. It features responsive navigation, SVG slideshow with fade-in effects, PDF and Excel viewers, several themes with light/darks modes and animation library effects.',
      'Implemented Email Privacy Redactor AI application that automatically detects and redacts sensitive information from both email text and attached images before sending. Built with modern Python web framework (Reflex) and AI technologies (Groq and OCR.space APIs), it ensures your emails remain compliant with privacy regulations while maintaining readability. Supports multiple email providers: Mailpit, Resend API, and SendGrid.',
      'Created several Tableau dashboards providing comprehensive analytics for human resources management, including employee demographics, performance metrics, and organizational insights, featuring interactive visualizations and key performance indicators for HR decision making. Delivered interactive data story exploring the Titanic disaster through passenger data, survival rates, and demographic analysis.',
      'Built interactive Jupyter Notebook dashboard analyzing U.S. pet ownership by state using Panel, Plotly, Matplotlib, and Pandas libraries. Deployed with Docker to Linux on Hugging Face Spaces.'
    ],
    skills: ['React', 'TypeScript', 'Python', 'Reflex', 'Tableau', 'AI Tools'],
  },
  {
    title: 'Senior Software Developer',
    company: 'Dynamo Software',
    location: 'Watertown, MA',
    period: '2024 – 2025',
    website: config.resume.companies.dynamo,
    description: [
      'Communicated with project managers, product owners and development team to facilitate understanding of deliverables, estimates, and prioritization for ASP.NET Core FinTech Research and Portfolio Management SaaS platform solving challenges across the alternative investment landscape.',
      'Delivered Composite benchmarks feature to automatically populate synthetic benchmark values based on the weighted combination of constituent index values (C#, SQL Server).',
      'Developed Dynamic benchmarks for LP clients to compare the performance of their portfolio to the return of a benchmark which automatically took into consideration the changing weight of investment asset classes during the holding period. Created composite investment for each asset class in the account so users could assign a primary benchmark to it and use its portfolio NAV % to reflect exposure category weight for a specific period.',
      'Implemented What-if scenario module which calculated projected portfolio exposures based on selected cash flow and statistics models. The feature took into account not only existing investment positions but also the impact of hypothetical future transactions (ASP.NET Core, REST API, JavaScript).',
      'Created and executed unit tests to ensure the robustness and reliability of the application. Worked closely with QA team to identify issues and devise solutions to them (MSTest).',
      'Provided resolution for tenant issues reported by client support and deployment teams from production and staging application slots.',
    ],
    skills: ['C#', 'ASP.NET Core', 'SQL Server', 'REST API', 'JavaScript', 'MSTest'],
  },
  {
    title: 'Software Engineering Architect',
    company: 'MFS Investment Management',
    location: 'Boston, MA',
    period: '2007 – 2023',
    website: config.resume.companies.mfs,
    description: [
      'Collaborated with other developers, business analysts, and stakeholders to gather requirements and ensure successful migration of Portfolio Modelling Tool into .Net Core trading application responsible for sending 80% of company stock orders to Charles River Investment Management System running in Azure.',
      'Took the lead in designing, architecting, and developing authorization, health check, emailing, client logging, performance recording and data retrieval of Grpc/Web API microservices for the new Modelling Tool.',
      'Following best practices and coding standards implemented generic service API libraries, logging and rule engine components to be utilized in .Net Core services and new Modelling client.',
      'Contributed to the design and architecture of new Modelling Tool screens and workflows, implemented user input validation and business logic functions.',
      'Worked on integration of model approval process with MS Teams located in Azure so portfolio managers can approve or deny portfolio rebalance scenarios.',
      'Led the development of the Mfs Order Management system (MOM) designed for investment portfolio managers and specialists to check pre-trade compliance, validate brokers for IPO orders and send tickets to the CRD trading system (C#).',
      'Developed functionality allowing creation and execution of Total Return and Interest Rate Swaps in MOM for portfolio managers and traders. Incorporated IPO Deals functionality into MOM in order to standardize the Limited Offering order creation process. Enabled options trading in MOM to make the orders for this asset class a subject to pre-trade compliance.',
      'Built robust, performant, and scalable ASP.NET Web services for trading client applications to report the status of nightly jobs, execute pre-trade compliance checks, provide user authentication.',
      'Worked on the company wide initiative of integrating in-house order management client applications into newly adopted CRD Trading System. That included routing equity orders to CRD, performing compliance rule checks in the new trading system and overriding those rules.',
      'Created and improved WCF ETL services used to enable the flow of issuers, orders and unavailable shares into CRD Trading system. Worked on identifying split/merged CRD orders. (IBM MQ, C# Windows service, CRD API, Oracle).',
      'Designed and implemented Portfolio Manager Approval and Plugin services along with several UI add-ins to customize CRD Workbench order modelling. In the process created CRD result sets and workflow rules for trading data retrieval and updates, configured portfolio manager/specialist trading blotter layouts.',
      'Using clean, efficient, and maintainable coding techniques developed a module which provided notifications and approval process for orders created as a result of the Asset Mix re-balance exercise.',
      'Developed SSRS reports with complex compliance and audit related SQL. Created and improved financial data retrieval and persistence stored procedures for in-house orders management systems.',
      'Trying to stay up-to-date with industry trends and technologies designed and put into action Media Gallery single page web application for effective browsing and search of photo and video content (React, .NET Core Web API).',
      'Assisted in troubleshooting/resolution of production issues and ad-hoc data requests coming from the equity trading desk. Provided support for regular disaster recovery exercises, nightly and holiday cycles.',
      'Participated in trading systems upgrades. Ensured compatibility of order management systems with the latest operating systems and database drivers. Maintained high level of security protection by regular password changes for generic database accounts.',
      'Applied fundamentals and principles of agile development by participating in scrum meetings, helping to slice work into Jira stories, filling the backlog with new issues and updating their status on the board as the features are progressing, preparing completed work presentations at the end of each sprint and participating in lessons learned discussions.',
      'Created setup projects in Visual Studio, built installation files using Jenkins, helped release engineering deploy application releases into test and production environments using UrbanCode Deploy.',
      'Focused on product quality and risk mitigation by addressing issues discovered by SonarQube and IBM AppScan Jenkins plugins.',
    ],
    skills: ['C#', '.NET Core', 'gRPC', 'React', 'Oracle', 'Azure', 'Jenkins', 'Agile'],
  },
  {
    title: 'Internet Developer',
    company: 'PG Calc Incorporated',
    location: 'Cambridge, MA',
    period: '2000 – 2007',
    website: config.resume.companies.pgcalc,
    description: [
      'Ported ASP commercial charitable deduction calculator (GiftCalcs) to ASP.NET object-oriented application. Completely redesigned UI and replaced the database provider (ASP.NET, C#, JavaScript, HTML, SQL Server).',
      'Integrated gift presentation slideshow (GiftStory) into GiftCalcs (ASP.NET, Flash). Extended GiftCalcs admin features by adding templated email broadcaster (C#, Windows service).',
      'Implemented Windows service configurable from the OS system tray for handling bulk email files (VB.NET).',
      'Created GiftCalcs database diagrams, documented solution and SQL objects. Developed GiftCalcs InstallShield project and data migration application for rapid deployment to production server.',
      'Designed and implemented charitable deductions Batch Calculator capable of importing a file and producing a spreadsheet of computed results.',
      'Worked in the team of several programmers to migrate a gift planning administration product (GiftWrap) from the procedural into object-oriented application (VB6, SQL Server).',
      'Developed a component to merge GiftWrap database records with the templated PDF tax forms (FDF Toolkit, Adobe Acrobat).',
      'Created Database Manager tool for the customers using MSDE database engine to create users, backup and restore databases (VB6, SQLDMO, OSQL).',
      'Maintained GiftWrap InstallShield project that included several third party modules.',
      'Programmed desktop and web tools for batch generation of GiftWrap authorization codes.',
      'Handled GiftWrap and MSDE installation support issues, resolved application conflict situations and SQL Server connectivity problems, troubleshooted product setup and performance in various system/network configurations.',
      'Developed commercial application to merge GiftWrap databases (C#, SQL Server, HTML).',
      'Implemented company web site resources section, schedule of conferences, planned giving training service calendar and session registration section. Maintained employee sign-in scheduler (ASP).',
      'Extended company site shopping capabilities to promote new products and introduce discounted prices for the existing ones.',
    ],
    skills: ['ASP.NET', 'C#', 'VB.NET', 'SQL Server', 'JavaScript', 'HTML'],
  },
];

const educationEntries: EducationEntry[] = [
  {
    title: 'Kubernetes with Cloud and Data Science Certification',
    institution: 'UNIQUE System Skills',
    location: 'NH',
    courses: [
      'Data Science with Python',
      'Kubernetes',
      'AWS Solution Architect',
      'Python',
      'Tableau',
      'Docker Certified Associate',
    ],
  },
  {
    title: 'Contemporary Applications Development Certification',
    institution: 'Computer Learning Center',
    location: 'MA',
    courses: [
      'Object-oriented programming using C++',
      'Visual Basic',
      'Database programming using MS Access',
      'C programming in UNIX',
      'DOS for programmers',
    ],
  },
  {
    title: 'B.A. in English Language and Literature',
    institution: 'Zaporizhzhia State University',
    location: 'Ukraine',
    courses: [
      'Theoretical Linguistics',
      'Literature and Culture',
      'Translation and Interpretation',
      'Pedagogy and Teaching Methodology',
      'Academic and Research Skills',
    ],
  },
];

export default function Resume() {
  const [expandedExperiences, setExpandedExperiences] = useState<Record<number, boolean>>({ 0: true });
  const [expandedEducation, setExpandedEducation] = useState<Record<number, boolean>>({});
  const [expandedProfessionalDev, setExpandedProfessionalDev] = useState<boolean>(false);

  const professionalDevItems = [
    'Oracle University — Analytic SQL for Data Warehousing',
    'Oracle University — SQL Tuning for Developers',
    'Pluralsight — Build Rich Web Applications with C# using Blazor',
    'Pluralsight — Building a RESTful API with ASP.NET Core',
    'Pluralsight — Building an Async API with ASP.NET Core',
    'Pluralsight — Dependency Injection in ASP.NET Core',
    'Pluralsight — Front-End Web Development With HTML5, CSS, and JavaScript',
    'Pluralsight — Implementing Advanced RESTful Concerns with ASP.NET Core',
    'Pluralsight — JavaScript Objects and Prototypes',
    'Pluralsight — React - The Big Picture',
    'Pluralsight — Using gRPC in ASP.NET Core',
    'Pluralsight — WPF MVVM in Depth',
  ];

  const toggleExperience = (index: number) => {
    setExpandedExperiences((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleEducation = (index: number) => {
    setExpandedEducation((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <Box className="px-0 py-2">
      <Paper elevation={2} className="p-4 rounded-xl bg-card/5">
        <Box className="max-w-6xl mx-auto">
          <Box className="text-center mb-6">
            <Typography variant="h4" as="h2" className="font-bold">
              Vlad Koval
            </Typography>
            <Typography variant="small" className="mt-0.5 text-muted-foreground">
              vkoval@gmail.com | MA
            </Typography>
            <Box className="flex items-center justify-center gap-4 mt-1">
              <Tooltip text="My Projects Website" placement="top">
                <a
                  href={config.resume.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Website"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <LanguageIcon className="w-5 h-5" />
                </a>
              </Tooltip>

              <Tooltip text="My LinkedIn Profile" placement="bottom">
                <a
                  href={config.resume.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <LinkedInIcon className="w-5 h-5" />
                </a>
              </Tooltip>
            </Box>
            <Button
              variant="super3d"
              size="sm"
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/docs/vkoval@gmail.com.Resume.docx';
                link.download = 'Vlad_Koval_Resume.docx';
                link.click();
              }}
              className="mt-2 flex items-center gap-1.5"
            >
              <Download className="h-4 w-4" />
              DOWNLOAD WORD
            </Button>        
          </Box>

          <Box className="flex items-center justify-center my-6">
              <ArrowDownwardIcon className="w-8 h-8 text-primary" />
          </Box>

          <Box>
            <Typography variant="h6" className="font-bold mb-4 text-center">EXPERIENCE</Typography>

            <Box className="space-y-3">
              {experiences.map((exp, index) => (
                <Collapsible
                  key={index}
                  open={expandedExperiences[index] || false}
                  onOpenChange={() => toggleExperience(index)}
                >
                  <Box className="rounded-lg overflow-hidden">
                    <CollapsibleTrigger asChild>
                      <Box
                        className="flex items-center justify-between p-4 cursor-pointer transition-colors rounded-t-lg"
                        style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
                      >
                        <Box className="flex-1">
                          <Typography variant="h6" className="font-bold text-white">
                            {exp.title} @ {exp.company}
                          </Typography>
                          <Typography variant="small" className="text-white/90 mt-1">
                            {exp.period}
                          </Typography>
                        </Box>
                        <Box className="text-white">
                          {expandedExperiences[index] ? (
                            <RemoveIcon className="w-6 h-6" />
                          ) : (
                            <AddIcon className="w-6 h-6" />
                          )}
                        </Box>
                      </Box>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <Box className="p-4 bg-card/50 rounded-b-lg border-t border-border">
                        <Box className="flex items-center gap-4 mb-3 flex-wrap">
                          <Box className="flex items-center gap-1 text-foreground">
                            <LocationOnIcon className="w-4 h-4 text-primary" />
                            <Typography variant="small">{exp.location}</Typography>
                          </Box>
                          {exp.website && (
                            <a
                              href={exp.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-foreground hover:text-primary transition-colors"
                            >
                              <OpenInNewIcon className="w-4 h-4 text-primary" />
                              <Typography variant="small" className="underline">
                                {exp.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                              </Typography>
                            </a>
                          )}
                        </Box>

                        <ul className="triangle-list mt-2 mb-3">
                          {exp.description.map((desc, idx) => (
                            <li key={idx} className="text-foreground">
                              {desc}
                            </li>
                          ))}
                        </ul>

                        {exp.skills.length > 0 && (
                          <Box className="flex flex-wrap gap-2 mt-4">
                            {exp.skills.map((skill, skillIdx) => (
                              <Box
                                key={skillIdx}
                                className="px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/30"
                              >
                                {skill}
                              </Box>
                            ))}
                          </Box>
                        )}
                      </Box>
                    </CollapsibleContent>
                  </Box>
                </Collapsible>
              ))}
            </Box>

            <Box className="flex items-center justify-center my-6">
              <ArrowDownwardIcon className="w-8 h-8 text-primary" />
            </Box>

            <Typography variant="h6" className="font-bold mt-8 mb-4 text-center">SECONDARY EDUCATION</Typography>

            <Box className="space-y-3">
              {educationEntries.map((edu, index) => (
                <Collapsible
                  key={index}
                  open={expandedEducation[index] || false}
                  onOpenChange={() => toggleEducation(index)}
                >
                  <Box className="rounded-lg overflow-hidden">
                    <CollapsibleTrigger asChild>
                      <Box
                        className="flex items-center justify-between p-4 cursor-pointer transition-colors rounded-t-lg"
                        style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
                      >
                        <Box className="flex-1">
                          <Typography variant="h6" className="font-bold text-white">
                            {edu.title} | {edu.institution}
                          </Typography>
                          <Typography variant="small" className="text-white/90 mt-1">
                            {edu.location}
                          </Typography>
                        </Box>
                        <Box className="text-white">
                          {expandedEducation[index] ? (
                            <RemoveIcon className="w-6 h-6" />
                          ) : (
                            <AddIcon className="w-6 h-6" />
                          )}
                        </Box>
                      </Box>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <Box className="p-4 bg-card/50 rounded-b-lg border-t border-border">
                        <ul className="triangle-list mt-2">
                          {edu.courses.map((course, idx) => (
                            <li key={idx} className="text-foreground">
                              {course}
                            </li>
                          ))}
                        </ul>
                      </Box>
                    </CollapsibleContent>
                  </Box>
                </Collapsible>
              ))}
            </Box>
            
            <Box className="flex items-center justify-center my-6">
              <ArrowDownwardIcon className="w-8 h-8 text-primary" />
            </Box>

            <Collapsible
              open={expandedProfessionalDev}
              onOpenChange={setExpandedProfessionalDev}
            >
              <Box className="rounded-lg overflow-hidden">
                <CollapsibleTrigger asChild>
                  <Box
                    className="flex items-center justify-center p-4 cursor-pointer transition-colors rounded-t-lg relative"
                    style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
                  >
                    <Typography variant="h6" className="font-bold text-white text-center">
                      PROFESSIONAL DEVELOPMENT
                    </Typography>
                    <Box className="text-white absolute right-4">
                      {expandedProfessionalDev ? (
                        <RemoveIcon className="w-6 h-6" />
                      ) : (
                        <AddIcon className="w-6 h-6" />
                      )}
                    </Box>
                  </Box>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <Box className="p-4 bg-card/50 rounded-b-lg border-t border-border">
                    <ul className="triangle-list mt-2">
                      {professionalDevItems.map((item, index) => (
                        <li key={index} className="text-foreground">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Box>
                </CollapsibleContent>
              </Box>
            </Collapsible>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
