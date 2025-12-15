import React from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';
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
    handleConfirmTripPlan,
    handleEditTripPlan,
    showSmartPlanForm,
    setShowSmartPlanForm,
    clearChat,
  } = useChat();

  const showSuggestions = messages.length <= 1;

  return (
    <KeyboardAvoidingView 
      style={aiAssistantStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <StatusBar barStyle="dark-content" backgroundColor={Colors.White} />

      {/* Header - Compact */}
      <SafeAreaView style={aiAssistantStyles.headerSafeArea}>
        <View style={aiAssistantStyles.header}>
          <View style={aiAssistantStyles.headerLeft}>
            <View style={aiAssistantStyles.headerIcon}>
              <CHCText type="Heading2">🤖</CHCText>
            </View>
            <CHCText type="Heading3" style={aiAssistantStyles.headerTitle}>
              Trợ lý AI
            </CHCText>
          </View>

          {messages.length > 1 && (
            <CHCTouchable onPress={clearChat} style={aiAssistantStyles.clearButton}>
              <CHCText type="Body2" color={Colors.Gray600}>
                Xóa
              </CHCText>
            </CHCTouchable>
          )}
        </View>
      </SafeAreaView>

      {/* Error Banner */}
      {error && (
        <View style={aiAssistantStyles.errorBanner}>
          <CHCText type="Body2" color={Colors.Red500}>
            ⚠️ {error}
          </CHCText>
        </View>
      )}

      {/* Chat Messages - Full Screen */}
      <View style={aiAssistantStyles.chatContainer}>
        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={aiAssistantStyles.messagesList}
          keyboardShouldPersistTaps="handled"
        >
          {messages.map((message) => (
            <MessageBubble 
              key={message.id} 
              message={message}
              onConfirmTripPlan={handleConfirmTripPlan}
              onEditTripPlan={handleEditTripPlan}
            />
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
    </KeyboardAvoidingView>
  );
};

export default AIAssistantScreen;