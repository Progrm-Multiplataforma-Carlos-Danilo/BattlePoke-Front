import React, { useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pokemon } from '@sharedTypes/pokemon';
import { colors } from '@/constants/colors';
import { getPokemonDetails } from '@sharedApi/pokemonIntegration';
import { styles } from './style';

interface PokemonDetailsModalProps {
    visible: boolean;
    pokemon: Pokemon | null;
    onClose: () => void;
}

const STAT_COLORS: Record<string, string> = {
    hp: '#4CAF50',
    attack: colors.primary,
    defense: colors.secondary,
    'special-attack': '#9C27B0',
    'special-defense': '#3F51B5',
    speed: colors.rankings.gold,
};

const STAT_LABELS: Record<string, string> = {
    hp: 'HP',
    attack: 'ATK',
    defense: 'DEF',
    'special-attack': 'Sp.ATK',
    'special-defense': 'Sp.DEF',
    speed: 'SPD',
};

function StatBar({ name, value }: { name: string; value: number }) {
    return (
        <View style={styles.statRow}>
            <Text style={styles.statLabel}>{STAT_LABELS[name] ?? name}</Text>
            <View style={styles.statBarBg}>
                <View style={[styles.statBarFill, {
                    width: `${Math.min((value / 255) * 100, 100)}%`,
                    backgroundColor: STAT_COLORS[name] ?? colors.border,
                }]} />
            </View>
            <Text style={styles.statValue}>{value}</Text>
        </View>
    );
}

function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{label}</Text>
            <Text style={styles.infoValue}>{value}</Text>
        </View>
    );
}

export function PokemonDetailsModal({ visible, pokemon, onClose }: PokemonDetailsModalProps) {
    const [detail, setDetail] = useState<Pokemon | null>(null);
    const [loadingDetails, setLoadingDetails] = useState(false);

    useEffect(() => {
        if (!visible || !pokemon) return;
        setDetail(pokemon);
        setLoadingDetails(true);
        getPokemonDetails(pokemon).then((full) => {
            setDetail(full);
            setLoadingDetails(false);
        });
    }, [visible, pokemon]);

    if (!detail) return null;

    const primaryType = detail.type[0];
    const typeColor = colors.types[primaryType as keyof typeof colors.types] ?? colors.border;

    return (
        <Modal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <View style={[styles.header, { borderBottomColor: typeColor }]}>
                        <Text style={styles.headerTitle}>Pokédex</Text>
                        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                            <MaterialCommunityIcons name="close" size={24} color={colors.text.primary} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                        {/* Image */}
                        <View style={[styles.imageContainer, { backgroundColor: typeColor + '22' }]}>
                            <Image
                                source={typeof detail.image === 'string' ? { uri: detail.image } : detail.image as any}
                                style={styles.image}
                                resizeMode="contain"
                            />
                            <View style={styles.idBadge}>
                                <Text style={styles.idText}>#{String(detail.id).padStart(4, '0')}</Text>
                            </View>
                        </View>

                        <View style={styles.infoSection}>
                            {/* Nome e tipos */}
                            <Text style={[styles.pokemonName, { textShadowColor: typeColor }]}>{detail.name}</Text>

                            <View style={styles.typesContainer}>
                                {detail.type.map((t) => (
                                    <View key={t} style={[styles.typeBadge, { backgroundColor: colors.types[t as keyof typeof colors.types] + '33', borderColor: colors.types[t as keyof typeof colors.types] }]}>
                                        <Text style={[styles.typeText, { color: colors.types[t as keyof typeof colors.types] }]}>{t}</Text>
                                    </View>
                                ))}
                            </View>

                            {/* Descrição */}
                            {loadingDetails ? (
                                <ActivityIndicator style={{ marginTop: 16 }} color={typeColor} />
                            ) : detail.description ? (
                                <>
                                    <View style={styles.divider} />
                                    <Text style={styles.description}>{detail.description}</Text>
                                </>
                            ) : null}

                            {/* Dados físicos */}
                            <View style={styles.divider} />
                            <Text style={styles.sectionTitle}>Dados</Text>
                            <View style={styles.dataGrid}>
                                <InfoRow label="Altura" value={`${(detail.height / 10).toFixed(1)} m`} />
                                <InfoRow label="Peso" value={`${(detail.weight / 10).toFixed(1)} kg`} />
                                <InfoRow label="Exp. base" value={String(detail.base_experience ?? '—')} />
                                {detail.category && <InfoRow label="Categoria" value={detail.category} />}
                            </View>

                            {/* Habilidades */}
                            <View style={styles.divider} />
                            <Text style={styles.sectionTitle}>Habilidades</Text>
                            <View style={styles.abilitiesContainer}>
                                {detail.abilities.map((a) => (
                                    <View key={a.name} style={styles.abilityChip}>
                                        <Text style={styles.abilityName}>{a.name}</Text>
                                        {a.isHidden && <Text style={styles.hiddenTag}>oculta</Text>}
                                    </View>
                                ))}
                            </View>

                            {/* Fraquezas */}
                            {detail.weaknesses && detail.weaknesses.length > 0 && (
                                <>
                                    <View style={styles.divider} />
                                    <Text style={styles.sectionTitle}>Fraquezas</Text>
                                    <View style={styles.typesContainer}>
                                        {detail.weaknesses.map((w) => (
                                            <View key={w} style={[styles.typeBadge, { backgroundColor: colors.types[w as keyof typeof colors.types] + '33', borderColor: colors.types[w as keyof typeof colors.types] }]}>
                                                <Text style={[styles.typeText, { color: colors.types[w as keyof typeof colors.types] }]}>{w}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </>
                            )}

                            {/* Cadeia de evolução */}
                            {detail.evolutionChain && detail.evolutionChain.length > 0 && (
                                <>
                                    <View style={styles.divider} />
                                    <Text style={styles.sectionTitle}>Evoluções</Text>
                                    <View style={styles.evolutionRow}>
                                        {detail.evolutionChain.map((evo, i) => (
                                            <React.Fragment key={evo}>
                                                <Text style={styles.evolutionName}>{evo}</Text>
                                                {i < detail.evolutionChain!.length - 1 && (
                                                    <MaterialCommunityIcons name="chevron-right" size={18} color={colors.text.secondary} />
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </View>
                                </>
                            )}

                            {/* Stats */}
                            <View style={styles.divider} />
                            <Text style={styles.sectionTitle}>Base Stats</Text>
                            <View style={styles.statsContainer}>
                                {detail.stats.map((s) => (
                                    <StatBar key={s.name} name={s.name} value={s.forca} />
                                ))}
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}
