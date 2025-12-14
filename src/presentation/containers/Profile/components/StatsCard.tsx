import React from 'react';
import { View } from 'react-native';
import { CHCText } from '../../../components';
import { profileStyles } from '../styles';
import Colors from '../../../../theme/colors';

interface StatsCardProps {
  icon: string;
  label: string;
  value: string;
  color?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  icon,
  label,
  value,
  color = Colors.Primary500,
}) => {
  return (
    <View style={profileStyles.statCard}>
      <CHCText type="Heading1">{icon}</CHCText>
      <CHCText type="Heading3" color={color} style={profileStyles.statValue}>
        {value}
      </CHCText>
      <CHCText type="Body1" color={Colors.Gray500} style={profileStyles.statLabel}>
        {label}
      </CHCText>
    </View>
  );
};