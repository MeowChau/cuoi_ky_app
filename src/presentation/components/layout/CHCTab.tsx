import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CHCTabProps } from '../type';
import { CHCTouchable } from '../core/CHCTouchable';
import { CHCText } from '../core/CHCText';
import Colors from '../../../theme/colors';

export const CHCTab: React.FC<CHCTabProps> = ({ tabs, activeTab, onChange, style }) => {
  return (
    <View style={[styles.container, style]}>
      {tabs.map((tab, index) => {
        const isActive = activeTab === index;
        return (
          <CHCTouchable
            key={index}
            style={[styles.item, isActive && styles.activeItem]}
            onPress={() => onChange(index)}
            debounce={false}
          >
            <CHCText 
              type="Label"
              color={isActive ? Colors.Primary700 : Colors.Gray500} 
              style={{ fontWeight: (isActive ? '700' : '500') as '700' | '500' }}
            >
              {tab}
            </CHCText>
          </CHCTouchable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    backgroundColor: Colors.Gray100, 
    borderRadius: 12, 
    padding: 4,
    height: 48,
  },
  item: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center', 
    borderRadius: 8,
  },
  activeItem: {
    backgroundColor: Colors.White,
    shadowColor: Colors.Black, 
    shadowOpacity: 0.1, 
    shadowRadius: 2, 
    elevation: 2,
    shadowOffset: { width: 0, height: 1 }
  },
});