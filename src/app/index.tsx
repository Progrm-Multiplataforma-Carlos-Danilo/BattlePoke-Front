import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, Pressable, Image, Platform } from 'react-native';
import { colors } from '../constants/colors';
import { Navbar } from '../components/layout/Landinpage/Navbar';
import { HoverButton } from '../components/ui/Buttons/HoverButton';
import { Footer } from '@/components/layout/Footer';
import { LadinCard } from '@/components/ui/Cards/LadinCard/LadinCard';


export default function LandingPage() {
    return (
        <View style={styles.container}>
            <Navbar />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <ImageBackground
                    source={require('../../assets/images/hero.png')}
                    style={styles.heroBackground}
                >
                    <View style={styles.heroOverlay}>
                        <View style={styles.heroContent}>
                            <Text style={styles.heroTitle}>DOMINE A ARENA <Text style={{ color: colors.secondary }}>COMO MESTRE POKÉMON</Text></Text>
                            <Text style={styles.heroSubtitle}>
                                Prepare sua estratégia, escolha seus pokémon e entre na arena para enfrentar os melhores treinadores do mundo.
                                Sinta a adrenalina, domine cada movimento e alcance a glória eterna!
                            </Text>

                            <View style={styles.heroButtons}>
                                <HoverButton
                                    style={styles.primaryButton}
                                    hoverStyle={styles.primaryButtonHovered}
                                >
                                    <Text style={styles.primaryButtonText}>BATALHAR AGORA</Text>
                                </HoverButton>
                                <HoverButton
                                    style={styles.secondaryButton}
                                    hoverStyle={styles.secondaryButtonHovered}
                                >
                                    <Text style={styles.secondaryButtonText}>VER DETALHES</Text>
                                </HoverButton>
                            </View>
                        </View>
                    </View>
                </ImageBackground>

                <View style={styles.mainContent}>
                    <View style={styles.section}>
                        <View style={styles.progressHeader}>
                            <View style={{ flex: 1, paddingRight: 40 }}>
                                <Text style={styles.sectionTitle}>TORNEIOS PROGRESSIVOS</Text>
                                <Text style={styles.sectionSubtitle}>
                                    Acompanhe a temporada atual. Suba de nível ao completar desafios e
                                    vença torneios para desbloquear recompensas lendárias e cosméticos
                                    exclusivos para o seu avatar.
                                </Text>

                                <View style={styles.progressBarContainer}>
                                    <View style={styles.progressBarHeader}>
                                        <Text style={styles.progressText}>PROGRESSO DA TEMPORADA</Text>
                                        <Text style={styles.progressPercent}>74%</Text>
                                    </View>
                                    <View style={styles.progressBarBg}>
                                        <View style={[styles.progressBarFill, { width: '74%' }]} />
                                    </View>
                                </View>

                                <View style={styles.statsRow}>
                                    <View style={styles.statBox}>
                                        <Text style={styles.statValue}>10</Text>
                                        <Text style={styles.statLabel}>DIAS RESTANTES</Text>
                                    </View>
                                    <View style={styles.statBox}>
                                        <Text style={[styles.statValue, { color: colors.primary }]}>ELITE</Text>
                                        <Text style={styles.statLabel}>RANK ATUAL</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.tournamentCards}>
                                <View style={[styles.tournamentCard, { borderColor: colors.secondary }]}>
                                    <Text style={styles.tournamentIcon}>🏆</Text>
                                    <Text style={styles.tournamentName}>Copa Battle Poke</Text>
                                    <Text style={styles.tournamentPrize}>Prêmio: </Text>
                                </View>

                                <View style={[styles.tournamentCard, { borderColor: colors.rankings.gold }]}>
                                    <Text style={styles.tournamentIcon}>👑</Text>
                                    <Text style={styles.tournamentName}>Global Finals</Text>
                                    <Text style={styles.tournamentPrize}>Prêmio: Leg. Mystery Box</Text>
                                </View>
                                <View style={[styles.tournamentCard, { borderColor: colors.border, opacity: 0.5 }]}>
                                    <Text style={[styles.tournamentName, { textAlign: 'center', marginTop: 10 }]}>EM BREVE...</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.section, styles.centerSection]}>
                        <Text style={[styles.sectionTitle, { textAlign: 'center' }]}>GLOBAL RANKINGS</Text>
                        <View style={styles.podium}>

                            <View style={[styles.podiumItem, { height: 200 }]}>
                                <View style={[styles.avatarRing, { borderColor: colors.rankings.silver }]}>
                                    <View style={styles.avatarPlaceholder} />
                                </View>
                                <Text style={styles.podiumName}>C-pher01</Text>
                                <Text style={styles.podiumPoints}>2.850 PT</Text>
                                <View style={[styles.podiumBase, { backgroundColor: '#2C2C35' }]}>
                                    <Text style={styles.podiumRank}>2</Text>
                                </View>
                            </View>

                            <View style={[styles.podiumItem, { height: 260 }]}>
                                <Text style={styles.crown}>👑</Text>
                                <View style={[styles.avatarRing, { borderColor: colors.primary, width: 80, height: 80, borderRadius: 40 }]}>
                                    <View style={styles.avatarPlaceholder} />
                                </View>
                                <Text style={styles.podiumName}>RedMaster</Text>
                                <Text style={styles.podiumPoints}>3.120 PT</Text>
                                <View style={[styles.podiumBase, { backgroundColor: '#3A2A2A', height: 120 }]}>
                                    <Text style={styles.podiumRank}>1</Text>
                                </View>
                            </View>

                            <View style={[styles.podiumItem, { height: 180 }]}>
                                <View style={[styles.avatarRing, { borderColor: colors.rankings.bronze }]}>
                                    <View style={styles.avatarPlaceholder} />
                                </View>
                                <Text style={styles.podiumName}>NovaTactics</Text>
                                <Text style={[styles.podiumPoints, { color: colors.rankings.gold }]}>2.640 PT</Text>
                                <View style={[styles.podiumBase, { backgroundColor: '#353520', height: 60 }]}>
                                    <Text style={styles.podiumRank}>3</Text>
                                </View>
                            </View>

                        </View>
                    </View>


                    <View style={styles.section}>
                        <View style={styles.pokedexHeader}>
                            <View>
                                <Text style={styles.sectionTitle}>POKEDEX</Text>
                                <Text style={styles.sectionSubtitle}>Explore as estatísticas da sua equipe de elite.</Text>
                            </View>
                            <TouchableOpacity>
                                <Text style={styles.viewAllText}>VER TODA A LISTA →</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pokemonGrid}>
                            <LadinCard
                                name="CHARIZARD" number="#006" type="FIRE" typeColor={colors.types.fire}
                                image={require('../../assets/images/charizard.png')}
                                atk={90} def={60} spd={80}
                            />
                             <LadinCard
                                name="BLASTOISE" number="#009" type="WATER" typeColor={colors.types.water}
                                image={require('../../assets/images/blastoise.png')}
                                atk={70} def={95} spd={50}
                            />
                             <LadinCard
                                name="PIKACHU" number="#025" type="ELECTRIC" typeColor={colors.types.electric}
                                image={require('../../assets/images/pikachu.png')}
                                atk={65} def={45} spd={95}
                            />
                             <LadinCard
                                name="MEWTWO" number="#150" type="PSYCHIC" typeColor={colors.types.psychic}
                                image={require('../../assets/images/mewtwo.png')}
                                atk={98} def={75} spd={90}
                            />
                        </ScrollView>
                    </View>
                </View>
                <Footer />
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollContent: {
        flexGrow: 1,
    },
    heroBackground: {
        width: '100%',
        height: 600,
        justifyContent: 'center',
    },
    heroOverlay: {
        flex: 1,
        backgroundColor: 'rgba(18, 18, 20, 0.6)',
        justifyContent: 'center',
        paddingHorizontal: '10%',
    },
    heroContent: {
        maxWidth: 600,
    },
    heroTitle: {
        fontSize: 48,
        fontWeight: '900',
        color: colors.text.primary,
        marginBottom: 16,
    },
    heroSubtitle: {
        fontSize: 16,
        color: colors.text.secondary,
        lineHeight: 24,
        marginBottom: 32,
    },
    heroButtons: {
        flexDirection: 'row',
        gap: 16,
    },
    primaryButton: {
        backgroundColor: colors.primary,
        paddingHorizontal: 32,
        paddingVertical: 14,
        borderRadius: 8,
    },
    primaryButtonHovered: {
        backgroundColor: colors.primaryHover,
        transform: [{ scale: 1.05 }],
    },
    primaryButtonText: {
        color: colors.text.primary,
        fontWeight: 'bold',
    },
    secondaryButton: {
        borderWidth: 1,
        borderColor: colors.border,
        paddingHorizontal: 32,
        paddingVertical: 14,
        borderRadius: 8,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    secondaryButtonHovered: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        transform: [{ scale: 1.05 }],
    },
    secondaryButtonText: {
        color: colors.text.primary,
        fontWeight: 'bold',
    },
    mainContent: {
        paddingHorizontal: '10%',
        paddingVertical: 64,
    },
    section: {
        marginBottom: 80,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.text.primary,
        letterSpacing: 2,
        marginBottom: 16,
    },
    sectionSubtitle: {
        fontSize: 14,
        color: colors.text.secondary,
        lineHeight: 22,
        marginBottom: 32,
        maxWidth: 600,
    },
    progressHeader: {
        flexDirection: Platform.OS === 'web' ? 'row' : 'column',
        justifyContent: 'space-between',
    },
    progressBarContainer: {
        marginBottom: 24,
    },
    progressBarHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    progressText: {
        color: colors.text.primary,
        fontSize: 12,
        fontWeight: 'bold',
    },
    progressPercent: {
        color: colors.secondary,
        fontSize: 12,
        fontWeight: 'bold',
    },
    progressBarBg: {
        height: 8,
        backgroundColor: colors.surfaceHighlight,
        borderRadius: 4,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: colors.secondary,
        borderRadius: 4,
    },
    statsRow: {
        flexDirection: 'row',
        gap: 16,
    },
    statBox: {
        backgroundColor: colors.surfaceHighlight,
        padding: 16,
        borderRadius: 8,
        flex: 1,
        alignItems: 'center',
    },
    statValue: {
        color: colors.text.primary,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    statLabel: {
        color: colors.text.secondary,
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    tournamentCards: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
        marginTop: Platform.OS === 'web' ? 0 : 32,
    },
    tournamentCard: {
        width: Platform.OS === 'web' ? '45%' : '100%',
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderRadius: 12,
        padding: 16,
    },
    tournamentIcon: {
        fontSize: 20,
        marginBottom: 8,
    },
    tournamentName: {
        color: colors.text.primary,
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    tournamentPrize: {
        color: colors.text.secondary,
        fontSize: 12,
    },
    centerSection: {
        alignItems: 'center',
    },
    podium: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: 16,
        height: 300,
        marginTop: 40,
    },
    podiumItem: {
        alignItems: 'center',
        width: 140,
    },
    crown: {
        fontSize: 24,
        marginBottom: -10,
        zIndex: 10,
    },
    avatarRing: {
        width: 64,
        height: 64,
        borderRadius: 32,
        borderWidth: 3,
        padding: 2,
        marginBottom: 12,
    },
    avatarPlaceholder: {
        flex: 1,
        backgroundColor: colors.surfaceHighlight,
        borderRadius: 40,
    },
    podiumName: {
        color: colors.text.primary,
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    podiumPoints: {
        color: colors.text.secondary,
        fontSize: 12,
        marginBottom: 16,
    },
    podiumBase: {
        width: '100%',
        height: 80,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        alignItems: 'center',
        paddingTop: 16,
    },
    podiumRank: {
        color: colors.text.secondary,
        fontSize: 24,
        fontWeight: 'bold',
    },
    pokedexHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    viewAllText: {
        color: colors.text.primary,
        fontSize: 12,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    pokemonGrid: {
        flexDirection: 'row',
        gap: 24,
        paddingVertical: 16,
    },
});
