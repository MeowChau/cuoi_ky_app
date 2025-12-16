// src/presentation/containers/Home/index.tsx
import React, { useState } from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { CHCText, CHCTextInput, CHCTouchable } from '../../components';
import { PlaceCard } from './components/PlaceCard';
import { WeatherForecast } from './components/WeatherForecast';
import { SearchResultCard } from './components/SearchResultCard';
import { homeStyles } from './styles';
import { useSearch, useHomeData } from './hooks';
import Colors from '../../../theme/colors';
import { Place } from '../../../domain/entities/Place';

// 🔥 IMPORT COMPONENT MODAL MỚI
import { PlaceDetailModal } from './components/PlaceDetailModal';

const HomeScreen: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const userName = user?.name || 'Bạn';
  
  const [searchQuery, setSearchQuery] = useState('');
  
  // 🔥 STATE QUẢN LÝ MODAL
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  // Hook Search & Data
  const { searchResults, isSearching, error: searchError, handleSearch, clearSearch } = useSearch();
  const { featuredPlaces, isLoading, error: dataError, refetch } = useHomeData();

  // 🔥 HÀM MỞ MODAL
  const handleOpenDetail = (place: Place) => {
    setSelectedPlace(place);
    setModalVisible(true);
  };

  // 🔥 HÀM ĐÓNG MODAL
  const handleCloseDetail = () => {
    setModalVisible(false);
    setSelectedPlace(null);
  };

  const onSearchChange = (text: string) => {
    setSearchQuery(text);
    if (text.trim().length === 0) {
      clearSearch();
      return;
    }

    // Gõ từ 1 ký tự trở lên là bắt đầu tìm kiếm
    handleSearch(text.trim());
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
            <CHCText type="Body2" color={Colors.Gray500}>Xin chào 👋</CHCText>
            <CHCText type="Heading2" style={homeStyles.userName}>{userName}</CHCText>
          </View>
          <CHCTouchable style={homeStyles.notificationButton}>
            <CHCText type="Heading2">🔔</CHCText>
          </CHCTouchable>
        </View>

        {/* Search Bar */}
        <View style={homeStyles.searchContainer}>
          <View style={homeStyles.searchInputWrapper}>
            <CHCTextInput
              placeholder="Tìm kiếm địa điểm..."
              value={searchQuery}
              onChangeText={onSearchChange}
              containerStyle={homeStyles.searchInputContainer}
            />
            {searchQuery.length > 0 && (
              <CHCTouchable style={homeStyles.clearButton} onPress={handleClearSearch}>
                <CHCText type="Heading3" color={Colors.Gray400}>✕</CHCText>
              </CHCTouchable>
            )}
          </View>
          
          {isSearching && (
            <ActivityIndicator color={Colors.Primary500} style={{marginTop: 10}} />
          )}
          
          {hasResults && !isSearching && (
            <View style={homeStyles.searchResultsContainer}>
              <ScrollView style={homeStyles.searchResultsList}>
                {searchResults.map((place) => (
                  <SearchResultCard 
                    key={place.id} 
                    place={place}
                    onPress={() => handleOpenDetail(place)} // Mở modal khi click tìm kiếm
                  />
                ))}
              </ScrollView>
            </View>
          )}
        </View>

        {!isSearchActive && (
          <>
            {/* Section 1: Địa điểm nổi bật */}
            <View style={homeStyles.section}>
              <View style={homeStyles.sectionHeader}>
                <CHCText type="Heading3">Địa điểm nổi bật</CHCText>
                <CHCTouchable onPress={refetch}>
                  <CHCText type="Body2" color={Colors.Primary500}>Làm mới</CHCText>
                </CHCTouchable>
              </View>

              {isLoading ? (
                <View style={{ height: 200, justifyContent: 'center', alignItems: 'center' }}>
                  <ActivityIndicator size="large" color={Colors.Primary500} />
                </View>
              ) : (
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={homeStyles.horizontalList}
                >
                  {featuredPlaces.map((place) => (
                    <PlaceCard 
                      key={place.id} 
                      place={place} 
                      // 🔥 GỌI HÀM MỞ MODAL TẠI ĐÂY
                      onPress={() => handleOpenDetail(place)} 
                    />
                  ))}
                </ScrollView>
              )}
            </View>

            {/* Section 2: Weather */}
            <View style={homeStyles.section}>
              <View style={homeStyles.sectionHeader}>
                <CHCText type="Heading3">Dự báo thời tiết</CHCText>
              </View>
              <WeatherForecast />
            </View>
          </>
        )}
      </ScrollView>

      {/* 🔥 HIỂN THỊ MODAL Ở CUỐI CÙNG */}
      <PlaceDetailModal 
        visible={isModalVisible} 
        place={selectedPlace} 
        onClose={handleCloseDetail} 
      />

    </SafeAreaView>
  );
};

export default HomeScreen;