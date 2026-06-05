import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, Pressable, Animated, Modal, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { PixelBorderDouble } from '@/components/ui/PixelBorderDouble';
import { colors } from '@/constants/colors';
import { useAuth } from '@/contexts/AuthContext';
import { styles } from './styles';

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

function DataField({ title, value, valueColor }: { title: string; value: string; valueColor?: string }) {
  return (
    <View>
      <Text style={styles.fieldLabel}>{title}</Text>
      <Text style={[styles.fieldValue, valueColor ? { color: valueColor } : null]}>{value}</Text>
    </View>
  );
}

function EditModal({
  visible,
  title,
  value,
  placeholder,
  onConfirm,
  onClose,
}: {
  visible: boolean;
  title: string;
  value: string;
  placeholder: string;
  onConfirm: (v: string) => void;
  onClose: () => void;
}) {
  const [input, setInput] = useState(value);
  useEffect(() => { if (visible) setInput(value); }, [visible, value]);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={editStyles.overlay} onPress={onClose}>
        <Pressable style={editStyles.box} onPress={() => {}}>
          <Text style={editStyles.title}>{title}</Text>
          <TextInput
            style={editStyles.input}
            value={input}
            onChangeText={setInput}
            placeholder={placeholder}
            placeholderTextColor={colors.text.secondary}
            autoFocus
          />
          <View style={editStyles.row}>
            <TouchableOpacity style={editStyles.cancelBtn} onPress={onClose}>
              <Text style={editStyles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={editStyles.confirmBtn}
              onPress={() => { if (input.trim()) { onConfirm(input.trim()); onClose(); } }}
            >
              <Text style={editStyles.confirmText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

import { StyleSheet } from 'react-native';
const editStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  box: {
    width: '100%',
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 20,
    gap: 16,
  },
  title: {
    fontFamily: 'SpaceMono_700Bold',
    fontSize: 13,
    letterSpacing: 1,
    color: colors.text.primary,
    textTransform: 'uppercase',
  },
  input: {
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.surfaceHighlight,
    color: colors.text.primary,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
  },
  cancelText: {
    fontFamily: 'SpaceMono_700Bold',
    fontSize: 12,
    color: colors.text.secondary,
  },
  confirmBtn: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  confirmText: {
    fontFamily: 'SpaceMono_700Bold',
    fontSize: 12,
    color: colors.text.primary,
  },
});

export function TrainerCard() {
  const { displayName, avatar, updateDisplayName, updateAvatar } = useAuth();
  const [editNameVisible, setEditNameVisible] = useState(false);
  const [editAvatarVisible, setEditAvatarVisible] = useState(false);

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
              <Text style={styles.name}>{displayName.toUpperCase()}</Text>
              <BlinkCursor />
              <MaterialIcons name="edit" size={14} color={colors.primary} style={{ marginLeft: 4 }} />
            </Pressable>
          </View>

          <View style={styles.fieldGrid}>
            <View style={styles.fieldCol}>
              <DataField title="ID No." value="45256" />
              <DataField title="POKEDEX" value="386" />
            </View>
            <View style={styles.fieldCol}>
              <DataField title="MONEY" value="P57516" valueColor={colors.secondary} />
              <DataField title="TIME" value="3 36" />
            </View>
          </View>

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
        onConfirm={updateDisplayName}
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
