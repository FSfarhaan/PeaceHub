import * as Notifications from 'expo-notifications';
import { Platform, Alert } from 'react-native';

export async function requestPermissions() {
  const { status } = await Notifications.getPermissionsAsync();
  
  if (status !== 'granted') {
    const { status: newStatus } = await Notifications.requestPermissionsAsync();
    if (newStatus !== 'granted') {
      Alert.alert('Permission Denied', 'Please allow notifications in settings.');
      return null;
    }
  }

  return await Notifications.getExpoPushTokenAsync();
}

export async function getPushToken() {
    try {
      const token = await requestPermissions();
      if (!token) return;
  
      console.log('Expo Push Token:', token.data); // Save this token in your backend
      return token.data;
    } catch (error) {
      console.error('Error getting push token:', error);
    }
  }

  // 📌 Handle incoming notifications
export function setupNotificationHandlers() {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
  
    // Listen when notification is received (App in Foreground)
    Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received:', notification);
    });
  
    // Listen when user taps the notification (App in Background/Closed)
    Notifications.addNotificationResponseReceivedListener(response => {
      console.log('User interacted with notification:', response);
    });
  }
  