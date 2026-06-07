import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TeamPreview } from '../../components/TeamPreview';
import { ModeSelector, BattleMode } from '../../components/ModeSelector';
import { useAuth } from '@/contexts/AuthContext';
import { colors } from '@/constants/colors';
import { styles } from './styles';
import Loading from '@/components/layout/Loading';

export default function BattleScreen() {
  const { team } = useAuth();
  const [mode, setMode] = useState<BattleMode>('1v1');
  const [isLoading, setIsLoading] = useState(true);

  const handleStart = () => {
    console.log('Iniciando batalha modo:', mode);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  if(isLoading){
    return (
      <Loading />
    )
  }

  return (
    <View style={styles.root}>
      <View style={styles.headerContainer}>
        <View style={styles.headerIndicator} />
        <View style={styles.headerContent}>
          <View style={styles.titleRow}>
            <MaterialCommunityIcons name="sword-cross" size={24} color={colors.primary} />
            <Text style={styles.headerTitle}>PREPARAÇÃO DE COMBATE</Text>
          </View>
          <Text style={styles.headerSubtitle}>
            Selecione o modo e prepare sua equipe para o confronto iminente.
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.mainContent}>
          <View style={styles.teamSection}>
            <TeamPreview team={team} maxSlots={5} />
          </View>

        
          <View style={styles.rightPanel}>
            <View style={styles.powerRatingBox}>
              <Text style={styles.powerRatingTitle}>Poder Total da Equipe</Text>
              <MaterialCommunityIcons name="lightning-bolt" size={120} color="rgba(255, 255, 255, 0.03)" style={styles.powerIconBg} />
              
              <Text style={styles.powerRatingValue}>2,845,9</Text>
              
              <View style={styles.statsRow}>
                <View style={styles.statBox}>
                  <Text style={styles.statTitle}>TOTAL ATK</Text>
                  <Text style={[styles.statValue, { color: colors.secondary }]}>184,200</Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.statTitle}>TOTAL DEF</Text>
                  <Text style={[styles.statValue, { color: colors.primary }]}>156,750</Text>
                </View>
              </View>
            </View>

            <ModeSelector mode={mode} onChange={setMode} />
          </View>
        </View>
      </ScrollView>


      <View style={styles.bottomBar}>
        <Pressable 
          style={({ pressed }) => [styles.startButton, pressed && styles.startButtonPressed]} 
          onPress={handleStart}
        >
          <MaterialCommunityIcons name="lightning-bolt" size={24} color={colors.background} />
          <Text style={styles.startButtonText}>INICIAR COMBATE</Text>
          <MaterialCommunityIcons name="lightning-bolt" size={24} color={colors.background} />
        </Pressable>
      </View>
    </View>
  );
}
