import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CHCCalendarProps } from '../type'; // Import type
import { CHCText } from '../core/CHCText';
import Colors from '../../../theme/colors';

// import { Calendar } from 'react-native-calendars';

export const CHCCalendar: React.FC<CHCCalendarProps> = ({ 
  markedDates: _markedDates, 
  onDayPress: _onDayPress, 
  style 
}) => {
  return (
    <View style={[styles.container, style]}>
      {/* Header giả lập để demo UI */}
      <View style={styles.header}>
        <CHCText type="Heading3">Tháng 12, 2025</CHCText>
      </View>
      
      {/* Nơi đặt thư viện Calendar thực tế:
        <Calendar
          theme={{
            todayTextColor: Colors.Primary500,
            arrowColor: Colors.Primary500,
            monthTextColor: Colors.Gray900,
            textDayFontFamily: 'BeVietnamPro-Regular',
          }}
          markedDates={markedDates}
          onDayPress={onDayPress}
        /> 
      */}
      
      <View style={styles.placeholderBody}>
        <CHCText color={Colors.Gray400}>[Calendar Component Area]</CHCText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    borderRadius: 16,
    padding: 16,
    // Shadow nhẹ cho lịch nổi lên
    shadowColor: Colors.Black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    marginBottom: 16,
    alignItems: 'center',
  },
  placeholderBody: {
    height: 300,
    backgroundColor: Colors.Gray100,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});