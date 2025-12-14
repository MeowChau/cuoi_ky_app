import { StyleSheet } from 'react-native';
import { Fonts } from './fonts';
import Colors from './colors';

const Tpg = StyleSheet.create({
  // Heading - Dùng cho tiêu đề màn hình, tên địa điểm du lịch
  Heading1: {
    fontFamily: Fonts.Bold,
    fontSize: 32,
    lineHeight: 40,
    color: Colors.Gray900,
  },
  Heading2: {
    fontFamily: Fonts.Bold,
    fontSize: 24,
    lineHeight: 32,
    color: Colors.Gray900,
  },
  Heading3: {
    fontFamily: Fonts.SemiBold,
    fontSize: 20,
    lineHeight: 28,
    color: Colors.Gray900,
  },

  // Body - Dùng cho nội dung bài viết, mô tả
  Body1: {
    fontFamily: Fonts.Regular,
    fontSize: 16,
    lineHeight: 24,
    color: Colors.Gray700,
  },
  Body2: {
    fontFamily: Fonts.Regular,
    fontSize: 14,
    lineHeight: 22,
    color: Colors.Gray700,
  },

  // Label/Button - Dùng cho nút bấm, tab bar
  Label: {
    fontFamily: Fonts.Medium,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.Gray800,
  },
  LabelSmall: {
    fontFamily: Fonts.Medium,
    fontSize: 12,
    lineHeight: 16,
    color: Colors.Gray800,
  },

  // Caption - Dùng cho chú thích nhỏ, timestamp
  Caption: {
    fontFamily: Fonts.Regular,
    fontSize: 12,
    lineHeight: 16,
    color: Colors.Gray500,
  },
});

export default Tpg;
