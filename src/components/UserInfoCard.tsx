
import React from 'react';
import { motion } from 'framer-motion';
import { Edit, MapPin, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';

interface UserInfoCardProps {
  onEdit: () => void;
}

const UserInfoCard = ({ onEdit }: UserInfoCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">John Smith</h1>
              <Badge variant="secondary" className="mb-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                Alumni
              </Badge>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onEdit}
              className="flex items-center gap-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <Edit className="h-4 w-4" />
              Edit Profile
            </Button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded flex items-center justify-center">
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400">MIT</span>
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">Massachusetts Institute of Technology</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Computer Science</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">Graduated 2022</span>
            </div>

            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">Software Engineer at Google</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Passionate software engineer with expertise in full-stack development. 
              Love building scalable applications and mentoring fellow alumni.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default UserInfoCard;
