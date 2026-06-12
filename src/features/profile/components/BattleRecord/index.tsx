import React from 'react';
import { View, Text } from 'react-native';
import { PixelBorderDouble } from '@/components/ui/PixelBorderDouble';
import { colors } from '@/constants/colors';
import { styles } from './styles';
import { Profile } from '../../@types/Profile';

function StatRow({
  label,
  value,
  labelColor,
  inset,
}: {
  label: string;
  value: string;
  labelColor: string;
  inset: 'win' | 'loss';
}) {
  return (
    <View style={[styles.statRow, inset === 'win' ? styles.statWin : styles.statLoss]}>
      <Text style={[styles.statLabel, { color: labelColor }]}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

export function BattleRecord({ profile }: { profile?: Profile | null }) {
  const wins = profile?.vitorias ?? 0;
  const losses = profile?.derrotas ?? 0;

  return (
    <PixelBorderDouble style={[styles.recordBox, styles.shadowSm]}>
      <Text style={styles.recordTitle}>BATTLE RECORD</Text>
      <StatRow label="WINS" value={String(wins)} labelColor={colors.secondary} inset="win" />
      <StatRow label="LOSSES" value={String(losses)} labelColor={colors.primary} inset="loss" />
    </PixelBorderDouble>
  );
}
