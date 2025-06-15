
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Check, X } from 'lucide-react';

interface OTPVerificationProps {
  onSuccess: () => void;
  onBack: () => void;
  email: string;
}

export const OTPVerification: React.FC<OTPVerificationProps> = ({
  onSuccess,
  onBack,
  email,
}) => {
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationState, setVerificationState] = useState<'idle' | 'success' | 'error'>('idle');
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    // Start countdown when component mounts
    setCountdown(60);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleVerify = async () => {
    if (otp.length !== 6) return;

    setIsVerifying(true);
    setVerificationState('idle');

    // Simulate OTP verification
    await new Promise(resolve => setTimeout(resolve, 2000));

    // For demo purposes, accept any 6-digit code
    if (otp === '123456' || otp.length === 6) {
      setVerificationState('success');
      setTimeout(() => {
        onSuccess();
      }, 1000);
    } else {
      setVerificationState('error');
      setOtp('');
    }

    setIsVerifying(false);
  };

  const handleResend = () => {
    setCountdown(60);
    setOtp('');
    setVerificationState('idle');
    console.log('Resending OTP to:', email);
  };

  const getStateColor = () => {
    switch (verificationState) {
      case 'success':
        return 'border-green-500';
      case 'error':
        return 'border-red-500';
      default:
        return '';
    }
  };

  const getStateIcon = () => {
    switch (verificationState) {
      case 'success':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'error':
        return <X className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">Verify Your Email</h3>
        <p className="text-sm text-gray-600">
          We've sent a 6-digit code to{' '}
          <span className="font-medium">{email}</span>
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Enter Verification Code</Label>
          <div className={`flex justify-center ${getStateColor()}`}>
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={setOtp}
              disabled={isVerifying}
            >
              <InputOTPGroup>
                {Array.from({ length: 6 }).map((_, index) => (
                  <InputOTPSlot key={index} index={index} />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>
          <div className="flex justify-center">
            {getStateIcon()}
          </div>
        </div>

        {verificationState === 'error' && (
          <p className="text-sm text-red-600 text-center">
            Invalid verification code. Please try again.
          </p>
        )}

        {verificationState === 'success' && (
          <p className="text-sm text-green-600 text-center">
            Email verified successfully!
          </p>
        )}

        <div className="text-center">
          {countdown > 0 ? (
            <p className="text-sm text-gray-600">
              Resend code in {countdown}s
            </p>
          ) : (
            <button
              onClick={handleResend}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Resend verification code
            </button>
          )}
        </div>
      </div>

      <div className="flex space-x-4">
        <Button type="button" variant="outline" onClick={onBack} className="w-full">
          Back
        </Button>
        <Button
          onClick={handleVerify}
          disabled={otp.length !== 6 || isVerifying}
          className="w-full"
        >
          {isVerifying ? 'Verifying...' : 'Verify'}
        </Button>
      </div>
    </div>
  );
};
