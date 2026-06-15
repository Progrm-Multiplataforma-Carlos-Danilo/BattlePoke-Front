import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '@/constants/colors';
import { typeColors } from '@/utils/pokemonUtils';

interface TypeBadgeProps {
    type: string;
}

export function TypeBadge({ type }: TypeBadgeProps) {
    return (
        <View style={{
            paddingHorizontal: 6,
            paddingVertical: 2,
            borderRadius: 4,
            backgroundColor: typeColors[type] || colors.types.normal,
        }}>
            <Text style={{ color: '#FFF', fontSize: 8, fontWeight: 'bold', textTransform: 'uppercase' }}>
                {type}
            </Text>
        </View>
    );
}
