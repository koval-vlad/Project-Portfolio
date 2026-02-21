import { Box } from '@/components/ui/box';
import { Typography } from '@/components/ui/typography';
import { Paper } from '@/components/ui/paper';
import { ParticleBackground } from '@/components/ui/particle-background';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import TechPill from '@/components/ui/tech-pill';
import { technicalSkills } from '@/lib/technical-skills';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useState, useEffect } from 'react';
import { ButtonMenu } from '@/components/ui/button-menu';
import { Code } from 'lucide-react';
import { config } from '@/config';

export default function Home() {
    const [weather, setWeather] = useState<'sunny' | 'rain' | 'snow'>('sunny');
    const [expandedTechCategories, setExpandedTechCategories] = useState<Record<number, boolean>>({ 
        0: true, // Programming languages
        1: true, // Technologies
        2: true, // Databases
        3: true, // AI Assisted Tools
    });
    const handleCodePreview = () => {
        window.open(config.github.projectPortfolio, '_blank', 'noopener,noreferrer');
    };

    useEffect(() => {
        const savedWeather = localStorage.getItem('homeWeather') as 'sunny' | 'rain' | 'snow';
        if (savedWeather) {
            setWeather(savedWeather);
        }

        // Listen for custom weather change events from header (same tab)
        const handleWeatherChange = (e: CustomEvent) => {
            setWeather(e.detail as 'sunny' | 'rain' | 'snow');
        };

        // Listen for storage changes to update weather when changed in other tabs
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'homeWeather' && e.newValue) {
                setWeather(e.newValue as 'sunny' | 'rain' | 'snow');
            }
        };

        window.addEventListener('weatherChange', handleWeatherChange as EventListener);
        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('weatherChange', handleWeatherChange as EventListener);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const toggleTechCategory = (index: number) => {
        setExpandedTechCategories((prev) => ({ ...prev, [index]: !prev[index] }));
    };

    return (
        <Box className="px-0 py-2 relative min-h-[400px]">
            <ParticleBackground className="absolute inset-0 z-0" weather={weather} />
            <Box className="relative z-10">
                <Paper elevation={2} className="p-2 rounded-xl">
                    <Box className="mb-2 flex items-center py-2 relative">
                        <Box className="flex-1"></Box>
                        <Typography variant="h4" as="h1" className="text-center flex-1">
                            Welcome to Project Portfolio
                        </Typography>
                        <Box className="flex-1 flex justify-end">
                            <ButtonMenu
                                label="View"
                                items={[
                                    {
                                        label: 'Code',
                                        icon: <Code className="h-3.5 w-3.5" />,
                                        onSelect: handleCodePreview,
                                    },
                                ]}
                            />
                        </Box>
                    </Box>                    
                    <Typography variant="p" className="mb-4 px-12">
                        I am an Enterprise level Application Development professional with working experience in Financial/Investment Management Software
                        Industry. Proficient in application and database development with solid understanding of software architecture and design
                        principles. Excellent problem-solving and debugging, communication and collaboration as well as customer support skills.
                        This is a portfolio of my professional and personal applications demonstrating full-stack programming capabilities.
                        Use the navigation menu above to explore different sections of my work. Feel free to contact me for any questions or opportunities.
                    </Typography>
                    <Box className="flex items-center justify-center my-6">
                        <ArrowDownwardIcon className="w-8 h-8 text-primary" />
                    </Box>
                    <Typography variant="h6" className="font-bold mb-3 mt-6 text-center">
                       MY TECHNICAL SKILLS SET
                    </Typography>
                    <Box className="mt-3 max-w-6xl mx-auto space-y-3">
                        {technicalSkills.map(({ category, items }, index) => (
                            <Collapsible
                                key={category}
                                open={expandedTechCategories[index] || false}
                                onOpenChange={() => toggleTechCategory(index)}
                            >
                                <Box className="rounded-lg overflow-hidden">
                                    <CollapsibleTrigger asChild>
                                        <Box
                                            className="flex items-center justify-between p-4 cursor-pointer transition-colors rounded-t-lg"
                                            style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
                                        >
                                            <Typography variant="h6" className="font-bold text-white">
                                                {category}
                                            </Typography>
                                            <Box className="text-white">
                                                {expandedTechCategories[index] ? (
                                                    <RemoveIcon className="w-6 h-6" />
                                                ) : (
                                                    <AddIcon className="w-6 h-6" />
                                                )}
                                            </Box>
                                        </Box>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <Box className="p-4 bg-card/50 rounded-b-lg border-t border-border">
                                            <div className="flex flex-wrap gap-2">
                                                {items.map((tech) => (
                                                    <TechPill key={tech.name} name={tech.name} imageUrl={tech.img} />
                                                ))}
                                            </div>
                                        </Box>
                                    </CollapsibleContent>
                                </Box>
                            </Collapsible>
                        ))}
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
}
