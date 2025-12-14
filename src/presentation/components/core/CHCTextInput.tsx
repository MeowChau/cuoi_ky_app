import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import { CHCText } from './CHCText'; // ✅ Named import
import Colors from '../../../theme/colors';
import { Size } from '../../../theme/sizes';

interface CHCTextInputProps extends TextInputProps {
  label?: string;
  error?: string;
  showPasswordToggle?: boolean;
  containerStyle?: any;
}

export const CHCTextInput: React.FC<CHCTextInputProps> = ({ // ✅ Named export
  label,
  error,
  showPasswordToggle = false,
  containerStyle,
  secureTextEntry,
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <CHCText type="Body2" style={styles.label}>
          {label}
        </CHCText>
      )}

      <View style={[styles.inputWrapper, error && styles.inputError]}>
        <TextInput
          style={styles.input}
          secureTextEntry={showPasswordToggle ? !isPasswordVisible : secureTextEntry}
          placeholderTextColor={Colors.Gray400}
          {...props}
        />

        {showPasswordToggle && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.eyeButton}
            activeOpacity={0.7}
          >
            <View style={styles.eyeIconCircle}>
              <CHCText type="Heading3" style={styles.eyeIconText}>
                {isPasswordVisible ? '👁️' : '👁️‍🗨️'}
              </CHCText>
            </View>
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <CHCText type="Caption" color={Colors.Error500} style={styles.error}>
          {error}
        </CHCText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Size.Spacing16,
  },
  label: {
    marginBottom: Size.Spacing8,
    color: Colors.Gray700,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.Gray50,
    borderRadius: Size.Radius12,
    borderWidth: 1,
    borderColor: Colors.Gray200,
    paddingHorizontal: Size.Spacing16,
    height: 56,
  },
  inputError: {
    borderColor: Colors.Error500,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    color: Colors.Gray900,
    padding: 0,
  },
  eyeButton: {
    padding: Size.Spacing8,
    marginRight: -Size.Spacing8,
  },
  eyeIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.Gray100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeIconText: {
    fontSize: 20,
    opacity: 0.7,
  },
  error: {
    marginTop: Size.Spacing4,
  },
});