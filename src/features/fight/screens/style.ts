import { colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0a0a12',
    },

    scroll: {
        flexGrow: 1,
    },

    mainContent: {
        flex: 1,
        flexDirection: 'column',
    },

    // ===== TEAM HUBS =====
    teamHubContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: 'rgba(10, 10, 18, 0.95)',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 210, 255, 0.12)',
    },
    teamHub: {
        alignItems: 'center',
        gap: 6,
    },
    teamHubLabel: {
        color: colors.secondary,
        fontSize: 11,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 2,
    },
    teamHubLabelOpponent: {
        color: colors.primary,
    },

    // ===== VS DIVIDER =====
    vsDivider: {
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        backgroundColor: 'rgba(255, 255, 255, 0.04)',
    },
    vsText: {
        color: colors.text.tertiary,
        fontSize: 14,
        fontWeight: 'bold',
        letterSpacing: 4,
    },

    // ===== TEAM THUMBS =====
    teamThumbsRow: {
        flexDirection: 'row',
        gap: 6,
    },
    teamThumb: {
        width: 48,
        height: 48,
        borderRadius: 8,
        backgroundColor: 'rgba(32, 32, 36, 0.8)',
        borderWidth: 1.5,
        borderColor: 'rgba(0, 210, 255, 0.3)',
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    teamThumbActive: {
        borderColor: colors.secondary,
        borderWidth: 2,
        shadowColor: colors.secondary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 8,
        elevation: 6,
    },
    teamThumbOpponent: {
        borderColor: 'rgba(255, 77, 77, 0.3)',
    },
    teamThumbActiveOpponent: {
        borderColor: colors.primary,
        borderWidth: 2,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 8,
        elevation: 6,
    },
    teamThumbImage: {
        width: 38,
        height: 38,
    },

    // ===== BATTLE AREA =====
    battleArea: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingHorizontal: 12,
        paddingVertical: 16,
        gap: 12,
    },

    // ===== POKEMON ACTIVE CARD =====
    activeCardWrapper: {
        flex: 1,
        maxWidth: '48%',
    },
    activeCard: {
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1.5,
        borderColor: 'rgba(0, 210, 255, 0.25)',
        backgroundColor: '#15151f',
    },
    activeCardOpponent: {
        borderColor: 'rgba(255, 77, 77, 0.25)',
    },
    activeCardImageContainer: {
        height: 220,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1a1a2e',
        position: 'relative',
    },
    activeCardImage: {
        width: '85%',
        height: '85%',
    },
    activeCardTypeBadges: {
        position: 'absolute',
        top: 8,
        right: 8,
        flexDirection: 'row',
        gap: 4,
    },

    // ===== POKEMON INFO =====
    activeCardInfo: {
        padding: 12,
        backgroundColor: 'rgba(15, 15, 25, 0.95)',
        gap: 4,
    },
    pokemonNameRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 2,
    },
    pokemonName: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    pokemonSubtitle: {
        color: colors.text.secondary,
        fontSize: 10,
        letterSpacing: 1,
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    bottomBar: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        alignItems: 'center',
        justifyContent: 'center',
      },
      startButton: {
        flexDirection: 'row',
        backgroundColor: colors.secondary,
        paddingVertical: 16,
        paddingHorizontal: 40,
        alignItems: 'center',
        
        gap: 16,
        transform: [{ skewX: '-15deg' }],
        shadowColor: colors.secondary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 15,
        elevation: 8,
      },
      startButtonPressed: {
        shadowOpacity: 0.4,
        shadowRadius: 5,
      },
      startButtonText: {
        fontFamily: fonts.headline,
        fontSize: 28,
        color: colors.background,
        letterSpacing: 2,
        fontStyle: 'italic',
        transform: [{ skewX: '15deg' }],
      },
});