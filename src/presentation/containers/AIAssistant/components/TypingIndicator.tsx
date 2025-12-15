import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Colors from '../../../../theme/colors';
import { Size } from '../../../../theme/sizes';

export const TypingIndicator: React.FC = () => {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = (dot: Animated.Value, delay: number) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animate(dot1, 0);
    animate(dot2, 200);
    animate(dot3, 400);
  }, [dot1, dot2, dot3]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.dot,
          {
            opacity: dot1,
            transform: [
              {
                translateY: dot1.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -8],
                }),
              },
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.dot,
          {
            opacity: dot2,
            transform: [
              {
                translateY: dot2.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -8],
                }),
              },
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.dot,
          {
            opacity: dot3,
            transform: [
              {
                translateY: dot3.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -8],
                }),
              },
            ],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Size.Spacing8,
    paddingVertical: Size.Spacing8,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.Gray400,
  },
});