import { colors } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.types.fire,
        
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 24,
    },
    headerTitles: {
        flexDirection: 'column',
    },
    title: {
        color: colors.text.primary,
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    subtitle: {
        color: colors.text.secondary,
        fontSize: 12,
        marginTop: 2,
        fontWeight: '600',
    },
    slotsContainer: {
        flex: 1,
        gap: 16,
    },
    pokemonSlot: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.surface,
        borderRadius: 12,
        padding: 12,
        borderWidth: 1,
        borderColor: colors.border,
        borderStyle: 'dashed',
    },
    pokemonSlotFilled: {
        borderStyle: 'solid',
        borderColor: colors.primary,
        backgroundColor: colors.surfaceHighlight,
    },
    slotLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    addIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 8,
        backgroundColor: colors.surfaceHighlight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pokemonImage: {
        width: 48,
        height: 48,
    },
    slotInfo: {
        justifyContent: 'center',
    },
    pokemonName: {
        color: colors.text.primary,
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    pokemonType: {
        color: colors.text.secondary,
        fontSize: 12,
        marginTop: 4,
    },
    placeholderLine1: {
        width: 60,
        height: 8,
        backgroundColor: colors.surfaceHighlight,
        borderRadius: 4,
        marginBottom: 8,
    },
    placeholderLine2: {
        width: 40,
        height: 8,
        backgroundColor: colors.surfaceHighlight,
        borderRadius: 4,
    },
    slotNumber: {
        color: colors.text.secondary,
        fontSize: 16,
        fontWeight: 'bold',
        opacity: 0.5,
    },
    readyButton: {
        backgroundColor: colors.surfaceHighlight,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    readyButtonActive: {
        backgroundColor: colors.primary,
    },
    readyButtonText: {
        color: colors.text.secondary,
        fontSize: 16,
        fontWeight: 'bold',
    },
    readyButtonTextActive: {
        color: colors.text.primary,
    },
});