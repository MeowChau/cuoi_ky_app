// src/presentation/containers/Home/components/CitySelector.tsx
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { CHCTouchable, CHCText } from '../../../components';
import { City } from '../../../../domain/entities/Weather';
import Colors from '../../../../theme/colors';
import { Size } from '../../../../theme/sizes';

interface CitySelectorProps {
  cities: City[];
  selectedCity: City;
  onCityChange: (city: City) => void;
}

export const CitySelector: React.FC<CitySelectorProps> = ({
  cities,
  selectedCity,
  onCityChange,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {cities.map(city => {
        const isSelected = city.id === selectedCity.id;
        return (
          <CHCTouchable
            key={city.id}
            style={[styles.chip, isSelected && styles.chipActive]}
            onPress={() => onCityChange(city)}
          >
            <CHCText
              type="Label"
              color={isSelected ? Colors.White : Colors.Gray700}
              style={styles.chipText}
            >
              {city.name}
            </CHCText>
          </CHCTouchable>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: Size.Spacing12,
    paddingHorizontal: Size.Spacing4,
    gap: Size.Spacing12,
  },
  chip: {
    paddingHorizontal: Size.Spacing20,
    paddingVertical: Size.Spacing12,
    borderRadius: Size.Radius24,
    backgroundColor: Colors.White,
    borderWidth: 1.5,
    borderColor: Colors.Gray200,
    // Shadow nhẹ
    shadowColor: Colors.Black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  chipActive: {
    backgroundColor: Colors.Primary500,
    borderColor: Colors.Primary500,
    // Shadow đậm hơn khi active
    shadowColor: Colors.Primary500,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  chipText: {
    fontWeight: '600',
  },
});