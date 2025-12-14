// src/presentation/containers/Home/index.tsx
import React, { useState } from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { CHCText, CHCTextInput, CHCTouchable } from '../../components';
import { PlaceCard } from './components/PlaceCard';
import { WeatherForecast } from './components/WeatherForecast'; // ✨ NEW
import { SearchResultCard } from './components/SearchResultCard';
import { homeStyles } from './styles';
import { useSearch } from './hooks';
import { FAMOUS_PLACES } from './mockData';
import Colors from '../../../theme/colors';

const HomeScreen: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const userName = user?.name || 'Bạn';
  
  const [searchQuery, setSearchQuery] = useState('');
  const { searchResults, isSearching, error, handleSearch, clearSearch } = useSearch();

  const onSearchChange = (text: string) => {
    setSearchQuery(text);
    
    if (text.trim().length === 0) {
      clearSearch();
      return;
    }

    if (text.trim().length >= 2) {
      handleSearch(text.trim());
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    clearSearch();
  };

  const isSearchActive = searchQuery.trim().length > 0;
  const hasResults = searchResults.length > 0;

  return (
    <SafeAreaView style={homeStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.White} />
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={homeStyles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={homeStyles.header}>
          <View>
            <CHCText type="Body2" color={Colors.Gray500}>
              Xin chào 👋
            </CHCText>
            <CHCText type="Heading2" style={homeStyles.userName}>
              {userName}
            </CHCText>
          </View>
          
          <CHCTouchable style={homeStyles.notificationButton}>
            <CHCText type="Heading2">🔔</CHCText>
          </CHCTouchable>
        </View>

        {/* Search Bar */}
        <View style={homeStyles.searchContainer}>
          <View style={homeStyles.searchInputWrapper}>
            <CHCTextInput
              placeholder="Tìm kiếm địa điểm, thành phố..."
              value={searchQuery}
              onChangeText={onSearchChange}
              containerStyle={homeStyles.searchInputContainer}
            />
            
            {searchQuery.length > 0 && (
              <CHCTouchable 
                style={homeStyles.clearButton}
                onPress={handleClearSearch}
              >
                <CHCText type="Heading3" color={Colors.Gray400}>
                  ✕
                </CHCText>
              </CHCTouchable>
            )}
          </View>
          
          {isSearching && (
            <View style={homeStyles.searchLoadingContainer}>
              <ActivityIndicator color={Colors.Primary500} />
              <CHCText type="Body2" color={Colors.Gray500} style={homeStyles.searchLoadingText}>
                Đang tìm kiếm...
              </CHCText>
            </View>
          )}
          
          {error && !isSearching && (
            <View style={homeStyles.searchErrorContainer}>
              <CHCText type="Body2" color={Colors.Red500}>
                {error}
              </CHCText>
            </View>
          )}
          
          {hasResults && !isSearching && (
            <View style={homeStyles.searchResultsContainer}>
              <View style={homeStyles.searchResultsHeader}>
                <CHCText type="Body2" color={Colors.Gray600}>
                  Tìm thấy {searchResults.length} kết quả
                </CHCText>
              </View>

              <ScrollView style={homeStyles.searchResultsList}>
                {searchResults.map((place) => (
                  <SearchResultCard 
                    key={place.id} 
                    place={place}
                    onPress={() => {
                      console.log('Selected:', place);
                      handleClearSearch();
                    }}
                  />
                ))}
              </ScrollView>
            </View>
          )}
        </View>

        {!isSearchActive && (
          <>
            {/* Section 1: Famous Places */}
            <View style={homeStyles.section}>
              <View style={homeStyles.sectionHeader}>
                <CHCText type="Heading3">Địa điểm nổi bật</CHCText>
                <CHCTouchable>
                  <CHCText type="Body2" color={Colors.Primary500}>
                    Xem tất cả
                  </CHCText>
                </CHCTouchable>
              </View>

              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={homeStyles.horizontalList}
              >
                {FAMOUS_PLACES.map((place) => (
                  <PlaceCard key={place.id} place={place} />
                ))}
              </ScrollView>
            </View>

            {/* Section 2: Weather Forecast ✨ NEW */}
            <View style={homeStyles.section}>
              <View style={homeStyles.sectionHeader}>
                <CHCText type="Heading3">Dự báo thời tiết</CHCText>
              </View>

              <WeatherForecast />
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;