import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#0A0E14',
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#1A222E',
    backgroundColor: '#0D1117',
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
  },
  
  mainLayout: {
    flex: 1,
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
  },
});