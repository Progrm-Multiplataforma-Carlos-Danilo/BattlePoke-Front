import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';
import { styles } from './styles';

type BattleMode = '1v1' | '5v5';

interface ModeSelectorProps {
  onStart: (mode: BattleMode) => void;
}

export function ModeSelector({ onStart }: ModeSelectorProps) {
  const [mode, setMode] = useState<BattleMode>('1v1');

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [styles.startButton, pressed && styles.startButtonPressed]}
        onPress={() => onStart(mode)}
      >
        <View style={styles.pulse} />
        <Text style={styles.startButtonText}>Iniciar Combate</Text>
      </Pressable>

      <View style={styles.modesRow}>
        <Pressable
          style={[styles.modeBtn, mode === '1v1' && styles.modeBtnActive]}
          onPress={() => setMode('1v1')}
        >
          <MaterialIcons
            name="person"
            size={28}
            color={mode === '1v1' ? colors.primary : colors.text.secondary}
          />
          <Text style={[styles.modeBtnText, mode === '1v1' && styles.modeBtnTextActive]}>
            1v1 Solo
          </Text>
        </Pressable>

        <Pressable
          style={[styles.modeBtn, mode === '5v5' && styles.modeBtnActive]}
          onPress={() => setMode('5v5')}
        >
          <MaterialIcons
            name="group"
            size={28}
            color={mode === '5v5' ? colors.primary : colors.text.secondary}
          />
          <Text style={[styles.modeBtnText, mode === '5v5' && styles.modeBtnTextActive]}>
            5v5 Equipe
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
