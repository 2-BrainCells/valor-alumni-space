
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
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">John Smith</h1>
              <Badge variant="secondary" className="mb-3">
                Alumni
              </Badge>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onEdit}
              className="flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              Edit Profile
            </Button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                <span className="text-xs font-bold text-blue-600">MIT</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Massachusetts Institute of Technology</p>
                <p className="text-sm text-gray-600">Computer Science</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">Graduated 2022</span>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">Software Engineer at Google</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t">
            <p className="text-sm text-gray-600">
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
