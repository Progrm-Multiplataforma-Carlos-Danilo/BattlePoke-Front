import { StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

export const styles = StyleSheet.create({
    statusBarSection: {
        marginTop: 4,
    },
    statusBarLabelRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 3,
    },
    statusBarLabel: {
        color: colors.text.tertiary,
        fontSize: 9,
        fontWeight: 'bold',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    statusBarValue: {
        color: colors.text.secondary,
        fontSize: 9,
        fontWeight: 'bold',
    },
    statusBarBg: {
        height: 5,
        backgroundColor: 'rgba(50, 50, 56, 0.8)',
        borderRadius: 3,
        overflow: 'hidden',
    },
    statusBarFill: {
        height: '100%',
        borderRadius: 3,
    },
});
