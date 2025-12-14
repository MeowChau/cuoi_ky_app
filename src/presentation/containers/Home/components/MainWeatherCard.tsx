// src/presentation/containers/Home/components/MainWeatherCard.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CHCText, CHCCard } from '../../../components';
import { WeatherDay, City } from '../../../../domain/entities/Weather';
import Colors from '../../../../theme/colors';
import { Size } from '../../../../theme/sizes';

interface MainWeatherCardProps {
  city: City;
  weather: WeatherDay;
}

export const MainWeatherCard: React.FC<MainWeatherCardProps> = ({
  city,
  weather,
}) => {
  return (
    <CHCCard style={styles.card}>
      {/* Header với Location và Icon */}
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <CHCText type="Heading2" color={Colors.Gray900}>
            {city.name}
          </CHCText>
          <CHCText type="Body2" color={Colors.Gray500} style={styles.description}>
            {weather.description}
          </CHCText>
        </View>
        <View style={styles.iconContainer}>
          <CHCText style={styles.icon}>{weather.icon}</CHCText>
        </View>
      </View>

      {/* Temperature - Center & Large */}
      <View style={styles.tempContainer}>
        <View style={styles.tempRow}>
          <CHCText type="Heading1" style={styles.mainTemp}>
            {weather.temp}
          </CHCText>
          <CHCText type="Heading1" style={styles.degreeSymbol}>
            °
          </CHCText>
        </View>
        <CHCText type="Body1" color={Colors.Gray600} style={styles.tempRange}>
          {weather.tempMin}° / {weather.tempMax}°
        </CHCText>
      </View>

      {/* Details - Độ ẩm & Gió */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <View style={styles.detailIconWrapper}>
            <CHCText style={styles.detailIcon}>💧</CHCText>
          </View>
          <View>
            <CHCText type="LabelSmall" color={Colors.Gray500}>
              Độ ẩm
            </CHCText>
            <CHCText type="Heading3" color={Colors.Gray800}>
              {weather.humidity}%
            </CHCText>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.detailItem}>
          <View style={styles.detailIconWrapper}>
            <CHCText style={styles.detailIcon}>💨</CHCText>
          </View>
          <View>
            <CHCText type="LabelSmall" color={Colors.Gray500}>
              Sức gió
            </CHCText>
            <CHCText type="Heading3" color={Colors.Gray800}>
              {weather.windSpeed} km/h
            </CHCText>
          </View>
        </View>
      </View>
    </CHCCard>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: Size.Spacing20,
    paddingVertical: Size.Spacing24,
    paddingHorizontal: Size.Spacing20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Size.Spacing24,
  },
  locationContainer: {
    flex: 1,
  },
  description: {
    marginTop: Size.Spacing4,
    textTransform: 'capitalize',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: Size.Radius16,
    backgroundColor: Colors.Blue100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 48,
  },
  tempContainer: {
    alignItems: 'center',
    paddingVertical: Size.Spacing24,
  },
  tempRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  mainTemp: {
    fontSize: 80,
    fontWeight: '700',
    color: Colors.Primary500,
    lineHeight: 88,
  },
  degreeSymbol: {
    fontSize: 40,
    fontWeight: '600',
    color: Colors.Primary500,
    marginTop: 8,
  },
  tempRange: {
    marginTop: Size.Spacing8,
  },
  detailsContainer: {
    flexDirection: 'row',
    paddingTop: Size.Spacing20,
    borderTopWidth: 1,
    borderTopColor: Colors.Gray100,
  },
  detailItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Size.Spacing12,
  },
  detailIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: Size.Radius12,
    backgroundColor: Colors.Gray100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailIcon: {
    fontSize: 24,
  },
  divider: {
    width: 1,
    backgroundColor: Colors.Gray200,
    marginHorizontal: Size.Spacing16,
  },
});