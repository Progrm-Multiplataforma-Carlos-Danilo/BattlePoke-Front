import { StyleSheet, Platform } from 'react-native';
import { colors } from '@/constants/colors';
import { fonts } from '@/constants/fonts';

export const styles = StyleSheet.create({
  section: { padding: 20, backgroundColor: colors.surface },
  shadowLg: {
    ...Platform.select({
      ios: { shadowColor: '#586870', shadowOffset: { width: 8, height: 8 }, shadowOpacity: 0.15, shadowRadius: 0 },
      android: { elevation: 6 },
    }),
  },
  badgesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: colors.border,
    paddingBottom: 8,
    marginBottom: 24,
  },
  headlineMd: {
    fontFamily: fonts.headline,
    fontSize: 24,
    letterSpacing: 1,
    color: colors.text.primary,
  },
  badgesCount: {
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    letterSpacing: 1,
    color: colors.primary,
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 16,
  },
  badge: { width: '22%', alignItems: 'center', gap: 8 },
  badgeCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: colors.border,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 2, height: 2 }, shadowOpacity: 0.2, shadowRadius: 0 },
      android: { elevation: 2 },
    }),
  },
  badgeName: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    letterSpacing: 1,
    color: colors.text.primary,
  },
});
