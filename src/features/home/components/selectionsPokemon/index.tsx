import React, { useEffect, useRef } from "react";
import { Image, ImageSourcePropType, Text, TouchableOpacity, View, Animated } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from "./style";
import { colors } from "@/constants/colors";
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

    const pulseAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (isTeamFull) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnimation, {
                        toValue: 1,
                        duration: 800,
                        useNativeDriver: true,
                    }),
                    Animated.timing(pulseAnimation, {
                        toValue: 0,
                        duration: 800,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        } else {
            pulseAnimation.setValue(0);
        }
    }, [isTeamFull]);


    const scale = pulseAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.05],
    });

    const opacity = pulseAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0.5, 1],
    });

    const rotate = pulseAnimation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ['0deg', '2deg', '-2deg'],
    });

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerTitles}>
                    <Text style={styles.title}>Time de batalha</Text>
                    <Text style={styles.subtitle}>slot de pokemon({selectedPokemons.length}/{maxSlots})</Text>
                </View>
                <MaterialCommunityIcons name="sword-cross" size={24} color={colors.text.primary} />
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
                                        <MaterialCommunityIcons name="plus-circle-outline" size={24} color={colors.text.secondary} />
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
            <Animated.View style={{ transform: [{ scale }, { rotate }], opacity }}>
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
            </Animated.View>
        </View>
    );
}