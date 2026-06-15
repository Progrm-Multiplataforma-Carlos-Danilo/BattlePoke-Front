import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, Pressable, Animated, Modal, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { PixelBorderDouble } from '@/components/ui/PixelBorderDouble';
import { colors } from '@/constants/colors';
import { useAuth } from '@/contexts/AuthContext';
import { styles } from './styles';
import { DataField } from '../DataField';
import { EditModal } from '../EditModal';
import { XpBar } from '../XpBar';
import { Profile } from '../../../../shared/types/Profile';
import { updateProfile } from '../../integration/profileIntegration';

export function TrainerCard({ profile }: { profile?: Profile | null }) {
  const { userId, displayName, avatar, updateDisplayName, updateAvatar } = useAuth();
  // O nome editado (displayName) tem prioridade; 'TRAINER' é o default ainda não personalizado,
  // então nesse caso cai no username do backend.
  const isCustomName = displayName !== 'TRAINER';
  const trainerName = isCustomName ? displayName : (profile?.username ?? displayName);

  async function handleSaveName(name: string) {
    // Atualiza local na hora (otimista).
    await updateDisplayName(name);
    // Persiste no backend reusando o PUT de /stats. Esse endpoint exige os
    // stats (são int primitivo no backend), então enviamos os valores atuais
    // junto com o novo username — senão o backend recebe null e quebra.
    if (userId) {
      await updateProfile(userId, {
        username: name,
        level: profile?.level ?? 0,
        vitorias: profile?.vitorias ?? 0,
        derrotas: profile?.derrotas ?? 0,
      });
    }
  }
  const [editNameVisible, setEditNameVisible] = useState(false);
  const [editAvatarVisible, setEditAvatarVisible] = useState(false);

  function BlinkCursor() {
    const opacity = useRef(new Animated.Value(1)).current;
    useEffect(() => {
      const loop = Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, { toValue: 0, duration: 0, delay: 500, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 1, duration: 0, delay: 500, useNativeDriver: true }),
        ]),
      );
      loop.start();
      return () => loop.stop();
    }, [opacity]);
    return <Animated.Text style={[styles.name, { opacity }]}>_</Animated.Text>;
  }


  return (
    <PixelBorderDouble style={[styles.section, styles.shadowLg]}>
      <View style={styles.cardRow}>
        <View style={styles.avatarColumn}>
          <PixelBorderDouble style={styles.avatarFrame}>
            <Pressable
              style={({ pressed }) => [styles.photoBtn, pressed && styles.pressed]}
              hitSlop={8}
              onPress={() => setEditAvatarVisible(true)}
            >
              <MaterialIcons name="photo-camera" size={16} color={colors.text.secondary} />
            </Pressable>
            <Image source={{ uri: avatar ?? undefined }} style={styles.avatar} resizeMode="cover" />
          </PixelBorderDouble>
          <View style={styles.eliteTag}>
            <Text style={styles.eliteText}>ELITE TRAINER</Text>
          </View>
        </View>

        <View style={styles.dataColumn}>
          <View style={styles.nameRow}>
            <Text style={styles.label}>NAME</Text>
            <Pressable style={styles.nameWrap} onPress={() => setEditNameVisible(true)}>
              <Text style={styles.name}>{trainerName.toUpperCase()}</Text>
              <BlinkCursor />
              <MaterialIcons name="edit" size={14} color={colors.primary} style={{ marginLeft: 4 }} />
            </Pressable>
          </View>

          <View style={styles.fieldGrid}>
            <View style={styles.fieldCol}>
              <DataField title="ID No." value={profile?.userId.slice(0, 8).toUpperCase() ?? '--'} />
              <DataField title="LEVEL" value={String(profile?.level ?? '--')} valueColor={colors.secondary} />
            </View>
            <View style={styles.fieldCol}>
              <DataField title="WINS" value={String(profile?.vitorias ?? 2)} valueColor={colors.secondary} />
              <DataField title="LOSSES" value={String(profile?.derrotas ?? 0)} />
            </View>
          </View>

          <XpBar level={profile?.level ?? 0} />

          <View style={styles.locationBlock}>
            <Text style={[styles.fieldLabel, { marginBottom: 6 }]}>LAST LOCATION</Text>
            <View style={styles.locationRow}>
              <MaterialIcons name="location-on" size={16} color={colors.primary} />
              <Text style={styles.bodyMd}>Indigo Plateau</Text>
            </View>
          </View>
        </View>
      </View>

      <EditModal
        visible={editNameVisible}
        title="Alterar Nome"
        value={displayName}
        placeholder="Digite seu nome..."
        onConfirm={handleSaveName}
        onClose={() => setEditNameVisible(false)}
      />

      <EditModal
        visible={editAvatarVisible}
        title="URL da Foto"
        value={typeof avatar === 'string' ? avatar : ''}
        placeholder="Cole a URL da imagem..."
        onConfirm={updateAvatar}
        onClose={() => setEditAvatarVisible(false)}
      />
    </PixelBorderDouble>
  );
}
