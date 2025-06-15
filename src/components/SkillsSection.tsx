
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import AddSkillModal from './AddSkillModal';

const SkillsSection = () => {
  const [isAddSkillModalOpen, setIsAddSkillModalOpen] = useState(false);

  const skills = [
    { name: 'React', proficiency: 5, color: 'bg-blue-500' },
    { name: 'TypeScript', proficiency: 4, color: 'bg-blue-600' },
    { name: 'Node.js', proficiency: 4, color: 'bg-green-500' },
    { name: 'Python', proficiency: 3, color: 'bg-yellow-500' },
    { name: 'AWS', proficiency: 3, color: 'bg-orange-500' },
    { name: 'Docker', proficiency: 2, color: 'bg-cyan-500' },
  ];

  const ProficiencyDots = ({ level }: { level: number }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((dot) => (
        <div
          key={dot}
          className={`w-2 h-2 rounded-full ${
            dot <= level ? 'bg-blue-500' : 'bg-gray-200'
          }`}
        />
      ))}
    </div>
  );

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Skills & Technologies</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAddSkillModalOpen(true)}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Skills
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="secondary"
                      className={`${skill.color} text-white border-0`}
                    >
                      {skill.name}
                    </Badge>
                  </div>
                  <ProficiencyDots level={skill.proficiency} />
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <AddSkillModal
        isOpen={isAddSkillModalOpen}
        onClose={() => setIsAddSkillModalOpen(false)}
      />
    </>
  );
};

export default SkillsSection;
