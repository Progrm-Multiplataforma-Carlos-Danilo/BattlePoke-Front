import React, { useEffect, useState, useRef } from "react";
import { Text, View, ScrollView, TouchableOpacity, Animated, Pressable, Alert } from "react-native";
import { styles } from "./style";
import { useAuth } from "@/contexts/AuthContext";
import { colors } from "@/constants/colors";
import { Pokemon } from '@/shared/types/pokemon';
import { mockOpponentTeam } from "@/mocks/opponentsTeam";
import { TeamThumb } from "../../components/TeamThumb/TeamThumb";
import { PokemonCard } from "@/components/ui/Cards/PokeCard/PokemonCard";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useBattleSimulation } from "../../hooks/useBattleSimulation";

// ===== MAIN SCREEN =====

export default function FightScreen() {
    const { team } = useAuth();
    const pokemonList: Pokemon[] = team || [];
    const pulseAnimation = useRef(new Animated.Value(0)).current;

    const {
        activePlayerIndex, setActivePlayerIndex,
        activeOpponentIndex,setActiveOpponentIndex,
        activeStatIndex, activeOpponentStatIndex,
        playerWins, opponentWins,
        isBattling, handleBattle,
        STASTS_ORDER } = useBattleSimulation(pokemonList, mockOpponentTeam);

    const activePlayer = pokemonList.length > 0 ? pokemonList[activePlayerIndex] : null;
    const activeOpponent = mockOpponentTeam[activeOpponentIndex];

    useEffect(() => {
        if (team) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnimation, {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(pulseAnimation, {
                        toValue: 0,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        }
    }, []);

    const scale = pulseAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.05],
    });

    const opacity = pulseAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0.5, 1],
    });

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                <View style={styles.mainContent}>

                    <View style={styles.teamHubContainer}>
                        {/* Player Team Hub */}
                        <View style={styles.teamHub}>
                            <Text style={styles.teamHubLabel}>Meu Time ({playerWins})</Text>
                            <View style={styles.teamThumbsRow}>
                                {pokemonList.map((pokemon, index) => (
                                    <TeamThumb
                                        key={pokemon.id}
                                        pokemon={pokemon}
                                        isActive={index === activePlayerIndex}
                                        isOpponent={false}
                                        onPress={() => setActivePlayerIndex(index)}
                                    />
                                ))}
                            </View>
                        </View>

                        <View style={styles.vsDivider}>
                            <Text style={styles.vsText}>{playerWins} x {opponentWins}</Text>
                        </View>

                        {/* Opponent Team  */}
                        <View style={styles.teamHub}>
                            <Text style={[styles.teamHubLabel, styles.teamHubLabelOpponent]}>Oponente ({opponentWins})</Text>
                            <View style={styles.teamThumbsRow}>
                                {mockOpponentTeam.map((pokemon, index) => (
                                    <TeamThumb
                                        key={pokemon.id}
                                        pokemon={pokemon}
                                        isActive={index === activeOpponentIndex}
                                        isOpponent={true}
                                        onPress={() => setActiveOpponentIndex(index)}
                                    />
                                ))}
                            </View>
                        </View>
                    </View>

                    {/*BATTLE AREA */}
                    <View style={styles.battleArea}>

                        {/* Player  */}
                        <View style={styles.activeCardWrapper}>
                            {activePlayer ? (
                                <PokemonCard
                                    pokemonList={[activePlayer]}
                                    activeStatName={STASTS_ORDER[activeStatIndex]}
                                    columns={1}
                                    cardWidth="100%"
                                    borderColor={colors.secondary}
                                    imageBackgroundColor={`${colors.types.flying}15`}
                                />
                            ) : (
                                <View style={[styles.activeCard, { padding: 40, alignItems: 'center' }]}>
                                    <Text style={{ color: colors.text.tertiary, fontSize: 14 }}>
                                        Nenhum Pokémon no time
                                    </Text>
                                </View>
                            )}
                        </View>

                        {/* Opponent Active Card */}
                        <View style={styles.activeCardWrapper}>
                            {activeOpponent && (
                                <PokemonCard
                                    pokemonList={[activeOpponent]}
                                    activeStatName={STASTS_ORDER[activeOpponentStatIndex]}
                                    columns={1}
                                    cardWidth="100%"
                                    borderColor={colors.terceira}
                                    imageBackgroundColor="#FF4D4D15"
                                />
                            )}
                        </View>
                    </View>

                    <View style={styles.bottomBar}>
                        <Animated.View style={{ transform: [{ scale }], opacity }}>
                            <Pressable 
                                style={({ pressed }) => [styles.startButton, (pressed || isBattling) && styles.startButtonPressed]} 
                                onPress={handleBattle}
                                disabled={isBattling}
                            >
                                <MaterialCommunityIcons name="sword-cross" size={24} color={colors.background} />
                                <Text style={styles.startButtonText}>
                                    {isBattling ? "Batalhando..." : "Batalhar!"}
                                </Text>
                                <MaterialCommunityIcons name="sword-cross" size={24} color={colors.background} />
                            </Pressable>
                        </Animated.View>
                    </View>

                </View>
            </ScrollView>
        </View>
    );
}