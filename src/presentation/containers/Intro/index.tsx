import React from 'react';
import { View, FlatList } from 'react-native';
import { CHCButton, CHCTouchable, CHCText } from '../../components';
import { OnboardingSlide } from './components/OnboardingSlide';
import { PaginationDots } from './components/PaginationDots';
import { useOnboarding, ONBOARDING_DATA } from './hooks';
import { onboardingStyles } from './styles';
import Colors from '../../../theme/colors';

interface OnboardingScreenProps {
  navigation: any;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  // ✅ Sửa: Thực sự navigate sang LoginScreen
  const navigateToLogin = () => {
    navigation.replace('Login'); // Dùng replace để không quay lại được Onboarding
  };

  const {
    currentIndex,
    flatListRef,
    handleScroll,
    handleNext,
    handleSkip,
  } = useOnboarding(navigateToLogin);

  return (
    <View style={onboardingStyles.container}>
      {/* Nút "Skip" ở góc trên phải */}
      <View style={onboardingStyles.skipContainer}>
        <CHCTouchable onPress={handleSkip} debounce={false}>
          <CHCText 
            type="Label" 
            color={Colors.Primary500}
            style={onboardingStyles.skipText}
          >
            Skip
          </CHCText>
        </CHCTouchable>
      </View>

      {/* FlatList hiển thị các slide */}
      <FlatList
        ref={flatListRef}
        data={ONBOARDING_DATA}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <OnboardingSlide
            image={item.image}
            title={item.title}
            titleHighlight={item.titleHighlight}
            description={item.description}
          />
        )}
      />

      {/* Footer: Pagination Dots + Button */}
      <View style={onboardingStyles.footer}>
        <PaginationDots 
          total={ONBOARDING_DATA.length} 
          activeIndex={currentIndex} 
        />
        
        <CHCButton
          title={ONBOARDING_DATA[currentIndex].buttonText}
          onPress={handleNext}
          variant="primary"
          style={onboardingStyles.button}
        />
      </View>
    </View>
  );
};

export default OnboardingScreen;