
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import JobCard from './JobCard';
import EmptyState from './EmptyState';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  experience: string;
  techStack: string[];
  description: string;
  alumni: {
    name: string;
    avatar: string;
  };
  logo?: string;
}

interface Filters {
  techStack: string[];
  experience: string;
  location: string;
}

const JobPostsFeed = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [filters, setFilters] = useState<Filters>({
    techStack: [],
    experience: '',
    location: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement>(null);

  const techStackOptions = ['React', 'Node.js', 'Python', 'Java', 'TypeScript', 'Angular', 'Vue.js', 'Docker'];
  const experienceOptions = ['Entry Level', 'Mid Level', 'Senior Level', 'Lead/Principal'];
  const locationOptions = ['Remote', 'New York', 'San Francisco', 'Seattle', 'Boston', 'Austin'];

  // Mock data
  const mockJobs: Job[] = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      salary: '$120k - $160k',
      experience: 'Senior Level',
      techStack: ['React', 'TypeScript', 'Node.js'],
      description: 'We are looking for a senior frontend developer to join our growing team. You will be responsible for building scalable web applications...',
      alumni: { name: 'Sarah Chen', avatar: 'SC' }
    },
    {
      id: 2,
      title: 'Full Stack Engineer',
      company: 'InnovateLabs',
      location: 'Remote',
      salary: '$100k - $140k',
      experience: 'Mid Level',
      techStack: ['Python', 'React', 'Docker'],
      description: 'Join our innovative team to build cutting-edge products that impact millions of users worldwide...',
      alumni: { name: 'Mike Johnson', avatar: 'MJ' }
    },
    {
      id: 3,
      title: 'Backend Developer',
      company: 'DataFlow',
      location: 'New York, NY',
      salary: '$90k - $120k',
      experience: 'Mid Level',
      techStack: ['Java', 'Python', 'Docker'],
      description: 'Looking for a passionate backend developer to work on our data processing infrastructure...',
      alumni: { name: 'Alex Rivera', avatar: 'AR' }
    }
  ];

  // Load initial jobs
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setJobs(mockJobs);
      setFilteredJobs(mockJobs);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter jobs
  useEffect(() => {
    let filtered = jobs;

    if (filters.techStack.length > 0) {
      filtered = filtered.filter(job =>
        filters.techStack.some(tech => job.techStack.includes(tech))
      );
    }

    if (filters.experience) {
      filtered = filtered.filter(job => job.experience === filters.experience);
    }

    if (filters.location) {
      filtered = filtered.filter(job => job.location.includes(filters.location));
    }

    setFilteredJobs(filtered);
  }, [filters, jobs]);

  // Infinite scroll
  const loadMoreJobs = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);
    setTimeout(() => {
      const newJobs = mockJobs.map(job => ({ ...job, id: job.id + jobs.length }));
      setJobs(prev => [...prev, ...newJobs]);
      setLoading(false);
      if (jobs.length > 20) setHasMore(false);
    }, 1000);
  }, [loading, hasMore, jobs.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreJobs();
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [loadMoreJobs]);

  const toggleTechFilter = (tech: string) => {
    setFilters(prev => ({
      ...prev,
      techStack: prev.techStack.includes(tech)
        ? prev.techStack.filter(t => t !== tech)
        : [...prev.techStack, tech]
    }));
  };

  const clearFilters = () => {
    setFilters({
      techStack: [],
      experience: '',
      location: ''
    });
  };

  const getTechColor = (tech: string) => {
    const colors: Record<string, string> = {
      'React': 'bg-blue-100 text-blue-700',
      'Node.js': 'bg-green-100 text-green-700',
      'Python': 'bg-purple-100 text-purple-700',
      'Java': 'bg-orange-100 text-orange-700',
      'TypeScript': 'bg-indigo-100 text-indigo-700',
      'Angular': 'bg-red-100 text-red-700',
      'Vue.js': 'bg-emerald-100 text-emerald-700',
      'Docker': 'bg-cyan-100 text-cyan-700'
    };
    return colors[tech] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Job Opportunities</h1>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex">
        {/* Filter Sidebar */}
        <AnimatePresence>
          {showFilters && (
            <motion.aside
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              className="w-80 bg-white border-r border-gray-200 p-6 space-y-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Tech Stack */}
              <div>
                <h3 className="font-medium mb-3">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {techStackOptions.map(tech => (
                    <Badge
                      key={tech}
                      variant={filters.techStack.includes(tech) ? "default" : "outline"}
                      className="cursor-pointer hover:bg-blue-100"
                      onClick={() => toggleTechFilter(tech)}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Experience Level */}
              <div>
                <h3 className="font-medium mb-3">Experience Level</h3>
                <Select
                  value={filters.experience}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, experience: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    {experienceOptions.map(level => (
                      <SelectItem key={level} value={level}>{level}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Location */}
              <div>
                <h3 className="font-medium mb-3">Location</h3>
                <Select
                  value={filters.location}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, location: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locationOptions.map(location => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Clear Filters */}
              <Button
                variant="outline"
                onClick={clearFilters}
                className="w-full"
              >
                Clear Filters
              </Button>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className={`flex-1 p-6 transition-all duration-300 ${showFilters ? 'ml-0' : ''}`}>
          {filteredJobs.length === 0 && !loading ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredJobs.map((job, index) => (
                <JobCard
                  key={job.id}
                  job={job}
                  getTechColor={getTechColor}
                  index={index}
                />
              ))}
            </div>
          )}

          {/* Loading indicator for infinite scroll */}
          <div ref={observerRef} className="h-10 flex items-center justify-center mt-6">
            {loading && (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600" />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default JobPostsFeed;
