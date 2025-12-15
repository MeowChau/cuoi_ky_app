import React from 'react';
import { View } from 'react-native';
import { CHCImage, CHCText } from '../../../components';
import Colors from '../../../../theme/colors';
import { slideStyles } from './styles';

interface OnboardingSlideProps {
  image: any;
  title: string;
  titleHighlight?: string; 
  description: string;
}

export const OnboardingSlide: React.FC<OnboardingSlideProps> = ({
  image,
  title,
  titleHighlight,
  description,
}) => {
  const renderTitle = () => {
    if (!titleHighlight) {
      return <CHCText type="Heading2" style={slideStyles.title}>{title}</CHCText>;
    }

    const parts = title.split(titleHighlight);
    return (
      <CHCText type="Heading2" style={slideStyles.title}>
        {parts[0]}
        <CHCText type="Heading2" color={Colors.Accent700}>
          {titleHighlight}
        </CHCText>
        {parts[1]}
      </CHCText>
    );
  };

  return (
    <View style={slideStyles.container}>
      <View style={slideStyles.imageContainer}>
        <CHCImage
          source={image}
          style={slideStyles.image}
          resizeMode="cover"
          radius={24}
        />
      </View>
      
      <View style={slideStyles.textContainer}>
        {renderTitle()}
        <CHCText type="Body1" color={Colors.Gray600} style={slideStyles.description}>
          {description}
        </CHCText>
      </View>
    </View>
  );
};