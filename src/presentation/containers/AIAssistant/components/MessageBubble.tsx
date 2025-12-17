import React from 'react';
import { View, StyleSheet } from 'react-native';
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

  if (message.isTyping) {
    return (
      <View style={[styles.container, styles.aiContainer]}>
        <View style={[styles.bubble, styles.aiBubble]}>
          <TypingIndicator />
        </View>
      </View>
    );
  }

    // ✅ FORMAT TEXT: Tách thành các đoạn
    const renderFormattedText = (text: string) => {
      // ✅ VALIDATION: Kiểm tra text trước khi xử lý
      if (!text || typeof text !== 'string') {
        return (
          <CHCText 
            type="Body1" 
            color={isUser ? Colors.White : Colors.Gray900}
          >
            [Tin nhắn rỗng]
          </CHCText>
        );
      }
  
      const lines = text.split('\n');
      
      return lines.map((line, index) => {
        // Heading (## hoặc ###)
        if (line.startsWith('###')) {
          return (
            <CHCText 
              key={index}
              type="Heading1" 
              color={isUser ? Colors.White : Colors.Gray900}
              style={styles.heading}
            >
              {line.replace(/^###\s*/, '')}
            </CHCText>
          );
        }
        
        if (line.startsWith('##')) {
          return (
            <CHCText 
              key={index}
              type="Heading3" 
              color={isUser ? Colors.White : Colors.Gray900}
              style={styles.heading}
            >
              {line.replace(/^##\s*/, '')}
            </CHCText>
          );
        }
  
        // Bold text (**text**)
        if (line.includes('**')) {
          const parts = line.split(/\*\*(.*?)\*\*/g);
          return (
            <CHCText 
              key={index}
              type="Body1" 
              color={isUser ? Colors.White : Colors.Gray900}
              style={styles.paragraph}
            >
              {parts.map((part, i) => 
                i % 2 === 1 ? (
                  <CHCText key={i} type="Heading1" color={isUser ? Colors.White : Colors.Gray900}>
                    {part}
                  </CHCText>
                ) : (
                  part
                )
              )}
            </CHCText>
          );
        }
  
        // List item (- hoặc *)
        if (line.trim().startsWith('-') || line.trim().startsWith('*')) {
          return (
            <CHCText 
              key={index}
              type="Body2" 
              color={isUser ? Colors.White : Colors.Gray800}
              style={styles.listItem}
            >
              • {line.replace(/^[-*]\s*/, '')}
            </CHCText>
          );
        }
  
        // Normal text
        if (line.trim()) {
          return (
            <CHCText 
              key={index}
              type="Body1" 
              color={isUser ? Colors.White : Colors.Gray900}
              style={styles.paragraph}
            >
              {line}
            </CHCText>
          );
        }
  
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
            {/* Chỉ hiển thị ItineraryView, không hiển thị text để tránh trùng lặp */}
            <ItineraryView 
              tripPlan={message.tripPlan}
              onConfirm={onConfirmTripPlan}
              onEdit={onEditTripPlan}
            />
          </View>
        ) : message.flightResults ? (
          <View style={styles.tripPlanContainer}>
            {message.text && renderFormattedText(message.text)}
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
    maxWidth: '95%',
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

  // ✅ FORMAT STYLES
  heading: {
    marginTop: Size.Spacing8,
    marginBottom: Size.Spacing4,
  },

  paragraph: {
    lineHeight: 20,
    marginBottom: Size.Spacing4,
  },

  listItem: {
    lineHeight: 20,
    marginBottom: Size.Spacing4,
    paddingLeft: Size.Spacing8,
  },

  spacer: {
    height: Size.Spacing8,
  },

  timestamp: {
    marginTop: Size.Spacing4,
    textAlign: 'right',
    fontSize: 11,
  },
  textContainer: {
    marginBottom: Size.Spacing12,
  },
});
