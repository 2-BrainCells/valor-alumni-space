
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, WifiOff, CloudOff } from 'lucide-react';
import { Network } from '@capacitor/network';

const NetworkStatusIndicator = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowStatus(true);
      setTimeout(() => setShowStatus(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowStatus(true);
    };

    // Native network monitoring
    const initNetworkListener = async () => {
      try {
        const status = await Network.getStatus();
        setIsOnline(status.connected);

        const listener = await Network.addListener('networkStatusChange', (status) => {
          if (status.connected !== isOnline) {
            setIsOnline(status.connected);
            setShowStatus(true);
            if (status.connected) {
              setTimeout(() => setShowStatus(false), 3000);
            }
          }
        });

        return () => listener.remove();
      } catch (error) {
        // Fallback to web APIs
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        
        return () => {
          window.removeEventListener('online', handleOnline);
          window.removeEventListener('offline', handleOffline);
        };
      }
    };

    let cleanup: (() => void) | undefined;
    
    initNetworkListener().then(cleanupFn => {
      cleanup = cleanupFn;
    });

    return () => {
      if (cleanup) {
        cleanup();
      }
    };
  }, [isOnline]);

  return (
    <AnimatePresence>
      {(showStatus || !isOnline) && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className={`fixed top-0 left-0 right-0 z-50 ${
            isOnline 
              ? 'bg-green-500 text-white' 
              : 'bg-red-500 text-white'
          } px-4 py-2 safe-area-pt`}
        >
          <div className="flex items-center justify-center space-x-2">
            {isOnline ? (
              <Wifi className="h-4 w-4" />
            ) : (
              <WifiOff className="h-4 w-4" />
            )}
            <span className="text-sm font-medium">
              {isOnline ? 'Connection restored' : 'No internet connection'}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NetworkStatusIndicator;
