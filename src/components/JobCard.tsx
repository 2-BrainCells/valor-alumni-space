
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

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

interface JobCardProps {
  job: Job;
  getTechColor: (tech: string) => string;
  index: number;
}

const JobCard = ({ job, getTechColor, index }: JobCardProps) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const truncatedDescription = job.description.length > 100 
    ? job.description.substring(0, 100) + '...' 
    : job.description;

  const getCompanyInitials = (company: string) => {
    return company.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  const getExperienceColor = (level: string) => {
    const colors: Record<string, string> = {
      'Entry Level': 'bg-green-100 text-green-700',
      'Mid Level': 'bg-blue-100 text-blue-700',
      'Senior Level': 'bg-purple-100 text-purple-700',
      'Lead/Principal': 'bg-red-100 text-red-700'
    };
    return colors[level] || 'bg-gray-100 text-gray-700';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
      className="bg-white rounded-lg border border-gray-200 p-6 transition-all duration-200 hover:border-blue-300"
    >
      {/* Header */}
      <div className="flex items-start space-x-4 mb-4">
        {/* Company Logo */}
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          {job.logo ? (
            <img src={job.logo} alt={job.company} className="w-8 h-8" />
          ) : (
            <span className="text-white font-bold text-sm">
              {getCompanyInitials(job.company)}
            </span>
          )}
        </div>
        
        {/* Job Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-lg mb-1 truncate">
            {job.title}
          </h3>
          <p className="text-gray-600 text-sm mb-1">{job.company}</p>
          <p className="text-gray-500 text-sm">{job.location}</p>
        </div>
      </div>

      {/* Salary and Experience */}
      <div className="flex items-center justify-between mb-4">
        <Badge variant="secondary" className="bg-green-100 text-green-700">
          {job.salary}
        </Badge>
        <Badge className={getExperienceColor(job.experience)}>
          {job.experience}
        </Badge>
      </div>

      {/* Tech Stack */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-1">
          {job.techStack.map(tech => (
            <Badge
              key={tech}
              variant="outline"
              className={`text-xs ${getTechColor(tech)}`}
            >
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="mb-4">
        <p className="text-gray-600 text-sm leading-relaxed">
          {showFullDescription ? job.description : truncatedDescription}
        </p>
        {job.description.length > 100 && (
          <button
            onClick={() => setShowFullDescription(!showFullDescription)}
            className="text-blue-600 text-sm font-medium hover:underline mt-1"
          >
            {showFullDescription ? 'Read less' : 'Read more'}
          </button>
        )}
      </div>

      {/* Alumni Info */}
      <div className="flex items-center space-x-2 mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-medium">
            {job.alumni.avatar}
          </span>
        </div>
        <span className="text-sm text-gray-600">
          Posted by <span className="font-medium">{job.alumni.name}</span> (Alumni)
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <Button className="flex-1" size="sm">
          View Details
        </Button>
        <Button variant="outline" className="flex-1" size="sm">
          Request Referral
        </Button>
      </div>
    </motion.div>
  );
};

export default JobCard;
