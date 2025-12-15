// src/presentation/containers/Home/components/NextDayCard.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CHCText, CHCCard } from '../../../components';
import { WeatherDay } from '../../../../domain/entities/Weather';
import Colors from '../../../../theme/colors';
import { Size } from '../../../../theme/sizes';

interface NextDayCardProps {
  weather: WeatherDay;
}

export const NextDayCard: React.FC<NextDayCardProps> = ({ weather }) => {
  const weekday = weather.date.toLocaleDateString('vi-VN', {
    weekday: 'short',
  });
  
  const dateStr = weather.date.toLocaleDateString('vi-VN', {
    day: 'numeric',
    month: 'numeric',
  });

  return (
    <CHCCard style={styles.card}>
      <View style={styles.content}>
        {/* Date */}
        <View style={styles.dateContainer}>
          <CHCText type="LabelSmall" color={Colors.Gray700}>
            {weekday}
          </CHCText>
          <CHCText type="Caption" color={Colors.Gray500}>
            {dateStr}
          </CHCText>
        </View>

        {/* Icon */}
        <View style={styles.iconContainer}>
          <CHCText style={styles.icon}>{weather.icon}</CHCText>
        </View>

        {/* Temperature */}
        <View style={styles.tempContainer}>
          <CHCText type="Heading2" color={Colors.Primary500} style={styles.mainTemp}>
            {weather.temp}°
          </CHCText>
          <CHCText type="Caption" color={Colors.Gray500} style={styles.tempRange}>
            {weather.tempMin}°/{weather.tempMax}°
          </CHCText>
        </View>
      </View>
    </CHCCard>
  );
};

const styles = StyleSheet.create({
  card: {
    // ✅ THAY ĐỔI: Dùng flex thay vì fixed width
    flex: 1,
    paddingVertical: Size.Spacing16,
    paddingHorizontal: Size.Spacing12,
  },
  content: {
    alignItems: 'center',
  },
  dateContainer: {
    alignItems: 'center',
    marginBottom: Size.Spacing12,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: Size.Radius12,
    backgroundColor: Colors.Blue100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Size.Spacing12,
  },
  icon: {
    fontSize: 32,
  },
  tempContainer: {
    alignItems: 'center',
  },
  mainTemp: {
    fontWeight: '700',
    marginBottom: Size.Spacing4,
  },
  tempRange: {
    fontSize: 11,
  },
});