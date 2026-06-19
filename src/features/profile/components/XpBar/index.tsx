import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './style';

const LEVELS_PER_BADGE = 10;

export function XpBar({ level }: { level: number }) {
  // Progresso dentro da dezena atual: enche do nível X0 ao X9 e zera ao ganhar insígnia.
  const intoTier = level % LEVELS_PER_BADGE;
  const progress = intoTier / LEVELS_PER_BADGE;
  const nextBadgeLevel = (Math.floor(level / LEVELS_PER_BADGE) + 1) * LEVELS_PER_BADGE;

  return (
    <View style={styles.wrap}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>EXP</Text>
        <Text style={styles.hint}>NEXT BADGE: LV.{nextBadgeLevel}</Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${progress * 100}%` }]} />
      </View>
    </View>
  );
}
