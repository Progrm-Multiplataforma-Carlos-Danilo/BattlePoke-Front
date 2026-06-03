import React from 'react';
import { View, Text, Modal, TouchableOpacity, Image, ScrollView, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pokemon } from '@sharedTypes/pokemon';
import { Colors } from '@/constants/colors';
import { styles } from './style';

interface PokemonDetailsModalProps {
    visible: boolean;
    pokemon: Pokemon | null;
    onClose: () => void;
}

export function PokemonDetailsModal({ visible, pokemon, onClose }: PokemonDetailsModalProps) {
    if (!pokemon) return null;

    const StatBar = ({ label, value, color }: { label: string, value?: number, color: string }) => (
        <View style={styles.statRow}>
            <Text style={styles.statLabel}>{label}</Text>
            <View style={styles.statBarBg}>
                <View style={[styles.statBarFill, { width: `${Math.min(((value ?? 0) / 255) * 100, 100)}%`, backgroundColor: color }]} />
            </View>
            <Text style={styles.statValue}>{value}</Text>
        </View>
    );

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Pokédex Data</Text>
                        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                            <MaterialCommunityIcons name="close" size={24} color={Colors.text.primary} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                        {/* Image Section */}
                        <View style={styles.imageContainer}>
                            <Image 
                                source={typeof pokemon.image === 'string' && pokemon.image.startsWith('http') ? { uri: pokemon.image } : pokemon.image as any} 
                                style={styles.image} 
                                resizeMode="contain" 
                            />
                            <View style={styles.idBadge}>
                                <Text style={styles.idText}>#{String(pokemon.id).padStart(4, '0')}</Text>
                            </View>
                        </View>

                        {/* Info Section */}
                        <View style={styles.infoSection}>
                            <Text style={styles.pokemonName}>{pokemon.name}</Text>
                            
                            <View style={styles.typesContainer}>
                                {pokemon.type.map((t, index) => (
                                    <View key={index} style={styles.typeBadge}>
                                        <Text style={styles.typeText}>{t}</Text>
                                    </View>
                                ))}
                            </View>

                            <View style={styles.divider} />

                            {/* Stats */}
                            <Text style={styles.sectionTitle}>Base Stats</Text>
                            <View style={styles.statsContainer}>
                                <StatBar label="ATK" value={pokemon.stats.find(m => m.name === 'attack')?.forca} color={Colors.primary} />
                                <StatBar label="DEF" value={pokemon.stats.find(m => m.name === 'defense')?.forca} color={Colors.secondary} />
                                <StatBar label="HP" value={pokemon.stats.find(m => m.name === 'hp')?.forca} color="#4CAF50" />
                                <StatBar label="Sp.ATK" value={pokemon.stats.find(m => m.name === 'special-attack')?.forca} color="#9C27B0" />
                                <StatBar label="Sp.DEF" value={pokemon.stats.find(m => m.name === 'special-defense')?.forca} color="#3F51B5" />
                                <StatBar label="SPD" value={pokemon.stats.find(m => m.name === 'speed')?.forca} color={Colors.rankings.gold} />
                            </View>

                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}
