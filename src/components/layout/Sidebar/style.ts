import { StyleSheet, Platform } from "react-native";
import { colors } from "../../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    width: 240,
    height: '100%',
    backgroundColor: '#1C1F26',
    borderLeftWidth: 4,
    paddingVertical: 32,
    justifyContent: 'flex-start',
    zIndex: 10,
  },
  containerClose: {
    width: 80,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  logoContainerClose: {
    justifyContent: 'center',
    paddingHorizontal: 0,
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
  },
  nav: {
    flex: 1,
    flexDirection: 'column',
    gap: 8,
    paddingHorizontal: 16,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 16,
  },
  navItemClose: {
    justifyContent: 'center',
    paddingHorizontal: 0,
  },
  activeNavItem: {
    backgroundColor: colors.secondary, 
  },
  navLink: {
    color: colors.text.secondary,
    fontSize: 15,
    fontWeight: '600',
  },
  activeLink: {
    color: '#000000', 
  },
  DownSection: {
    marginTop: 'auto',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 16,
    paddingHorizontal: 16,
    gap: 12,
  },
  OptionsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  OptionsButtonText: {
    color: colors.text.secondary,
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
});