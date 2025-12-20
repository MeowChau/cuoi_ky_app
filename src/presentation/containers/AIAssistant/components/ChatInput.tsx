import React from 'react';
import { View, StyleSheet, TextInput, Platform, SafeAreaView } from 'react-native';
import { CHCTouchable, CHCText } from '../../../components';
import Colors from '../../../../theme/colors';
import { Size } from '../../../../theme/sizes';

interface ChatInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChangeText,
  onSend,
  disabled = false,
}) => {
  const handleSend = () => {
    if (value.trim() && !disabled) {
      onSend();
    }
  };

  return (
    <View style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nhập tin nhắn..."
            placeholderTextColor={Colors.Gray400}
            value={value}
            onChangeText={onChangeText}
            multiline
            maxLength={500}
            editable={!disabled}
            onSubmitEditing={handleSend}
          />

          <CHCTouchable
            style={[
              styles.sendButton,
              (!value.trim() || disabled) && styles.sendButtonDisabled,
            ]}
            onPress={handleSend}
            disabled={!value.trim() || disabled}
          >
            <CHCText type="Heading3" color={Colors.White} style={styles.sendIcon}>
              ➤
            </CHCText>
          </CHCTouchable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.White,
  },
  container: {
    backgroundColor: Colors.White,
    borderTopWidth: 1,
    borderTopColor: Colors.Gray200,
    paddingHorizontal: Size.Spacing16,
    paddingTop: Size.Spacing12,
    paddingBottom: Size.Spacing12,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Size.Spacing8,
  },

  input: {
    flex: 1,
    backgroundColor: Colors.Gray100,
    borderRadius: Size.Radius24,
    paddingHorizontal: Size.Spacing16,
    paddingVertical: Size.Spacing12,
    fontSize: 16,
    color: Colors.Gray900,
    maxHeight: 100,
    minHeight: 44,
  },

  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.Primary500,
    justifyContent: 'center',
    alignItems: 'center',
  },

  sendButtonDisabled: {
    backgroundColor: Colors.Gray300,
  },

  sendIcon: {
    fontSize: 20,
    lineHeight: 24,
  },
});