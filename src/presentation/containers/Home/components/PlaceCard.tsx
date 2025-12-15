import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CHCImage, CHCText, CHCTouchable } from '../../../components';
import { Place } from '../hooks';
import Colors from '../../../../theme/colors';
import { Size } from '../../../../theme/sizes';
import StyleGlobal from '../../../../theme/styleGlobals';

interface PlaceCardProps {
  place: Place;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({ place }) => {
  return (
    <CHCTouchable style={styles.card}>
      <CHCImage
        source={{ uri: place.image }}
        style={styles.image}
        radius={Size.Radius12}
      />
      
      <View style={styles.content}>
        <CHCText type="Heading3" numberOfLines={1}>
          {place.name}
        </CHCText>
        
        <View style={styles.footer}>
          <CHCText type="Body2" color={Colors.Gray500}>
            📍 {place.location}
          </CHCText>
          
          <View style={styles.rating}>
            <CHCText type="Body2">⭐</CHCText>
            <CHCText type="Body2" color={Colors.Gray700}>
              {place.rating}
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
    overflow: 'hidden',
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