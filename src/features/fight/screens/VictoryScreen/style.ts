import { colors } from '@/constants/colors';
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const TYPE_COLORS: Record<string, string> = colors.types as any;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0A0E13',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    victoryTitle: {
        fontSize: 52,
        fontWeight: '900',
        color: '#6AC0FF',
        fontStyle: 'italic',
        letterSpacing: 6,
        textShadowColor: 'rgba(106, 192, 255, 0.9)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 25,
    },
    victorySubtitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#FFD700',
        letterSpacing: 4,
        marginTop: 6,
        marginBottom: 25,
    },

    cardWrapper: {
        alignItems: 'center',
        marginBottom: 30,
    },
    imgCard: {
        width: width * 0.55,
        backgroundColor: 'rgba(15, 22, 36, 0.90)',
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: 'rgba(106, 192, 255, 0.25)',
        alignItems: 'center',
        paddingVertical: 18,
        paddingHorizontal: 14,
        shadowColor: '#6AC0FF',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.35,
        shadowRadius: 25,
        elevation: 12,
    },
    pokemonImage: {
        width: 130,
        height: 130,
        borderRadius: 12,
        marginBottom: 12,
    },
    pokemonName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
        letterSpacing: 3,
        marginBottom: 10,
        textTransform: 'uppercase',
    },

    badgesRow: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 14,
    },
    badge: {
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.15)',
    },
    badgeText: {
        color: '#FFF',
        fontSize: 11,
        fontWeight: 'bold',
        letterSpacing: 1,
    },

    rewardsRow: {
        flexDirection: 'row',
        gap: 10,
        paddingHorizontal: 25,
        marginBottom: 30,
    },
    rewardCard: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(15, 22, 36, 0.85)',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
        paddingVertical: 12,
        paddingHorizontal: 12,
        gap: 10,
    },
    rewardIcon: {
        width: 34,
        height: 34,
        borderRadius: 17,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rewardLabel: {
        color: '#8899AA',
        fontSize: 9,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    rewardValue: {
        color: '#FFD700',
        fontSize: 12,
        fontWeight: 'bold',
    },

    buttonsRow: {
        flexDirection: 'row',
        gap: 12,
        position: 'absolute',
        bottom: 50,
    },
    btnPrimary: {
        backgroundColor: '#E63946',
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 6,
        minWidth: 145,
        alignItems: 'center',
    },
    btnSecondary: {
        backgroundColor: 'rgba(255,255,255,0.04)',
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.12)',
        minWidth: 145,
        alignItems: 'center',
    },
    btnText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 12,
        letterSpacing: 1.5,
    },
});