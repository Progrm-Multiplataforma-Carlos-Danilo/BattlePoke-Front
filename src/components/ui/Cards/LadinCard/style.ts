import { colors } from '@/constants/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    overflow: 'hidden',
    width: 260,
    borderWidth: 1,
    borderColor: colors.border,
  },
  imageContainer: {
    height: 220,
    width: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  typeBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  typeText: {
    color: colors.text.primary,
    fontSize: 10,
    fontWeight: 'bold',
  },
  info: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  name: {
    color: colors.text.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  number: {
    color: colors.text.secondary,
    fontSize: 14,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statLabel: {
    color: colors.text.secondary,
    fontSize: 12,
    width: 32,
  },
  statBarBg: {
    flex: 1,
    height: 4,
    backgroundColor: colors.surfaceHighlight,
    borderRadius: 2,
    marginLeft: 8,
  },
  statBarFill: {
    height: '100%',
    borderRadius: 2,
  },
})