import { StyleSheet, Platform } from 'react-native';
import { colors } from '@/constants/colors';
import { fonts } from '@/constants/fonts';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    padding: 16,
    paddingTop: 32,
    paddingBottom: 48,
    gap: 24,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    backgroundColor: colors.surfaceHighlight,
    borderWidth: 4,
    borderColor: colors.border,
    paddingVertical: 20,
    paddingHorizontal: 24,
    alignItems: 'center',
    gap: 8,
    ...Platform.select({
      ios: { shadowColor: colors.border, shadowOffset: { width: 4, height: 4 }, shadowOpacity: 0.3, shadowRadius: 0 },
      android: { elevation: 4 },
    }),
  },
  headerTitle: {
    fontFamily: fonts.headline,
    fontSize: 24,
    letterSpacing: 2,
    color: colors.primary,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});
