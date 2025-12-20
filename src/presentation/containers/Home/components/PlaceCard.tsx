// src/presentation/containers/Home/components/PlaceCard.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CHCImage, CHCText, CHCTouchable } from '../../../components';
import { Place } from '../../../../domain/entities/Place';
import Colors from '../../../../theme/colors';
import { Size } from '../../../../theme/sizes';
import StyleGlobal from '../../../../theme/styleGlobals';

interface PlaceCardProps {
  place: Place;
  onPress?: () => void;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({ place, onPress }) => {
  return (
    <CHCTouchable style={styles.card} onPress={onPress}>
      <CHCImage
        source={{ uri: place.image }}
        style={styles.image}
        radius={Size.Radius12}
        resizeMode="cover"
      />
      
      <View style={styles.content}>
        <CHCText type="Heading3" numberOfLines={1}>
          {place.name}
        </CHCText>
        
        <View style={styles.footer}>
          <CHCText type="Body2" color={Colors.Gray500} numberOfLines={1} style={{flex: 1}}>
            📍 {place.location}
          </CHCText>
          
          <View style={styles.rating}>
            <CHCText type="Body2">⭐</CHCText>
            <CHCText type="Body2" color={Colors.Gray700}>
              {place.rating ? Number(place.rating).toFixed(1) : 'N/A'}
            </CHCText>
          </View>
        </View>
      </View>
    </CHCTouchable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 260,
    backgroundColor: Colors.White,
    borderRadius: Size.Radius16,
    marginRight: Size.Spacing16, // Thêm khoảng cách giữa các card
    marginBottom: Size.Spacing4,
    ...StyleGlobal.shadowCard,
  },
  image: {
    width: '100%',
    height: 160,
  },
  content: {
    padding: Size.Spacing12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Size.Spacing8,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Size.Spacing4,
  },
});