import { StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    padding: 16,
    paddingTop: 48,
    paddingBottom: 48,
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'flex-start',
  },
  mainCol: {
    flex: 8,
  },
  sideCol: {
    flex: 4,
    gap: 16,
  },
});
