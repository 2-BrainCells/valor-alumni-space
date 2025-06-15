
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';

const skillSchema = z.object({
  name: z.string().min(1, 'Skill name is required'),
  proficiency: z.number().min(1).max(5),
});

type SkillFormData = z.infer<typeof skillSchema>;

interface AddSkillModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddSkillModal = ({ isOpen, onClose }: AddSkillModalProps) => {
  const form = useForm<SkillFormData>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      name: '',
      proficiency: 3,
    },
  });

  const onSubmit = (data: SkillFormData) => {
    console.log('Skill added:', data);
    form.reset();
    onClose();
  };

  const ProficiencySelector = ({ value, onChange }: { value: number; onChange: (value: number) => void }) => (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((level) => (
        <button
          key={level}
          type="button"
          onClick={() => onChange(level)}
          className={`w-6 h-6 rounded-full border-2 transition-colors ${
            level <= value
              ? 'bg-blue-500 border-blue-500'
              : 'bg-white border-gray-300 hover:border-gray-400'
          }`}
        />
      ))}
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Skill</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skill Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., React, Python, AWS" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="proficiency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Proficiency Level</FormLabel>
                  <FormControl>
                    <ProficiencySelector
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Add Skill</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSkillModal;
