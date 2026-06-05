import { StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';
import { fonts } from '@/constants/fonts';

export const styles = StyleSheet.create({
  container: {
    gap: 12,
    alignItems: 'center',
    width: '100%',
  },
  startButton: {
    width: '100%',
    paddingVertical: 28,
    backgroundColor: colors.secondary,
    borderWidth: 4,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.border,
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 0,
    elevation: 8,
  },
  startButtonPressed: {
    shadowOffset: { width: 2, height: 2 },
    transform: [{ translateX: 4 }, { translateY: 4 }],
  },
  startButtonText: {
    fontFamily: fonts.headline,
    fontSize: 28,
    letterSpacing: 2,
    color: colors.background,
    textTransform: 'uppercase',
  },
  pulse: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 16,
    height: 16,
    backgroundColor: colors.primary,
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
