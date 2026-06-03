import React from "react";
import { Image, ImageSourcePropType, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from "./style";
import { Colors } from "@/constants/colors";
import { Pokemon } from '@sharedTypes/pokemon';

interface SelectionPokemonProps {
    selectedPokemons?: Pokemon[];
    onSlotPress?: (index: number) => void;
    onReadyPress?: () => void;
}

export default function SelectionPokemon({ selectedPokemons = [], onSlotPress, onReadyPress }: SelectionPokemonProps) {
    const maxSlots = 5;

    const slots = Array.from({ length: maxSlots }).map((_, index) => {
        return selectedPokemons[index] || null;
    });

    const isTeamFull = selectedPokemons.length === maxSlots;


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerTitles}>
                    <Text style={styles.title}>Battle Team</Text>
                    <Text style={styles.subtitle}>SLOT SELECTION ({selectedPokemons.length}/{maxSlots})</Text>
                </View>
                <MaterialCommunityIcons name="sword-cross" size={24} color={Colors.text.primary} />
            </View>

            <View style={styles.slotsContainer}>
                {slots.map((pokemon, index) => {
                    const slotNumber = String(index + 1).padStart(2, '0');
                    
                    return (
                        <TouchableOpacity
                            key={index}
                            style={[styles.pokemonSlot, pokemon && styles.pokemonSlotFilled]}
                            activeOpacity={0.7}
                            onPress={() => onSlotPress && onSlotPress(index)}
                        >
                            <View style={styles.slotLeft}>
                                <View style={styles.addIconContainer}>
                                    {pokemon ? (
                                        <Image 
                                            source={typeof pokemon.image === 'string' && pokemon.image.startsWith('http') ? { uri: pokemon.image } : pokemon.image as ImageSourcePropType} 
                                            style={styles.pokemonImage} 
                                            resizeMode="contain" 
                                        />
                                    ) : (
                                        <MaterialCommunityIcons name="plus-circle-outline" size={24} color={Colors.text.secondary} />
                                    )}
                                </View>

                                <View style={styles.slotInfo}>
                                    {pokemon ? (
                                        <>
                                            <Text style={styles.pokemonName}>{pokemon.name}</Text>
                                            <Text style={styles.pokemonType}>{pokemon.type.join(', ')}</Text>
                                        </>
                                    ) : (
                                        <>
                                            <View style={styles.placeholderLine1} />
                                            <View style={styles.placeholderLine2} />
                                        </>
                                    )}
                                </View>
                            </View>

                            <Text style={styles.slotNumber}>{slotNumber}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            <TouchableOpacity
                style={[styles.readyButton, isTeamFull && styles.readyButtonActive]}
                activeOpacity={0.8}
                disabled={!isTeamFull}
                onPress={onReadyPress}
            >
                <Text style={[styles.readyButtonText, isTeamFull && styles.readyButtonTextActive]}>
                    Começar batalha
                </Text>
            </TouchableOpacity>
        </View>
    );
}