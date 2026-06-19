import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '@/constants/colors';
import { typeColors } from '@/utils/pokemonUtils';
import { styles } from './style';

interface TypeBadgeProps {
    type: string;
}

export function TypeBadge({ type }: TypeBadgeProps) {
    return (
        <View style={[styles.badge, { backgroundColor: typeColors[type] || colors.types.normal }]}>
            <Text style={styles.label}>{type}</Text>
        </View>
    );
}
