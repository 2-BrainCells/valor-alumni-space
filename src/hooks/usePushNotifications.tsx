
import { useState, useEffect } from 'react';
import { PushNotifications, PushNotificationSchema, ActionPerformed } from '@capacitor/push-notifications';

const usePushNotifications = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const initializePushNotifications = async () => {
      try {
        // Request permission
        const permission = await PushNotifications.requestPermissions();
        
        if (permission.receive === 'granted') {
          setIsEnabled(true);
          
          // Register for push notifications
          await PushNotifications.register();
          
          // Listen for registration
          PushNotifications.addListener('registration', (token) => {
            setToken(token.value);
          });
          
          // Listen for push notifications
          PushNotifications.addListener('pushNotificationReceived', (notification) => {
            console.log('Push notification received:', notification);
          });
          
          // Listen for push notification actions
          PushNotifications.addListener('pushNotificationActionPerformed', (notification: ActionPerformed) => {
            console.log('Push notification action performed:', notification);
          });
        }
      } catch (error) {
        console.error('Push notification initialization failed:', error);
      }
    };

    initializePushNotifications();

    return () => {
      PushNotifications.removeAllListeners();
    };
  }, []);

  return {
    isEnabled,
    token,
  };
};

export default usePushNotifications;
