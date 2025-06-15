
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Coins, Check, X, AlertCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Separator } from './ui/separator';

interface ReferralPurchaseFlowProps {
  isOpen: boolean;
  onClose: () => void;
  referralCost: number;
  userBalance: number;
  companyName: string;
  positionTitle: string;
}

type FlowStep = 'breakdown' | 'confirmation' | 'processing' | 'success' | 'insufficient';

const ReferralPurchaseFlow: React.FC<ReferralPurchaseFlowProps> = ({
  isOpen,
  onClose,
  referralCost,
  userBalance,
  companyName,
  positionTitle,
}) => {
  const [currentStep, setCurrentStep] = useState<FlowStep>('breakdown');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePurchase = () => {
    if (userBalance < referralCost) {
      setCurrentStep('insufficient');
      return;
    }

    setCurrentStep('confirmation');
  };

  const confirmPurchase = () => {
    setCurrentStep('processing');
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setCurrentStep('success');
      
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 2000);
  };

  const handleClose = () => {
    setCurrentStep('breakdown');
    onClose();
  };

  const renderBreakdown = () => (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">Purchase Referral</h3>
        <p className="text-gray-600">
          Get direct access to <span className="font-medium">{positionTitle}</span> at{' '}
          <span className="font-medium">{companyName}</span>
        </p>
      </div>

      <Card className="bg-gray-50">
        <CardContent className="p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span>Referral Access</span>
            <span className="font-medium">{referralCost} coins</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Platform Fee</span>
            <span className="font-medium">0 coins</span>
          </div>
          <Separator />
          <div className="flex justify-between items-center font-semibold">
            <span>Total</span>
            <span className="text-blue-600">{referralCost} coins</span>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
        <div className="flex items-center gap-2">
          <Coins className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium">Your Balance</span>
        </div>
        <span className="font-semibold text-blue-600">{userBalance} coins</span>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={handleClose} className="flex-1">
          Cancel
        </Button>
        <Button onClick={handlePurchase} className="flex-1">
          Continue
        </Button>
      </div>
    </div>
  );

  const renderConfirmation = () => (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <AlertCircle className="h-12 w-12 text-orange-500 mx-auto" />
        <h3 className="text-lg font-semibold">Confirm Purchase</h3>
        <p className="text-gray-600">
          You're about to spend <span className="font-medium">{referralCost} coins</span> for this referral
        </p>
      </div>

      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="p-4 text-center">
          <p className="text-sm text-orange-800">
            This action cannot be undone. Make sure you're ready to connect with the referrer.
          </p>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button 
          variant="outline" 
          onClick={() => setCurrentStep('breakdown')} 
          className="flex-1"
        >
          Go Back
        </Button>
        <Button onClick={confirmPurchase} className="flex-1">
          Confirm Purchase
        </Button>
      </div>
    </div>
  );

  const renderProcessing = () => (
    <div className="space-y-4 text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"
      />
      <div>
        <h3 className="text-lg font-semibold">Processing Payment</h3>
        <p className="text-gray-600">Please wait while we process your transaction...</p>
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="space-y-4 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.6 }}
        className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto"
      >
        <Check className="h-8 w-8 text-green-600" />
      </motion.div>
      
      <div>
        <h3 className="text-lg font-semibold text-green-600">Purchase Successful!</h3>
        <p className="text-gray-600">
          You now have access to the referral for {positionTitle} at {companyName}
        </p>
      </div>

      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4">
          <p className="text-sm text-green-800">
            Check your messages for contact details and next steps.
          </p>
        </CardContent>
      </Card>

      <Button onClick={handleClose} className="w-full">
        Continue
      </Button>
    </div>
  );

  const renderInsufficientFunds = () => (
    <div className="space-y-4 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.6 }}
        className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto"
      >
        <X className="h-8 w-8 text-red-600" />
      </motion.div>
      
      <div>
        <h3 className="text-lg font-semibold text-red-600">Insufficient Balance</h3>
        <p className="text-gray-600">
          You need {referralCost - userBalance} more coins to purchase this referral
        </p>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <p className="text-sm text-blue-800">
            Earn more coins by connecting with alumni, daily check-ins, and completing achievements.
          </p>
        </CardContent>
      </Card>

      <Button onClick={handleClose} className="w-full">
        Earn More Coins
      </Button>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'breakdown':
        return renderBreakdown();
      case 'confirmation':
        return renderConfirmation();
      case 'processing':
        return renderProcessing();
      case 'success':
        return renderSuccess();
      case 'insufficient':
        return renderInsufficientFunds();
      default:
        return renderBreakdown();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        {currentStep === 'breakdown' && (
          <DialogHeader>
            <DialogTitle>Purchase Referral</DialogTitle>
          </DialogHeader>
        )}
        {renderCurrentStep()}
      </DialogContent>
    </Dialog>
  );
};

export default ReferralPurchaseFlow;
