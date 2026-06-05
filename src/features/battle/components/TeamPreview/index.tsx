import React from 'react';
import { View, Text, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Pokemon } from '@sharedTypes/pokemon';
import { colors } from '@/constants/colors';
import { styles } from './styles';

interface TeamPreviewProps {
  team: Pokemon[];
  maxSlots?: number;
}

function HpBar({ value }: { value: number }) {
  const pct = Math.min((value / 255) * 100, 100);
  const barColor = pct > 60 ? colors.secondary : pct > 25 ? colors.rankings.gold : colors.primary;
  return (
    <View style={styles.hpBarBg}>
      <View style={[styles.hpBarFill, { width: `${pct}%`, backgroundColor: barColor }]} />
    </View>
  );
}

function FilledSlot({ pokemon }: { pokemon: Pokemon }) {
  const hp = pokemon.stats.find((s) => s.name === 'hp')?.forca ?? 100;
  return (
    <View style={styles.slot}>
      <View style={styles.spriteBox}>
        <Image
          source={typeof pokemon.image === 'string' ? { uri: pokemon.image } : (pokemon.image as any)}
          style={styles.sprite}
          resizeMode="contain"
        />
      </View>
      <View style={styles.slotInfo}>
        <View style={styles.slotRow}>
          <Text style={styles.pokemonName}>{pokemon.name}</Text>
          <Text style={styles.pokemonLevel}>Lv. 50</Text>
        </View>
        <HpBar value={hp} />
      </View>
    </View>
  );
}

export function TeamPreview({ team, maxSlots = 5 }: TeamPreviewProps) {
  const slots = Array.from({ length: maxSlots }).map((_, i) => team[i] ?? null);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="bolt" size={14} color={colors.text.secondary} />
        <Text style={styles.headerText}>Equipe Atual</Text>
      </View>
      <View style={styles.grid}>
        {slots.map((pokemon, i) =>
          pokemon ? (
            <FilledSlot key={pokemon.id} pokemon={pokemon} />
          ) : (
            <View key={`empty-${i}`} style={styles.emptySlot}>
              <MaterialIcons name="add" size={20} color={colors.text.secondary} />
            </View>
          )
        )}
      </View>
    </View>
  );
}
