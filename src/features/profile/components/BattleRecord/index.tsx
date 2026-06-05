import React from 'react';
import { View, Text } from 'react-native';
import { PixelBorderDouble } from '@/components/ui/PixelBorderDouble';
import { colors } from '@/constants/colors';
import { styles } from './styles';

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

export function BattleRecord() {
  return (
    <PixelBorderDouble style={[styles.recordBox, styles.shadowSm]}>
      <Text style={styles.recordTitle}>BATTLE RECORD</Text>
      <StatRow label="WINS" value="124" labelColor={colors.secondary} inset="win" />
      <StatRow label="LOSSES" value="42" labelColor={colors.primary} inset="loss" />
    </PixelBorderDouble>
  );
}
