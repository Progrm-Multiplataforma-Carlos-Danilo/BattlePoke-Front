import React from 'react';
import { View, Text, StyleSheet, Image, ImageSourcePropType, FlatList, TouchableOpacity } from 'react-native';
import { colors } from '../../../../constants/colors';
import { styles } from './style';

import { Pokemon } from '@sharedTypes/pokemon';

interface PokemonCardProps {
  pokemonList?: Pokemon[];
  columns?: number;
  onPokemonPress?: (pokemon: Pokemon) => void;
}

const types: Record<string, string> = {
  'normal': colors.types.normal,
  'fire': colors.types.fire,
  'water': colors.types.water,
  'grass': colors.types.grass,
  'electric': colors.types.electric,
  'ice': colors.types.ice,
  'fighting': colors.types.fighting,
  'poison': colors.types.poison,
  'ground': colors.types.ground,
  'flying': colors.types.flying,
  'psychic': colors.types.psychic,
  'bug': colors.types.bug,
  'rock': colors.types.rock,
  'ghost': colors.types.ghost,
  'dragon': colors.types.dragon,
  'steel': colors.types.steel,
  'dark': colors.types.dark,
  'fairy': colors.types.fairy,
}

const PokemonType = ({ type, color }: { type: string; color: string; }) => {
  return (
    <View style={[styles.typeBadge, { backgroundColor: color }]}>
      <Text style={styles.typeText}>{type}</Text>
    </View>
  )
}

const PokemonTypeBackground = ({ type, color }: { type: string; color: string; }) => {
  return (
    <View style={[styles.typeBackground, { backgroundColor: color }]} />
  )
}

export function PokemonCard({ pokemonList, columns, onPokemonPress }: PokemonCardProps) {
  const StatBar = ({ label, value, color }: { label: string, value?: number, color: string }) => (
    <View style={styles.statRow}>
      <Text style={styles.statLabel}>{label}</Text>
      <View style={styles.statBarBg}>
        <View style={[styles.statBarFill, { width: `${value ?? 0}%`, backgroundColor: color }]} />
      </View>
    </View>
  );


  return (
    <FlatList
      data={pokemonList}
      numColumns={columns || 3}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.listContent}
      keyExtractor={(item: Pokemon) => item.id.toString()}
      renderItem={({ item }) => (

        <View style={styles.itemWrapper}>
          <View style={styles.backgroundTypes}>
            {item.type.map((type, index) => (
              <PokemonTypeBackground key={index} color={types[type] || colors.types.normal} type={''} />
            ))}
          </View>
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.7}
            onPress={() => onPokemonPress && onPokemonPress(item)}
          >
            <View style={styles.imageContainer}>
              <Image
                source={typeof item.image === 'string' && item.image.startsWith('http') ? { uri: item.image } : item.image as ImageSourcePropType}
                style={styles.image}
                resizeMode="contain"
              />
              <View style={styles.typesContainer}>
                {item.type && item.type.map((type, index) => (
                  <PokemonType key={index} type={type} color={types[type] || colors.types.normal} />
                ))}
              </View>

            </View>
            <View style={styles.info}>
              <View style={styles.header}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.number}>#{item.id}</Text>
              </View>
              <StatBar label="ATK" value={item.stats.find(m => m.name === 'attack')?.forca} color={colors.primary} />
              <StatBar label="DEF" value={item.stats.find(m => m.name === 'defense')?.forca} color={colors.secondary} />
              <StatBar label="SPD" value={item.stats.find(m => m.name === 'speed')?.forca} color={colors.rankings.gold} />
            </View>
          </TouchableOpacity>

        </View>
      )}
    />
  );
}

