import React, { useState } from 'react';
import { View, Modal, FlatList, StyleSheet } from 'react-native';
import { CHCDropdownProps } from '../type';
import { CHCTouchable } from '../core/CHCTouchable';
import { CHCText } from '../core/CHCText';
import Colors from '../../../theme/colors';

export const CHCDropdown: React.FC<CHCDropdownProps> = ({ 
  data, value, onSelect, placeholder = 'Chọn...', style 
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <CHCTouchable onPress={() => setVisible(true)} style={[styles.input, style]}>
        <CHCText color={value ? Colors.Gray900 : Colors.Gray400}>
          {value ? value.label : placeholder}
        </CHCText>
      </CHCTouchable>

      <Modal visible={visible} transparent animationType="fade">
        <CHCTouchable style={styles.overlay} onPress={() => setVisible(false)} activeOpacity={1}>
          <View style={styles.modalContent}>
            <FlatList
              data={data}
              keyExtractor={(i) => i.value.toString()}
              renderItem={({ item }) => (
                <CHCTouchable 
                  style={styles.item} 
                  onPress={() => { onSelect(item); setVisible(false); }}
                >
                  <CHCText>{item.label}</CHCText>
                </CHCTouchable>
              )}
            />
          </View>
        </CHCTouchable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1, borderColor: Colors.Gray300, borderRadius: 8, padding: 12, backgroundColor: Colors.White
  },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: Colors.White, borderRadius: 12, padding: 10, maxHeight: 300 },
  item: { padding: 16, borderBottomWidth: 1, borderBottomColor: Colors.Gray100 }
});