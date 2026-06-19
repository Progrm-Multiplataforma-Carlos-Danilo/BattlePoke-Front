import { StyleSheet, Platform } from 'react-native';
import { colors } from '@/constants/colors';
import { fonts } from '@/constants/fonts';

export const styles = StyleSheet.create({
  section: { padding: 20, backgroundColor: colors.surface },
  shadowLg: {
    backgroundColor: colors.surface,
    ...Platform.select({
      ios: { shadowColor: '#586870', shadowOffset: { width: 8, height: 8 }, shadowOpacity: 0.15, shadowRadius: 0 },
      android: { elevation: 6 },
    }),
  },

  cardRow: { flexDirection: 'row', gap: 16 },

  avatarColumn: { width: 130 },
  avatarFrame: { padding: 4, backgroundColor: colors.surfaceHighlight, position: 'relative' },
  avatar: { width: '100%', aspectRatio: 1 },
  photoBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 20,
    backgroundColor: colors.surfaceHighlight,
    borderWidth: 2,
    borderColor: colors.border,
    padding: 4,
  },
  pressed: { backgroundColor: colors.primary, transform: [{ translateY: 1 }] },
  eliteTag: { marginTop: 12, backgroundColor: colors.primary, paddingVertical: 4 },
  eliteText: {
    color: colors.text.primary,
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    letterSpacing: 1,
    textAlign: 'center',
  },

  dataColumn: { flex: 1, gap: 16 },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderBottomWidth: 2,
    borderBottomColor: colors.border,
    paddingBottom: 4,
  },
  nameWrap: { flexDirection: 'row', alignItems: 'center' },
  name: {
    fontFamily: fonts.headline,
    fontSize: 24,
    letterSpacing: 1,
    color: colors.primary,
  },

  fieldGrid: { flexDirection: 'row', gap: 16 },
  fieldCol: { flex: 1, gap: 16 },
  fieldLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    letterSpacing: 1,
    color: colors.text.secondary,
  },
  fieldValue: { fontFamily: fonts.bodyBold, fontSize: 16, color: colors.text.primary },

  locationBlock: {
    paddingTop: 16,
    marginTop: 4,
    borderTopWidth: 2,
    borderTopColor: colors.border,
  },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  bodyMd: { fontFamily: fonts.body, fontSize: 14, color: colors.text.primary },

  label: {
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    letterSpacing: 1,
    color: colors.text.secondary,
  },
});
