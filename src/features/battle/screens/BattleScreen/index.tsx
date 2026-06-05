import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { PixelBorderDouble } from '@/components/ui/PixelBorderDouble';
import { TeamPreview } from '../../components/TeamPreview';
import { ModeSelector } from '../../components/ModeSelector';
import { useAuth } from '@/contexts/AuthContext';
import { styles } from './styles';

export default function BattleScreen() {
  const { team } = useAuth();

  const handleStart = (mode: '1v1' | '5v5') => {
    console.log('Iniciando batalha modo:', mode);
  };

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <TeamPreview team={team} />

        <PixelBorderDouble style={styles.header}>
          <Text style={styles.headerTitle}>Preparação de Combate</Text>
          <Text style={styles.headerSubtitle}>
            Selecione o modo e prepare sua equipe para o confronto.
          </Text>
        </PixelBorderDouble>

        <ModeSelector onStart={handleStart} />
      </ScrollView>
    </View>
  );
}
