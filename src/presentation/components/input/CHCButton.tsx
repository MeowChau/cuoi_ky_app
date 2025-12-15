import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { CHCButtonProps } from '../type';
import { CHCTouchable } from '../core/CHCTouchable';
import { CHCText } from '../core/CHCText';
import Colors from '../../../theme/colors';

export const CHCButton: React.FC<CHCButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  isLoading,
  disabled,
  style,
  icon,
}) => {
  const getBgColor = () => {
    if (disabled) return Colors.Gray300;
    switch (variant) {
      case 'primary': return Colors.Primary500;
      case 'secondary': return Colors.AI500;
      case 'danger': return Colors.Red500;
      case 'outline': return Colors.Transparent;
      case 'ghost': return Colors.Transparent;
      default: return Colors.Primary500;
    }
  };

  const getTextColor = () => {
    if (disabled) return Colors.White;
    if (variant === 'outline') return Colors.Primary500;
    if (variant === 'ghost') return Colors.Gray700;
    return Colors.White;
  };

  return (
    <CHCTouchable
      onPress={onPress}
      disabled={isLoading || disabled}
      style={[
        styles.btn,
        { backgroundColor: getBgColor() },
        variant === 'outline' && styles.outline,
        style,
      ]}>
      {isLoading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <View style={styles.content}>
          {icon && <View style={styles.icon}>{icon}</View>}
          <CHCText type="Label" color={getTextColor()}>
            {title}
          </CHCText>
        </View>
      )}
    </CHCTouchable>
  );
};

const styles = StyleSheet.create({
  btn: {
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  outline: {
    borderWidth: 1,
    borderColor: Colors.Primary500,
  },
});