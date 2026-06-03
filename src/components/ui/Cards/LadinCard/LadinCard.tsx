import React from 'react';
import { View, Text, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { Colors } from '../../../../constants/colors';
import { styles } from './style';

interface PokemonCardProps {
  name: string;
  number: string;
  type: string;
  typeColor: string;
  image: ImageSourcePropType;
  atk: number;
  def: number;
  spd: number;
}

export function LadinCard({ name, number, type, typeColor, image, atk, def, spd }: PokemonCardProps) {
  const StatBar = ({ label, value, color }: { label: string, value: number, color: string }) => (
    <View style={styles.statRow}>
      <Text style={styles.statLabel}>{label}</Text>
      <View style={styles.statBarBg}>
        <View style={[styles.statBarFill, { width: `${value}%`, backgroundColor: color }]} />
      </View>
    </View>
  );

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} resizeMode="cover" />
        <View style={[styles.typeBadge, { backgroundColor: typeColor }]}>
          <Text style={styles.typeText}>{type}</Text>
        </View>
      </View>
      <View style={styles.info}>
        <View style={styles.header}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.number}>{number}</Text>
        </View>
        <StatBar label="ATK" value={atk} color={Colors.primary} />
        <StatBar label="DEF" value={def} color={Colors.secondary} />
        <StatBar label="SPD" value={spd} color={Colors.rankings.gold} />
      </View>
    </View>
  );
}
