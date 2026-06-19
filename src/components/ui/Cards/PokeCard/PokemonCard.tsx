import React from 'react';
import { View, Text, StyleSheet, Image, ImageSourcePropType, FlatList, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../../../constants/colors';
import { styles } from './style';
import { typeColors } from '@/utils/pokemonUtils';

import { Pokemon } from '@sharedTypes/pokemon';

interface PokemonCardProps {
  pokemonList?: Pokemon[];
  columns?: number;
  onPokemonPress?: (pokemon: Pokemon) => void;
  onDeletePress?: (pokemon: Pokemon) => void;
  cardWidth?: number | string;
  cardMaxHeight?: number | string;
  imageHeight?: number | string;
  hideStats?: boolean;
  imageBackgroundColor?: string;
  borderColor?: string;
  activeStatName?: string;
  activePokemonId?: number;
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

export function PokemonCard({ pokemonList, columns = 3, onPokemonPress, onDeletePress, cardWidth, hideStats, imageBackgroundColor, borderColor, activeStatName, activePokemonId }: PokemonCardProps) {
  const StatBar = ({ label, apiName, value, color }: { label: string, apiName: string, value?: number, color: string }) => {
    const isActive = apiName === activeStatName;
    return (
      <View style={[styles.statRow, isActive && styles.activeStat]}>
        <Text style={styles.statLabel}>{label}</Text>
        <View style={styles.statBarBg}>
          <View style={[styles.statBarFill, { width: `${(Math.min(value ?? 0, 255) / 255) * 100}%`, backgroundColor: color }]} />
        </View>
      </View>
    );
  };

    const defaultMaxWidth = `${100 / columns}%`;

    return (
      <FlatList
        data={pokemonList}
        numColumns={columns}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={columns > 1 ? styles.columnWrapper : undefined}
        contentContainerStyle={styles.listContent}
        keyExtractor={(item: Pokemon, index: number) => `${item.id}-${index}`}
        renderItem={({ item }) => (

          <View style={[styles.itemWrapper, { maxWidth: cardWidth || (defaultMaxWidth as any) }]}>

            <View style={styles.backgroundTypes}>
              {item.type.map((type, index) => (
                <PokemonTypeBackground key={index} color={typeColors[type] || colors.types.normal} type={''} />
              ))}
            </View>

            <TouchableOpacity
              style={[
                styles.card, 
                borderColor ? { borderColor } : undefined,
                activePokemonId === item.id && { borderColor: colors.types.electric, borderWidth: 3 }
              ]}
              activeOpacity={0.7}
              onPress={() => onPokemonPress && onPokemonPress(item)}
            >
              <View style={[styles.imageContainer, imageBackgroundColor ? { backgroundColor: imageBackgroundColor } : undefined]}>
                <Image
                  source={typeof item.image === 'string' && item.image.startsWith('http') ? { uri: item.image } : item.image as ImageSourcePropType}
                  style={styles.image}
                  resizeMode="contain"
                />
                <View style={styles.typesContainer}>
                  {item.type && item.type.map((type, index) => (
                    <PokemonType key={index} type={type} color={typeColors[type] || colors.types.normal} />
                  ))}
                </View>
                {onDeletePress && (
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => onDeletePress(item)}
                    activeOpacity={0.7}
                  >
                    <MaterialCommunityIcons name="trash-can-outline" size={16} color="#fff" />
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.info}>
                <View style={[styles.header, hideStats && { marginBottom: 0 }]}>
                  <Text style={[styles.name, hideStats && { fontSize: 12 }]}>{item.name}</Text>
                  {!hideStats && <Text style={styles.number}>#{item.id}</Text>}
                </View>

                {!hideStats && (
                  <>
                    <StatBar label="HP" apiName='hp' value={item.stats.find(m => m.name === 'hp')?.forca} color={colors.types.grass} />
                    <StatBar label="ATK" apiName='attack' value={item.stats.find(m => m.name === 'attack')?.forca} color={colors.types.fire} />
                    <StatBar label="DEF" apiName='defense' value={item.stats.find(m => m.name === 'defense')?.forca} color={colors.types.water} />
                    <StatBar label="SP. ATK" apiName='special-attack' value={item.stats.find(m => m.name === 'special-attack')?.forca} color={colors.types.psychic} />
                    <StatBar label="SP. DEF" apiName='special-defense' value={item.stats.find(m => m.name === 'special-defense')?.forca} color={colors.types.dragon} />
                    <StatBar label="SPD" apiName='speed' value={item.stats.find(m => m.name === 'speed')?.forca} color={colors.types.electric} />
                  </>
                )}
              </View>
            </TouchableOpacity>

          </View>
        )}
      />
    );
  }
