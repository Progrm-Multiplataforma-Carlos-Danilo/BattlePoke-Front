import { StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';
import { fonts } from '@/constants/fonts';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  modesRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  modeBtn: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: 4,
    borderColor: colors.border,
    gap: 4,
  },
  modeBtnActive: {
    borderColor: colors.primary,
    backgroundColor: colors.surfaceHighlight,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 4,
  },
  modeBtnText: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    letterSpacing: 1,
    color: colors.text.secondary,
    textTransform: 'uppercase',
  },
  modeBtnTextActive: {
    color: colors.primary,
  },
});
