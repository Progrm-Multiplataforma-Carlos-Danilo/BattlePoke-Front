import { Colors } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.border,
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
        color: Colors.text.primary,
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    subtitle: {
        color: Colors.text.secondary,
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
        backgroundColor: Colors.surface,
        borderRadius: 12,
        padding: 12,
        borderWidth: 1,
        borderColor: Colors.border,
        borderStyle: 'dashed',
    },
    pokemonSlotFilled: {
        borderStyle: 'solid',
        borderColor: Colors.primary,
        backgroundColor: Colors.surfaceHighlight,
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
        backgroundColor: Colors.surfaceHighlight,
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
        color: Colors.text.primary,
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    pokemonType: {
        color: Colors.text.secondary,
        fontSize: 12,
        marginTop: 4,
    },
    placeholderLine1: {
        width: 60,
        height: 8,
        backgroundColor: Colors.surfaceHighlight,
        borderRadius: 4,
        marginBottom: 8,
    },
    placeholderLine2: {
        width: 40,
        height: 8,
        backgroundColor: Colors.surfaceHighlight,
        borderRadius: 4,
    },
    slotNumber: {
        color: Colors.text.secondary,
        fontSize: 16,
        fontWeight: 'bold',
        opacity: 0.5,
    },
    readyButton: {
        backgroundColor: Colors.surfaceHighlight,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    readyButtonActive: {
        backgroundColor: Colors.primary,
    },
    readyButtonText: {
        color: Colors.text.secondary,
        fontSize: 16,
        fontWeight: 'bold',
    },
    readyButtonTextActive: {
        color: Colors.background,
    },
});