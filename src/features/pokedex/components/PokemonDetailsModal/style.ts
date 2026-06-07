import { StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

export const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContainer: {
        width: '100%',
        maxWidth: 800,
        backgroundColor: colors.surface,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.border,
        overflow: 'hidden',
        maxHeight: '90%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 2,
        backgroundColor: colors.surfaceHighlight,
    },
    headerTitle: {
        color: colors.text.primary,
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    closeButton: {
        padding: 4,
    },
    scrollContent: {
        paddingBottom: 24,
    },
    imageContainer: {
        width: '100%',
        height: 220,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    image: {
        width: '75%',
        height: '75%',
    },
    idBadge: {
        position: 'absolute',
        top: 12,
        left: 12,
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
    },
    idText: {
        color: colors.text.secondary,
        fontSize: 13,
        fontWeight: 'bold',
        fontFamily: 'monospace',
    },
    infoSection: {
        padding: 20,
    },
    pokemonName: {
        color: colors.text.primary,
        fontSize: 26,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
        marginBottom: 12,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
    typesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 8,
        marginBottom: 4,
    },
    typeBadge: {
        paddingHorizontal: 14,
        paddingVertical: 5,
        borderRadius: 20,
        borderWidth: 1,
    },
    typeText: {
        fontSize: 11,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    divider: {
        height: 1,
        backgroundColor: colors.border,
        marginVertical: 16,
    },
    description: {
        color: colors.text.secondary,
        fontSize: 13,
        lineHeight: 20,
        textAlign: 'center',
        fontStyle: 'italic',
    },
    sectionTitle: {
        color: colors.text.primary,
        fontSize: 13,
        fontWeight: 'bold',
        marginBottom: 12,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },

    // Dados físicos
    dataGrid: {
        gap: 8,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: colors.surfaceHighlight,
        borderRadius: 8,
    },
    infoLabel: {
        color: colors.text.secondary,
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    infoValue: {
        color: colors.text.primary,
        fontSize: 13,
        fontWeight: 'bold',
    },

    // Habilidades
    abilitiesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    abilityChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: colors.surfaceHighlight,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
    },
    abilityName: {
        color: colors.text.primary,
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'capitalize',
    },
    hiddenTag: {
        color: colors.text.secondary,
        fontSize: 10,
        fontStyle: 'italic',
    },

    // Evoluções
    evolutionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 4,
    },
    evolutionName: {
        color: colors.text.primary,
        fontSize: 13,
        fontWeight: '600',
        textTransform: 'capitalize',
    },

    // Stats
    statsContainer: {
        gap: 12,
    },
    statRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statLabel: {
        color: colors.text.secondary,
        fontSize: 11,
        fontWeight: 'bold',
        width: 56,
        textTransform: 'uppercase',
    },
    statBarBg: {
        flex: 1,
        height: 8,
        backgroundColor: colors.surfaceHighlight,
        borderRadius: 4,
        marginHorizontal: 10,
        overflow: 'hidden',
    },
    statBarFill: {
        height: '100%',
        borderRadius: 4,
    },
    statValue: {
        color: colors.text.primary,
        fontSize: 12,
        fontWeight: 'bold',
        width: 30,
        textAlign: 'right',
    },
});
