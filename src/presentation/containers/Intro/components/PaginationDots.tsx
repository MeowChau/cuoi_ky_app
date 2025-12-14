import React from 'react';
import { View } from 'react-native';
import { paginationStyles } from './styles';

interface PaginationDotsProps {
  total: number;
  activeIndex: number;
}

export const PaginationDots: React.FC<PaginationDotsProps> = ({ total, activeIndex }) => {
  return (
    <View style={paginationStyles.container}>
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          style={[
            paginationStyles.dot,
            index === activeIndex && paginationStyles.activeDot,
          ]}
        />
      ))}
    </View>
  );
};