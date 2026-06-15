import React from 'react';
import { TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { Pokemon } from '@/shared/types/pokemon';
import { styles } from '../../screens/style';

interface TeamThumbProps {
    pokemon: Pokemon;
    isActive: boolean;
    isOpponent: boolean;
    onPress: () => void;
}

export function TeamThumb({ pokemon, isActive, isOpponent, onPress }: TeamThumbProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.teamThumb,
                isOpponent && styles.teamThumbOpponent,
                isActive && (isOpponent ? styles.teamThumbActiveOpponent : styles.teamThumbActive),
            ]}
        >
            <Image
                source={typeof pokemon.image === 'string' && pokemon.image.startsWith('http')
                    ? { uri: pokemon.image }
                    : pokemon.image as ImageSourcePropType}
                style={styles.teamThumbImage}
                resizeMode="contain"
            />
        </TouchableOpacity>
    );
}
