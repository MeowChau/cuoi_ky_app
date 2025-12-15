import React from 'react';
import { Text } from 'react-native';
import { CHCTextProps } from '../type'; 
import Tpg from '../../../theme/typographys';

export const CHCText: React.FC<CHCTextProps> = ({
  onPress,
  numberOfLines,
  ellipsizeMode,
  children,
  style,
  color,
  type = 'Body1',
  ...rest
}) => {
  return (
    <Text
      onPress={onPress}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      style={[
        type in Tpg ? Tpg[type as keyof typeof Tpg] : undefined,
        color && { color },
        style
      ]}
      allowFontScaling={false}
      {...rest}>
      {children}
    </Text>
  );
};