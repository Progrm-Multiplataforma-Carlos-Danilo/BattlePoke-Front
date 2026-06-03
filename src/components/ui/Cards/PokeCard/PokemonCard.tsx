import React from 'react';
import { View, Text, StyleSheet, Image, ImageSourcePropType, FlatList, TouchableOpacity } from 'react-native';
import { Colors } from '../../../../constants/colors';
import { styles } from './style';

import { Pokemon } from '@sharedTypes/pokemon';

interface PokemonCardProps {
  pokemonList?: Pokemon[];
  columns?: number;
  onPokemonPress?: (pokemon: Pokemon) => void;
}

const types: Record<string, string> = {
  'normal': Colors.types.normal,
  'fire': Colors.types.fire,
  'water': Colors.types.water,
  'grass': Colors.types.grass,
  'electric': Colors.types.electric,
  'ice': Colors.types.ice,
  'fighting': Colors.types.fighting,
  'poison': Colors.types.poison,
  'ground': Colors.types.ground,
  'flying': Colors.types.flying,
  'psychic': Colors.types.psychic,
  'bug': Colors.types.bug,
  'rock': Colors.types.rock,
  'ghost': Colors.types.ghost,
  'dragon': Colors.types.dragon,
  'steel': Colors.types.steel,
  'dark': Colors.types.dark,
  'fairy': Colors.types.fairy,
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
              <PokemonTypeBackground key={index} color={types[type] || Colors.types.normal} type={''} />
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
                  <PokemonType key={index} type={type} color={types[type] || Colors.types.normal} />
                ))}
              </View>

            </View>
            <View style={styles.info}>
              <View style={styles.header}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.number}>#{item.id}</Text>
              </View>
              <StatBar label="ATK" value={item.stats.find(m => m.name === 'attack')?.forca} color={Colors.primary} />
              <StatBar label="DEF" value={item.stats.find(m => m.name === 'defense')?.forca} color={Colors.secondary} />
              <StatBar label="SPD" value={item.stats.find(m => m.name === 'speed')?.forca} color={Colors.rankings.gold} />
            </View>
          </TouchableOpacity>

        </View>
      )}
    />
  );
}

