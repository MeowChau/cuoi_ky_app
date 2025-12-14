import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CHCText, CHCTouchable, CHCImage } from '../../../components';
import { Place } from '../../../../domain/entities/Place';
import Colors from '../../../../theme/colors';
import { Size } from '../../../../theme/sizes';

interface SearchResultCardProps {
  place: Place;
  onPress: () => void;
}

export const SearchResultCard: React.FC<SearchResultCardProps> = ({ place, onPress }) => {
  return (
    <CHCTouchable style={styles.card} onPress={onPress}>
      {/* Image */}
      <CHCImage
        source={{ uri: place.image }}
        style={styles.image}
        resizeMode="cover"
      />
      
      <View style={styles.content}>
        {/* Name */}
        <CHCText type="Heading4" numberOfLines={1}>
          {place.name}
        </CHCText>
        
        {/* Location */}
        <View style={styles.locationRow}>
          <CHCText type="Body3" color={Colors.Gray500} numberOfLines={1}>
            📍 {place.location}
          </CHCText>
        </View>

        {/* Footer: Rating + Category */}
        <View style={styles.footer}>
          {place.rating && (
            <View style={styles.rating}>
              <CHCText type="Body3">⭐</CHCText>
              <CHCText type="Body3" color={Colors.Gray700}>
                {place.rating.toFixed(1)}
              </CHCText>
            </View>
          )}

          {place.category && (
            <View style={styles.badge}>
              <CHCText type="Caption" color={Colors.Primary700}>
                {place.category}
              </CHCText>
            </View>
          )}
        </View>
      </View>
    </CHCTouchable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Size.Spacing12,
    backgroundColor: Colors.White,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Gray100,
  },
  
  image: {
    width: 60,
    height: 60,
    borderRadius: Size.Radius8,
    marginRight: Size.Spacing12,
    backgroundColor: Colors.Gray100,
  },
  
  content: {
    flex: 1,
  },

  locationRow: {
    marginTop: Size.Spacing4,
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Size.Spacing8,
    gap: Size.Spacing8,
  },

  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Size.Spacing4,
  },

  badge: {
    backgroundColor: Colors.Primary100,
    paddingHorizontal: Size.Spacing8,
    paddingVertical: Size.Spacing4,
    borderRadius: Size.Radius4,
  },
});