import {
  TextProps as RNTextProps,
  TouchableOpacityProps as RNTouchableOpacityProps,
  ViewProps,
  ViewStyle,
  TextStyle,
  FlatListProps as RNFlatListProps,
  ImageProps as RNImageProps,
} from 'react-native';
import React from 'react';

// --- THEME TYPES ---
// Định nghĩa các keys của Typography để gợi ý code (Intellisense)
export type TypographyVariant =
  | 'Heading1'
  | 'Heading2'
  | 'Heading3'
  | 'Body1'
  | 'Body2'
  | 'Label'
  | 'LabelSmall'
  | 'Caption'
  | 'AIText';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger';

// --- COMPONENT PROPS ---

// 1. CHCText
export interface CHCTextProps extends RNTextProps {
  children?: React.ReactNode;
  color?: string; // Hex color override
  type?: TypographyVariant; // Preset styles từ theme
  style?: TextStyle;
}

// 2. CHCTouchable (Base interaction)
export interface CHCTouchableProps extends RNTouchableOpacityProps {
  debounce?: boolean; // Default: true
  children: React.ReactNode;
}

// 3. CHCButton
export interface CHCButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  isLoading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode; // Icon bên trái text
}

// 4. CHCIcon
export interface CHCIconProps {
  name: string;
  size?: number;
  color?: string;
  style?: ViewStyle;
}

// 5. CHCImage (Thay thế CHCFastImage)
export interface CHCImageProps extends RNImageProps {
  // ImageProps chuẩn đã có 'source', 'resizeMode', 'style'
  radius?: number; // Custom prop để bo góc nhanh
}

// 6. CHCCard
export interface CHCCardProps extends ViewProps {
  children: React.ReactNode;
  noShadow?: boolean; // Option tắt shadow nếu cần
}

// 7. CHCTag
export interface CHCTagProps {
  label: string;
  color?: string; // Background color
  textColor?: string;
  style?: ViewStyle;
}

// 8. CHCCheckbox
export interface CHCCheckboxProps {
  checked: boolean;
  label?: string;
  onPress: (newValue: boolean) => void;
  style?: ViewStyle;
}

// 9. CHCDropdown
export interface DropdownOption {
  label: string;
  value: string | number;
}

export interface CHCDropdownProps {
  data: DropdownOption[];
  value: DropdownOption | null;
  onSelect: (item: DropdownOption) => void;
  placeholder?: string;
  style?: ViewStyle;
}

// 10. CHCList
export interface CHCListProps<T> extends RNFlatListProps<T> {
  isLoading?: boolean;
  emptyText?: string; // Text hiển thị khi không có data
}

// 11. CHCListText (Row Item)
export interface CHCListTextProps {
  label: string;
  value?: string;
  onPress?: () => void;
  hasArrow?: boolean;
  icon?: React.ReactNode; // Icon bên trái label
  style?: ViewStyle;
}

// 12. CHCGroup
export interface CHCGroupProps {
  title?: string;
  children: React.ReactNode;
  style?: ViewStyle;
}

// 13. CHCTab (Segmented Control)
export interface CHCTabProps {
  tabs: string[];
  activeTab: number;
  onChange: (index: number) => void;
  style?: ViewStyle;
}

// 14. CHCPopup
export interface CHCPopupProps {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onClose: () => void; // Nút Cancel hoặc đóng
  onConfirm?: () => void; // Nút Primary Action
}

// 15. CHCToast
export interface CHCToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  visible: boolean;
  onHide?: () => void;
  duration?: number;
}

// 16. DatePicker & Calendar Wrappers
export interface CHCDatePickerProps {
  value?: Date;
  onChange: (date: Date) => void;
  minimumDate?: Date;
  maximumDate?: Date;
  mode?: 'date' | 'time' | 'datetime';
  placeholder?: string;
}

export interface CHCCalendarProps {
  markedDates?: any;
  onDayPress?: (date: any) => void;
  style?: ViewStyle;
}
