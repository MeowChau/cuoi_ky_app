// src/presentation/containers/Home/components/WeatherForecast.tsx
import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import {
  CHCText,
  CHCTouchable,
  CHCTextInput,
  CHCButton,
} from '../../../components';
import { CitySelector } from './CitySelector';
import { MainWeatherCard } from './MainWeatherCard';
import { NextDayCard } from './NextDayCard';
import { useWeatherForecast } from '../hooks';
import Colors from '../../../../theme/colors';
import { Size } from '../../../../theme/sizes';

export const WeatherForecast: React.FC = () => {
  const {
    cities,
    selectedCity,
    citySearchKeyword,
    setCitySearchKeyword,
    weatherData,
    isLoading,
    isSearchingCity,
    error,
    handleCityChange,
    handleSearchCityWeather,
    refetch,
  } = useWeatherForecast();

  return (
    <View style={styles.container}>
      {/* Search by Province */}
      <View style={styles.searchContainer}>
        <CHCTextInput
          placeholder="Tìm thời tiết theo tỉnh/thành (VD: Huế, Cần Thơ)"
          value={citySearchKeyword}
          onChangeText={setCitySearchKeyword}
          onSubmitEditing={() => handleSearchCityWeather(citySearchKeyword)}
          containerStyle={styles.searchInput}
        />
        <CHCButton
          title="Tìm"
          onPress={() => handleSearchCityWeather(citySearchKeyword)}
          isLoading={isSearchingCity}
          disabled={isSearchingCity}
          style={styles.searchButton}
        />
      </View>

      {/* City Selector */}
      <CitySelector
        cities={cities}
        selectedCity={selectedCity}
        onCityChange={handleCityChange}
      />

      {/* Loading State */}
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.Primary500} />
          <CHCText
            type="Body2"
            color={Colors.Gray500}
            style={styles.loadingText}
          >
            Đang tải dữ liệu thời tiết...
          </CHCText>
        </View>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <View style={styles.errorContainer}>
          <CHCText type="Body1" color={Colors.Red500} style={styles.errorText}>
            ⚠️ {error}
          </CHCText>
          <CHCTouchable onPress={refetch} style={styles.retryButton}>
            <CHCText type="Label" color={Colors.Primary500}>
              🔄 Thử lại
            </CHCText>
          </CHCTouchable>
        </View>
      )}

      {/* Weather Data */}
      {weatherData && !isLoading && !error && (
        <>
          {/* Main Card (Today) */}
          <MainWeatherCard
            city={weatherData.city}
            weather={weatherData.forecast[0]}
          />

          {/* Next Days */}
          {weatherData.forecast.length > 1 && (
            <View style={styles.nextDaysSection}>
              {/* Header - Cùng padding với "Dự báo thời tiết" */}
              <CHCText
                type="Heading3"
                color={Colors.Gray800}
                style={styles.nextDaysTitle}
              >
                Dự báo {weatherData.forecast.length - 1} ngày tới
              </CHCText>

              {/* Cards Container */}
              <View style={styles.nextDaysContainer}>
                {weatherData.forecast.slice(1).map((day, index) => (
                  <NextDayCard key={index} weather={day} />
                ))}
              </View>
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Size.Spacing24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Size.Spacing8,
    paddingHorizontal: Size.Spacing4,
  },
  searchInput: {
    flex: 1,
    marginBottom: 0,
  },
  searchButton: {
    height: 56,
    minWidth: 84,
    marginBottom: 0,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: Size.Spacing48,
    backgroundColor: Colors.Gray100,
    borderRadius: Size.Radius16,
    marginTop: Size.Spacing12,
  },
  loadingText: {
    marginTop: Size.Spacing12,
  },
  errorContainer: {
    alignItems: 'center',
    paddingVertical: Size.Spacing24,
    paddingHorizontal: Size.Spacing20,
    backgroundColor: Colors.Red100,
    borderRadius: Size.Radius16,
    marginTop: Size.Spacing12,
  },
  errorText: {
    textAlign: 'center',
    marginBottom: Size.Spacing12,
  },
  retryButton: {
    paddingHorizontal: Size.Spacing20,
    paddingVertical: Size.Spacing8,
    backgroundColor: Colors.White,
    borderRadius: Size.Radius8,
    borderWidth: 1,
    borderColor: Colors.Primary500,
  },
  nextDaysSection: {
    marginTop: Size.Spacing8,
  },
  // ✅ CẬP NHẬT: Dùng Size.Spacing24 như sectionHeader
  nextDaysTitle: {
    marginBottom: Size.Spacing16,
    paddingHorizontal: Size.Spacing24, // ✅ Cùng padding với "Dự báo thời tiết"
  },
  nextDaysContainer: {
    flexDirection: 'row',
    gap: Size.Spacing12,
    paddingHorizontal: Size.Spacing24, // ✅ Cards cũng có padding như list trên
  },
});
