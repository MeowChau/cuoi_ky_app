import React from 'react';
import { View, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { CHCText, CHCTouchable } from '../../components';
import { MessageBubble } from './components/MessageBubble';
import { ChatInput } from './components/ChatInput';
import { SuggestedPrompts } from './components/SuggestedPrompts';
import { SmartPlanForm } from './components/SmartPlanForm';
import { useChat } from './hooks';
import { SUGGESTED_PROMPTS } from './mockData';
import { aiAssistantStyles } from './styles';
import Colors from '../../../theme/colors';

const AIAssistantScreen: React.FC = () => {
  // ✅ GỌI HOOKS Ở ĐẦU COMPONENT, KHÔNG ĐIỀU KIỆN
  const {
    messages,
    inputText,
    setInputText,
    isLoading,
    error,
    scrollViewRef,
    handleSend,
    handleSuggestedPrompt,
    handleCreateSmartPlan,
    showSmartPlanForm,
    setShowSmartPlanForm,
    clearChat,
  } = useChat();

  const showSuggestions = messages.length <= 1;

  return (
    <SafeAreaView style={aiAssistantStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.White} />

      {/* Header */}
      <View style={aiAssistantStyles.header}>
        <View style={aiAssistantStyles.headerLeft}>
          <View style={aiAssistantStyles.headerIcon}>
            <CHCText type="Heading2">🤖</CHCText>
          </View>
          <View>
            <CHCText type="Heading3" style={aiAssistantStyles.headerTitle}>
              Trợ lý AI
            </CHCText>
            <CHCText type="Body3" color={Colors.Gray500}>
              {isLoading ? 'Đang trả lời...' : 'Trực tuyến'}
            </CHCText>
          </View>
        </View>

        {messages.length > 1 && (
          <CHCTouchable onPress={clearChat} style={aiAssistantStyles.clearButton}>
            <CHCText type="Body2" color={Colors.Error500}>
              🗑️ Xóa
            </CHCText>
          </CHCTouchable>
        )}
      </View>

      {/* Error Banner */}
      {error && (
        <View style={aiAssistantStyles.errorBanner}>
          <CHCText type="Body2" color={Colors.Error500}>
            ⚠️ {error}
          </CHCText>
        </View>
      )}

      {/* Chat Messages */}
      <View style={aiAssistantStyles.chatContainer}>
        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={aiAssistantStyles.messagesList}
        >
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}

          {showSuggestions && (
            <SuggestedPrompts
              prompts={SUGGESTED_PROMPTS}
              onSelect={handleSuggestedPrompt}
            />
          )}
        </ScrollView>
      </View>

      {/* Chat Input */}
      <ChatInput
        value={inputText}
        onChangeText={setInputText}
        onSend={handleSend}
        disabled={isLoading}
      />

      {/* Smart Plan Form */}
      <SmartPlanForm
        visible={showSmartPlanForm}
        onClose={() => setShowSmartPlanForm(false)}
        onSubmit={(data) => {
          handleCreateSmartPlan(data);
          setShowSmartPlanForm(false);
        }}
      />
    </SafeAreaView>
  );
};

export default AIAssistantScreen;