
import React, { useReducer } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { OTPVerification } from '@/components/OTPVerification';
import { motion, AnimatePresence } from 'framer-motion';

const step1Schema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const step2Schema = z.object({
  college: z.string().min(1, 'Please select your college'),
  role: z.enum(['student', 'alumni'], {
    required_error: 'Please select your role',
  }),
  graduationYear: z.string().min(4, 'Please enter graduation year'),
});

const step3Schema = z.object({
  skills: z.array(z.string()).min(1, 'Please select at least one skill'),
});

type FormData = z.infer<typeof step1Schema> & z.infer<typeof step2Schema> & z.infer<typeof step3Schema>;

type State = {
  currentStep: number;
  formData: Partial<FormData>;
};

type Action = 
  | { type: 'NEXT_STEP'; data: Partial<FormData> }
  | { type: 'PREV_STEP' }
  | { type: 'RESET' };

const initialState: State = {
  currentStep: 1,
  formData: {},
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'NEXT_STEP':
      return {
        currentStep: Math.min(state.currentStep + 1, 4),
        formData: { ...state.formData, ...action.data },
      };
    case 'PREV_STEP':
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 1),
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

const colleges = [
  'MIT', 'Stanford University', 'Harvard University', 'UC Berkeley', 
  'Carnegie Mellon', 'Georgia Tech', 'Caltech', 'Princeton University'
];

const availableSkills = [
  'React', 'Node.js', 'Python', 'Java', 'JavaScript', 'TypeScript',
  'AWS', 'Docker', 'Kubernetes', 'MongoDB', 'PostgreSQL', 'GraphQL',
  'Machine Learning', 'Data Science', 'DevOps', 'Cybersecurity'
];

const Register = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const step1Form = useForm<z.infer<typeof step1Schema>>({
    resolver: zodResolver(step1Schema),
  });

  const step2Form = useForm<z.infer<typeof step2Schema>>({
    resolver: zodResolver(step2Schema),
  });

  const step3Form = useForm<z.infer<typeof step3Schema>>({
    resolver: zodResolver(step3Schema),
    defaultValues: { skills: [] },
  });

  const onStep1Submit = (data: z.infer<typeof step1Schema>) => {
    dispatch({ type: 'NEXT_STEP', data });
  };

  const onStep2Submit = (data: z.infer<typeof step2Schema>) => {
    dispatch({ type: 'NEXT_STEP', data });
  };

  const onStep3Submit = (data: z.infer<typeof step3Schema>) => {
    dispatch({ type: 'NEXT_STEP', data });
  };

  const handlePrevious = () => {
    dispatch({ type: 'PREV_STEP' });
  };

  const handleOTPSuccess = () => {
    console.log('Registration completed!', state.formData);
    // Handle successful registration
  };

  const renderStep = () => {
    switch (state.currentStep) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <form onSubmit={step1Form.handleSubmit(onStep1Submit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    {...step1Form.register('firstName')}
                  />
                  {step1Form.formState.errors.firstName && (
                    <p className="text-sm text-red-600">{step1Form.formState.errors.firstName.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    {...step1Form.register('lastName')}
                  />
                  {step1Form.formState.errors.lastName && (
                    <p className="text-sm text-red-600">{step1Form.formState.errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  {...step1Form.register('email')}
                />
                {step1Form.formState.errors.email && (
                  <p className="text-sm text-red-600">{step1Form.formState.errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  {...step1Form.register('password')}
                />
                {step1Form.formState.errors.password && (
                  <p className="text-sm text-red-600">{step1Form.formState.errors.password.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  {...step1Form.register('confirmPassword')}
                />
                {step1Form.formState.errors.confirmPassword && (
                  <p className="text-sm text-red-600">{step1Form.formState.errors.confirmPassword.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full">
                Next
              </Button>
            </form>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <form onSubmit={step2Form.handleSubmit(onStep2Submit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="college">College</Label>
                <Select onValueChange={(value) => step2Form.setValue('college', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your college" />
                  </SelectTrigger>
                  <SelectContent>
                    {colleges.map((college) => (
                      <SelectItem key={college} value={college}>
                        {college}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {step2Form.formState.errors.college && (
                  <p className="text-sm text-red-600">{step2Form.formState.errors.college.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Role</Label>
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="student"
                      value="student"
                      {...step2Form.register('role')}
                      className="h-4 w-4 text-blue-600"
                    />
                    <Label htmlFor="student">Student</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="alumni"
                      value="alumni"
                      {...step2Form.register('role')}
                      className="h-4 w-4 text-blue-600"
                    />
                    <Label htmlFor="alumni">Alumni</Label>
                  </div>
                </div>
                {step2Form.formState.errors.role && (
                  <p className="text-sm text-red-600">{step2Form.formState.errors.role.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="graduationYear">Graduation Year</Label>
                <Input
                  id="graduationYear"
                  placeholder="2024"
                  {...step2Form.register('graduationYear')}
                />
                {step2Form.formState.errors.graduationYear && (
                  <p className="text-sm text-red-600">{step2Form.formState.errors.graduationYear.message}</p>
                )}
              </div>

              <div className="flex space-x-4">
                <Button type="button" variant="outline" onClick={handlePrevious} className="w-full">
                  Back
                </Button>
                <Button type="submit" className="w-full">
                  Next
                </Button>
              </div>
            </form>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <form onSubmit={step3Form.handleSubmit(onStep3Submit)} className="space-y-4">
              <div className="space-y-2">
                <Label>Select Your Skills</Label>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                  {availableSkills.map((skill) => (
                    <div key={skill} className="flex items-center space-x-2">
                      <Checkbox
                        id={skill}
                        onCheckedChange={(checked) => {
                          const currentSkills = step3Form.getValues('skills') || [];
                          if (checked) {
                            step3Form.setValue('skills', [...currentSkills, skill]);
                          } else {
                            step3Form.setValue('skills', currentSkills.filter(s => s !== skill));
                          }
                        }}
                      />
                      <Label htmlFor={skill} className="text-sm">
                        {skill}
                      </Label>
                    </div>
                  ))}
                </div>
                {step3Form.formState.errors.skills && (
                  <p className="text-sm text-red-600">{step3Form.formState.errors.skills.message}</p>
                )}
              </div>

              <div className="flex space-x-4">
                <Button type="button" variant="outline" onClick={handlePrevious} className="w-full">
                  Back
                </Button>
                <Button type="submit" className="w-full">
                  Next
                </Button>
              </div>
            </form>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <OTPVerification
              onSuccess={handleOTPSuccess}
              onBack={handlePrevious}
              email={state.formData.email || ''}
            />
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto flex items-center justify-center">
            <span className="text-white font-bold text-xl">AC</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
            <p className="text-gray-600">Step {state.currentStep} of 4</p>
          </div>
          <Progress value={(state.currentStep / 4) * 100} className="w-full" />
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>
          
          <div className="mt-6 text-center">
            <span className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Sign in
              </Link>
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
