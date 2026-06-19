import React, { useEffect, useRef, useMemo } from 'react';
import { Text, View, Image, TouchableOpacity,Animated, Dimensions, StyleSheet} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Pokemon } from '@/shared/types/pokemon';
import { styles, TYPE_COLORS } from './style';

const BouncingTitle = () => {
    const bounce = useRef(new Animated.Value(-80)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(bounce, {
                    toValue: 0,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.timing(bounce, {
                    toValue: -18,
                    duration: 400,
                    useNativeDriver: true,
                }),
                Animated.timing(bounce, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(bounce, {
                    toValue: -8,
                    duration: 250,
                    useNativeDriver: true,
                }),
                Animated.timing(bounce, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.delay(3000),
            ]),
        ).start();
    }, [bounce]);

    return (
        <Animated.Text style={[styles.victoryTitle, { transform: [{ translateY: bounce }] }]}> VICTORY </Animated.Text>
    );
};

const PulsingCard = ({ children, typeColor }: { children: React.ReactNode; typeColor: string }) => {
    const pulse = useRef(new Animated.Value(0.25)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulse, { toValue: 0.7, duration: 1200, useNativeDriver: true }),
                Animated.timing(pulse, { toValue: 0.25, duration: 1200, useNativeDriver: true }),
            ]),
        ).start();
    }, [pulse]);

    return (
        <View style={styles.cardWrapper}>
            <Animated.View
                style={[
                    StyleSheet.absoluteFill,
                    styles.glowLayer,
                    {
                        backgroundColor: typeColor,
                        opacity: pulse,
                    },
                ]}
            />
            <View style={[styles.imgCard, { borderColor: typeColor }]}>
                {children}
            </View>
        </View>
    );
};


export default function VictoryScreen() {
    const { pokemonData } = useLocalSearchParams<{ pokemonData: string }>();
    const pokemon: Pokemon | null = pokemonData ? JSON.parse(pokemonData) : null;
    const primaryType = pokemon?.type?.[0] ?? 'normal';
    const typeColor = TYPE_COLORS[primaryType] ?? '#6AC0FF';

    return (
        <View style={styles.container}>
            <BouncingTitle />
            <Text style={styles.victorySubtitle}>Seu novo pokemon!</Text>

            {pokemon && (
                <PulsingCard typeColor={typeColor}>
                    <Image source={{ uri: pokemon.image }} style={styles.pokemonImage} />
                    <Text style={styles.pokemonName}>{pokemon.name}</Text>

                    <View style={styles.badgesRow}>          
                        <View style={[styles.badge, { borderColor: typeColor }]}>
                            <Text style={[styles.badgeText, { color: typeColor }]}>
                                {pokemon.type.join(' / ').toUpperCase()}
                            </Text>
                        </View>
                    </View>
                </PulsingCard>
            )}

            <View style={styles.buttonsRow}>
                <TouchableOpacity style={styles.btnPrimary} onPress={() => router.replace('/Fight')}>
                    <Text style={styles.btnText}>PROXIMO ROUND ❯❯</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnSecondary} onPress={() => router.replace('/Home')}>
                    <Text style={styles.btnText}>VOLTAR AO HUB</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}