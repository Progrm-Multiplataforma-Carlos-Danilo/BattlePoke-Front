import {useState, useEffect} from 'react';
import {Modal, Pressable, Text, TextInput, View, TouchableOpacity} from 'react-native';
import {editStyles} from './style';
import {colors} from '@/constants/colors';

export function EditModal({
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