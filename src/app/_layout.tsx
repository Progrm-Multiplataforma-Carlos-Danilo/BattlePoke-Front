import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '../constants/colors';
import Toast from 'react-native-toast-message';
import toastConfig from '@/components/layout/Toast/toastConfig';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.background },
        }}
      />
      <Toast config={toastConfig} />
    </>
  );
}
