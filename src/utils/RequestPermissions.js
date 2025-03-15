import { Camera } from 'expo-camera';
import { Audio } from 'expo-av';

const requestPermissions = async () => {
  const { status: cameraStatus } = await Camera.requestPermissionsAsync();
  const { status: audioStatus } = await Audio.requestPermissionsAsync();

  if (cameraStatus !== 'granted' || audioStatus !== 'granted') {
    alert('Camera and Microphone permissions are required');
  }
};
