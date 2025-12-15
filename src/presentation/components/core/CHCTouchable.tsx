import React, { useRef } from 'react';
import { TouchableOpacity } from 'react-native';
import moment from 'moment';
import { CHCTouchableProps } from '../type';

const DELAY_CLICK = 500;

export const CHCTouchable: React.FC<CHCTouchableProps> = ({
  debounce = true,
  children,
  onPress,
  style,
  disabled,
  activeOpacity = 0.8,
  ...props
}) => {
  const lastTimeClicked = useRef(0);

  const _onPress = (e: any) => {
    if (disabled) return;
    
    if (debounce) {
      const now = moment().valueOf();
      if (now - lastTimeClicked.current >= DELAY_CLICK) {
        lastTimeClicked.current = now;
        onPress?.(e);
      }
    } else {
      onPress?.(e);
    }
  };

  return (
    <TouchableOpacity
      style={style}
      activeOpacity={onPress ? activeOpacity : 1}
      disabled={disabled}
      onPress={_onPress}
      {...props}>
      {children}
    </TouchableOpacity>
  );
};