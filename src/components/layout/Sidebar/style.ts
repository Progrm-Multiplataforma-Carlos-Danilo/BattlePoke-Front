import { StyleSheet } from "react-native";
import { Colors } from "../../../constants/colors";

export const styles = StyleSheet.create({
 container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 20,
    backgroundColor: 'rgba(18, 18, 20, 0.8)',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    zIndex: 10,
  },
  logo: {
    color: Colors.primary,
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  nav: {
    flexDirection: 'row',
    gap: 32,
  },
  navLink: {
    color: Colors.text.secondary,
    fontSize: 14,
    fontWeight: '500',
  },
  activeLink: {
    color: Colors.primary,
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
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
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
  },
  battleButtonText: {
    color: Colors.text.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
});