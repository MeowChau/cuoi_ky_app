import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { CHCText } from '../../../components';
import { ChatMessage } from '../../../../domain/entities/ChatMessage';
import Colors from '../../../../theme/colors';
import { Size } from '../../../../theme/sizes';
import { TypingIndicator } from './TypingIndicator';
import { ItineraryView } from './ItineraryView';
import { FlightResultsView } from './FlightResultsView';

interface MessageBubbleProps {
  message: ChatMessage;
  onConfirmTripPlan?: (tripPlan: any) => void;
  onEditTripPlan?: (tripPlan: any) => void;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ 
  message, 
  onConfirmTripPlan, 
  onEditTripPlan 
}) => {
  const isUser = message.sender === 'user';

  // --- 1. HIỂN THỊ TRẠNG THÁI ĐANG NHẬP ---
  if (message.isTyping) {
    return (
      <View style={[styles.container, styles.aiContainer]}>
        <View style={[styles.bubble, styles.aiBubble]}>
          <TypingIndicator />
        </View>
      </View>
    );
  }

  // --- 2. HÀM XỬ LÝ FORMAT TEXT (In đậm, List, Heading) ---
  
  // Helper: Xử lý in đậm **text** mà không làm vỡ layout (Inline Bold)
  const processBoldText = (text: string, isUser: boolean) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) => {
      if (i % 2 === 1) {
        // Phần text nằm giữa **...** sẽ được in đậm
        return (
          <Text 
            key={i} 
            style={{ 
              fontWeight: 'bold', 
              color: isUser ? Colors.White : Colors.Gray900 
            }}
          >
            {part}
          </Text>
        );
      }
      // Phần text thường
      return <Text key={i}>{part}</Text>;
    });
  };

  const renderFormattedText = (text: string) => {
    // Validation
    if (!text || typeof text !== 'string') {
      return (
        <CHCText 
          type="Body1" 
          color={isUser ? Colors.White : Colors.Gray900}
        >
          {text || ''}
        </CHCText>
      );
    }

    const lines = text.split('\n');
    
    return lines.map((line, index) => {
      // A. Xử lý Heading (## hoặc ###)
      if (line.startsWith('###') || line.startsWith('##')) {
        const content = line.replace(/^#+\s*/, '');
        return (
          <CHCText 
            key={index}
            type="Heading3" // Dùng Heading3 để không quá to
            color={isUser ? Colors.White : Colors.Gray900}
            style={styles.heading}
          >
            {content}
          </CHCText>
        );
      }

      // B. Xử lý List Item (Gạch đầu dòng hoặc số 1. 2.)
      const isBullet = line.trim().startsWith('-') || line.trim().startsWith('*');
      const isOrdered = /^\d+\./.test(line.trim());

      if (isBullet || isOrdered) {
        return (
          <View key={index} style={styles.listItemContainer}>
            <CHCText 
              type="Body1" 
              color={isUser ? Colors.White : Colors.Gray900} 
              style={styles.paragraph}
            >
              {processBoldText(line, isUser)}
            </CHCText>
          </View>
        );
      }

      // C. Xử lý đoạn văn thường (có thể chứa in đậm)
      if (line.trim()) {
        return (
          <CHCText 
            key={index}
            type="Body1" 
            color={isUser ? Colors.White : Colors.Gray900}
            style={styles.paragraph}
          >
            {processBoldText(line, isUser)}
          </CHCText>
        );
      }

      // Khoảng trắng giữa các đoạn
      return <View key={index} style={styles.spacer} />;
    });
  };

  return (
    <View style={[styles.container, isUser ? styles.userContainer : styles.aiContainer]}>
      {!isUser && (
        <View style={styles.avatar}>
          <CHCText type="Heading2">🤖</CHCText>
        </View>
      )}

      <View style={[styles.bubble, isUser ? styles.userBubble : styles.aiBubble]}>
        {message.tripPlan ? (
          <View style={styles.tripPlanContainer}>
            <ItineraryView 
              tripPlan={message.tripPlan}
              onConfirm={onConfirmTripPlan}
              onEdit={onEditTripPlan}
            />
          </View>
        ) : message.flightResults ? (
          <View style={styles.tripPlanContainer}>
            {message.text && (
              <View style={styles.textContainer}>
                {renderFormattedText(message.text)}
              </View>
            )}
            <FlightResultsView 
              flights={message.flightResults}
              isRoundTrip={message.isRoundTrip}
            />
          </View>
        ) : (
          <View>
            {renderFormattedText(message.text)}
          </View>
        )}
        
        <CHCText 
          type="Body2" 
          color={isUser ? Colors.Primary100 : Colors.Gray400}
          style={styles.timestamp}
        >
          {formatTime(message.timestamp)}
        </CHCText>
      </View>

      {isUser && (
        <View style={[styles.avatar, styles.userAvatar]}>
          <CHCText type="Heading2">👤</CHCText>
        </View>
      )}
    </View>
  );
};

function formatTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: Size.Spacing12,
    alignItems: 'flex-start',
    paddingHorizontal: Size.Spacing4,
  },

  userContainer: {
    justifyContent: 'flex-end',
    paddingLeft: 0,
  },

  aiContainer: {
    justifyContent: 'flex-start',
    paddingRight: 0,
  },

  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.Gray100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Size.Spacing8,
    marginTop: Size.Spacing4,
  },

  userAvatar: {
    backgroundColor: Colors.Primary100,
  },

  bubble: {
    flex: 1,
    maxWidth: '85%', // Giảm width để tin nhắn gọn gàng hơn
    padding: Size.Spacing12,
    borderRadius: Size.Radius16,
  },

  userBubble: {
    backgroundColor: Colors.Primary500,
    borderBottomRightRadius: Size.Radius4,
    marginRight: 0,
  },

  aiBubble: {
    backgroundColor: Colors.Gray50,
    borderBottomLeftRadius: Size.Radius4,
    marginLeft: 0,
    maxWidth: '100%',
  },

  tripPlanContainer: {
    gap: Size.Spacing12,
  },

  textContainer: {
    marginBottom: Size.Spacing12,
  },

  timestamp: {
    marginTop: Size.Spacing4,
    textAlign: 'right',
    fontSize: 11,
  },

  // --- STYLES CHO FORMAT TEXT MỚI ---
  
  heading: {
    marginTop: Size.Spacing12,
    marginBottom: Size.Spacing8,
    fontWeight: 'bold',
    fontSize: 16, // Kích thước chữ vừa phải
  },

  paragraph: {
    lineHeight: 22, // Tăng chiều cao dòng cho dễ đọc
    marginBottom: Size.Spacing4,
    fontSize: 14,
  },

  listItemContainer: {
    marginBottom: Size.Spacing8, // Tách các mục list ra
    paddingLeft: Size.Spacing4,
  },

  spacer: {
    height: Size.Spacing8,
  },
});
