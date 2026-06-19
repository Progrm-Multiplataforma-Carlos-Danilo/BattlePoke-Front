import { StyleSheet, Platform } from 'react-native';
import { colors } from '@/constants/colors';
import { fonts } from '@/constants/fonts';

export const styles = StyleSheet.create({
  recordBox: { padding: 8, backgroundColor: colors.surfaceHighlight },
  shadowSm: {
    ...Platform.select({
      ios: { shadowColor: '#586870', shadowOffset: { width: 4, height: 4 }, shadowOpacity: 0.1, shadowRadius: 0 },
      android: { elevation: 3 },
    }),
  },
  recordTitle: {
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    letterSpacing: 1,
    color: colors.text.secondary,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 4,
    marginBottom: 12,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    marginBottom: 8,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderTopColor: 'rgba(0,0,0,0.3)',
    borderLeftColor: 'rgba(0,0,0,0.3)',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
    borderRightColor: 'rgba(255,255,255,0.08)',
  },
  statWin: { backgroundColor: 'rgba(0,210,255,0.12)' },
  statLoss: { backgroundColor: 'rgba(255,77,77,0.12)' },
  statLabel: { fontFamily: fonts.bodyBold, fontSize: 12, letterSpacing: 1 },
  statValue: { fontFamily: fonts.bodyBold, fontSize: 16, color: colors.text.primary },
});
