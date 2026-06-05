import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Modal, ScrollView, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';
import { styles } from './styles';

const TYPES = [
  'fire', 'water', 'electric', 'grass', 'psychic',
  'flying', 'poison', 'bug', 'normal', 'dark',
  'dragon', 'fairy', 'fighting', 'rock', 'ground',
  'ghost', 'ice', 'steel',
] as const;

type PokemonType = typeof TYPES[number];

interface SearchFilterProps {
  search: string;
  onSearchChange: (text: string) => void;
  activeType: PokemonType | null;
  onTypeChange: (type: PokemonType | null) => void;
}

export function SearchFilter({ search, onSearchChange, activeType, onTypeChange }: SearchFilterProps) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <MaterialIcons name="search" size={18} color={colors.text.secondary} />
        <TextInput
          style={styles.input}
          placeholder="Buscar pokémon..."
          placeholderTextColor={colors.text.secondary}
          value={search}
          onChangeText={onSearchChange}
          autoCapitalize="none"
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => onSearchChange('')}>
            <MaterialIcons name="close" size={18} color={colors.text.secondary} />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.filterBtn, activeType && styles.filterBtnActive]}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.7}
        >
          <MaterialIcons
            name="filter-list"
            size={18}
            color={activeType ? colors.background : colors.text.secondary}
          />
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setModalVisible(false)}>
          <Pressable style={styles.sheet} onPress={() => {}}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Filtrar por tipo</Text>
              {activeType && (
                <TouchableOpacity onPress={() => { onTypeChange(null); setModalVisible(false); }}>
                  <Text style={styles.clearText}>Limpar</Text>
                </TouchableOpacity>
              )}
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.typesGrid}>
                {(['left', 'right'] as const).map((col) => (
                  <View key={col} style={styles.typesColumn}>
                    {TYPES.filter((_, i) => col === 'left' ? i % 2 === 0 : i % 2 !== 0).map((type) => {
                      const isActive = activeType === type;
                      const typeColor = colors.types[type];
                      return (
                        <TouchableOpacity
                          key={type}
                          style={[
                            styles.typeChip,
                            isActive && { backgroundColor: typeColor, borderColor: 'transparent' },
                          ]}
                          onPress={() => { onTypeChange(isActive ? null : type); setModalVisible(false); }}
                          activeOpacity={0.7}
                        >
                          <Text style={[styles.typeChipText, isActive && styles.typeChipTextActive]}>
                            {type}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                ))}
              </View>
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
