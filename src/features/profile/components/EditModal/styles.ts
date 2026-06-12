import { StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

export const editStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  box: {
    width: '100%',
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 20,
    gap: 16,
  },
  title: {
    fontFamily: 'SpaceMono_700Bold',
    fontSize: 13,
    letterSpacing: 1,
    color: colors.text.primary,
    textTransform: 'uppercase',
  },
  input: {
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.surfaceHighlight,
    color: colors.text.primary,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
  },
  cancelText: {
    fontFamily: 'SpaceMono_700Bold',
    fontSize: 12,
    color: colors.text.secondary,
  },
  confirmBtn: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  confirmText: {
    fontFamily: 'SpaceMono_700Bold',
    fontSize: 12,
    color: colors.text.primary,
  },
});