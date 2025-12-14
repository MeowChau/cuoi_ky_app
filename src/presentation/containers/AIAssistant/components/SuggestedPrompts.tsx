import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { CHCText, CHCTouchable } from '../../../components';
import Colors from '../../../../theme/colors';
import { Size } from '../../../../theme/sizes';

interface SuggestedPrompt {
  id: string;
  icon: string;
  title: string;
  prompt: string;
}

interface SuggestedPromptsProps {
  prompts: SuggestedPrompt[];
  onSelect: (prompt: string) => void;
}

export const SuggestedPrompts: React.FC<SuggestedPromptsProps> = ({
  prompts,
  onSelect,
}) => {
  return (
    <View style={styles.container}>
      <CHCText type="Heading3" style={styles.title}>
        Gợi ý cho bạn
      </CHCText>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {prompts.map((item) => (
          <CHCTouchable
            key={item.id}
            style={styles.card}
            onPress={() => onSelect(item.prompt)}
          >
            <CHCText type="Heading1" style={styles.icon}>
              {item.icon}
            </CHCText>
            <CHCText type="Heading4" style={styles.cardTitle} numberOfLines={2}>
              {item.title}
            </CHCText>
          </CHCTouchable>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: Size.Spacing16,
  },

  title: {
    paddingHorizontal: Size.Spacing24,
    marginBottom: Size.Spacing12,
    color: Colors.Gray700,
  },

  scrollContent: {
    paddingHorizontal: Size.Spacing24,
    gap: Size.Spacing12,
  },

  card: {
    width: 120,
    height: 120,
    backgroundColor: Colors.White,
    borderRadius: Size.Radius16,
    padding: Size.Spacing12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.Black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  icon: {
    fontSize: 36,
    marginBottom: Size.Spacing8,
  },

  cardTitle: {
    textAlign: 'center',
    color: Colors.Gray800,
  },
});