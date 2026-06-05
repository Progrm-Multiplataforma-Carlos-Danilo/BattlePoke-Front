import { colors } from "@/constants/colors";
import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
      footer: {
        flexDirection: Platform.OS === 'web' ? 'row' : 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '10%',
        paddingVertical: 40,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        backgroundColor: colors.surface,
        gap: 20,
        
    },
    footerLogo: {
        color: colors.text.secondary,
        fontSize: 14,
        fontWeight: 'bold',
        letterSpacing: 2,
    },
    footerRights: {
        color: colors.text.tertiary,
        fontSize: 12,
    },
    footerLinks: {
        flexDirection: 'row',
        gap: 24,
    },
    footerLink: {
        color: colors.text.primary,
        fontSize: 12,
    },
});