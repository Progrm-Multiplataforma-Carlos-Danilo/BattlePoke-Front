import { View, Platform, StyleSheet } from 'react-native';
import { Slot } from 'expo-router';
import { Header } from '@/components/layout/Sidebar';
import { Colors } from '@/constants/colors';

export default function DashboardLayout() {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Slot />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
  },
});
