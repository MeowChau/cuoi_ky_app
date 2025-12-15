import { useState, useRef } from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

interface OnboardingData {
  id: string;
  image: any;
  title: string;
  titleHighlight?: string;
  description: string;
  buttonText: string;
}

export const ONBOARDING_DATA: OnboardingData[] = [
  {
    id: '1',
    image: require('../../../assets/image/anh-gioi-thieu-1.jpg'),
    title: 'Tuyệt tác đang vẫy gọi từ nơi',
    titleHighlight: ' Biển Đông',
    description:
      'Đắm mình trong làn nước xanh ngọc bích. Hãy để tâm hồn bạn trôi theo những con sóng',
    buttonText: 'Tiếp tục',
  },
  {
    id: '2',
    image: require('../../../assets/image/anh-gioi-thieu-2.jpg'),
    title: 'Chinh phục những',
    titleHighlight: ' Đỉnh cao',
    description:
      'Khám phá những cung đường đèo ngoạn mục và tìm thấy trạm sạc năng lượng giữa thiên nhiên',
    buttonText: 'Tiếp tục',
  },
  {
    id: '3',
    image: require('../../../assets/image/anh-gioi-thieu-4.webp'),
    title: 'Du lịch thông minh cùng',
    titleHighlight: ' Trợ lý ảo',
    description:
      'Trợ lý ảo sẽ thiết kế lịch trình riêng biệt, giúp bạn tự do khám phá Việt Nam',
    buttonText: 'Bắt đầu ngay',
  },
];

interface UseOnboardingReturn {
  currentIndex: number;
  flatListRef: React.RefObject<FlatList | null>;
  handleScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  handleNext: () => void;
  handleSkip: () => void;
}

export const useOnboarding = (onComplete: () => void): UseOnboardingReturn => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < ONBOARDING_DATA.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return {
    currentIndex,
    flatListRef,
    handleScroll,
    handleNext,
    handleSkip,
  };
};
