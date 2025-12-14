import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CHCText, CHCTouchable } from '../../../components';
import { Weather } from '../hooks';
import Colors from '../../../../theme/colors';
import { Size } from '../../../../theme/sizes';
import StyleGlobal from '../../../../theme/styleGlobals';

interface WeatherCardProps {
  weather: Weather;
}

const getWeatherIcon = (condition: Weather['condition']) => {
  switch (condition) {
    case 'sunny': return '☀️';
    case 'rainy': return '🌧️';
    case 'cloudy': return '☁️';
    default: return '🌤️';
  }
};

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  return (
    <CHCTouchable style={styles.card}>
      <View style={styles.left}>
        <CHCText type="Heading2" style={styles.icon}>
          {getWeatherIcon(weather.condition)}
        </CHCText>
        
        <View>
          <CHCText type="Heading3">{weather.city}</CHCText>
          <CHCText type="Body2" color={Colors.Gray500}>
            Độ ẩm: {weather.humidity}%
          </CHCText>
        </View>
      </View>
      
      <View style={styles.right}>
        <CHCText type="Heading1" color={Colors.Primary500}>
          {weather.temperature}°
        </CHCText>
      </View>
    </CHCTouchable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.White,
    borderRadius: Size.Radius12,
    padding: Size.Spacing16,
    ...StyleGlobal.shadowSmall,
    borderWidth: 1,
    borderColor: Colors.Gray100,
  },
  
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Size.Spacing12,
  },
  
  icon: {
    fontSize: 40,
  },
  
  right: {
    alignItems: 'flex-end',
  },
});