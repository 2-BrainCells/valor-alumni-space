
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import JobCardSkeleton from './JobCardSkeleton';

const JobFeed = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const jobs = [
    {
      id: 1,
      company: 'Google',
      logo: '🔍',
      title: 'Senior Software Engineer',
      location: 'Mountain View, CA',
      type: 'Full-time',
      posted: '2 days ago',
      tech: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
    },
    {
      id: 2,
      company: 'Microsoft',
      logo: '🪟',
      title: 'Product Manager',
      location: 'Seattle, WA',
      type: 'Full-time',
      posted: '1 week ago',
      tech: ['Azure', 'Agile', 'Data Analysis'],
    },
    {
      id: 3,
      company: 'Meta',
      logo: '👥',
      title: 'Frontend Developer',
      location: 'Menlo Park, CA',
      type: 'Remote',
      posted: '3 days ago',
      tech: ['React', 'JavaScript', 'CSS', 'Next.js'],
    },
  ];

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Latest Job Opportunities</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <JobCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
    >
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Latest Job Opportunities</h2>
      <div className="space-y-4">
        {jobs.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.01 }}
            className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer"
          >
            <div className="flex items-start space-x-4">
              <div className="text-2xl">{job.logo}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{job.title}</h3>
                  <span className="text-xs text-gray-500">{job.posted}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{job.company} • {job.location}</p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {job.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-md">
                    {job.type}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default JobFeed;
