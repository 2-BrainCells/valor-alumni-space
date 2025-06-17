
import { useState, useEffect } from 'react';
import { PushNotifications, Token, PushNotificationSchema, ActionPerformed } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';

export const usePushNotifications = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    const initPushNotifications = async () => {
      try {
        // Request permission
        const permission = await PushNotifications.requestPermissions();
        
        if (permission.receive === 'granted') {
          // Register for push notifications
          await PushNotifications.register();
          setIsRegistered(true);
        }

        // Listen for registration
        PushNotifications.addListener('registration', (token: Token) => {
          setToken(token.value);
          console.log('Push registration success, token: ' + token.value);
        });

        // Listen for registration errors
        PushNotifications.addListener('registrationError', (error: any) => {
          console.error('Push registration error: ', error);
        });

        // Listen for push notifications
        PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
          console.log('Push notification received: ', notification);
          // Handle received notification
        });

        // Listen for notification actions
        PushNotifications.addListener('pushNotificationActionPerformed', (notification: ActionPerformed) => {
          console.log('Push notification action performed', notification);
          // Handle notification tap
        });

      } catch (error) {
        console.error('Error initializing push notifications:', error);
      }
    };

    initPushNotifications();

    return () => {
      PushNotifications.removeAllListeners();
    };
  }, []);

  const sendLocalNotification = async (title: string, body: string) => {
    if (!Capacitor.isNativePlatform()) return;

    try {
      await PushNotifications.schedule({
        notifications: [
          {
            title,
            body,
            id: Date.now(),
            schedule: { at: new Date(Date.now() + 1000) },
          },
        ],
      });
    } catch (error) {
      console.error('Error sending local notification:', error);
    }
  };

  return {
    isRegistered,
    token,
    sendLocalNotification,
  };
};
