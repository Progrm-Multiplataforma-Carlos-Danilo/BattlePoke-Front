import { StyleSheet } from "react-native";
import { colors } from "../../../../constants/colors";

export const styles = StyleSheet.create({
 container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 20,
    backgroundColor: 'rgba(18, 18, 20, 0.8)',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    zIndex: 10,
  },
  logo: {
    width: 50,
    height: 50,
  },
  nav: {
    flexDirection: 'row',
    gap: 32,
  },
  navLink: {
    color: colors.text.secondary,
    fontSize: 14,
    fontWeight: '500',
  },
  activeLink: {
    color: colors.primary,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
    paddingBottom: 4,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  bellIcon: {
    padding: 8,
  },
  battleButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
  },
  battleButtonText: {
    color: colors.text.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
});