import { colors } from '@/constants/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  listContent: {
    paddingBottom: 12,
  },
  itemWrapper: {
    flex: 1,
    position: 'relative',
    maxWidth: '30%',
    paddingHorizontal: 6,
    paddingVertical: 6,
    marginBottom: 12,
  },
  backgroundTypes: {
    position: 'absolute',
    top: -2,
    left: 2,
    right: 2,
    bottom: 10,
    zIndex: -1,
    borderRadius: 20,
    overflow: 'hidden',
    flexDirection: 'row',
    opacity: 0.5
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    overflow: 'hidden',
    width: '100%',
    borderWidth: 1,
    borderColor: colors.border,
  },
  imageContainer: {
    height: 150,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#303030',
  },
  image: {
    width: '100%',
    height: '100%',
  },

  typesContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    gap: 4,
  },


  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  typeBackground: {
    flex: 1,
    height: '100%'
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