import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

const AICoachScreen = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');

  // TODO: Implement OpenAI GPT-4o API integration
  // TODO: Conversation memory and history storage

  const handleSend = useCallback(() => {
    if (inputText.trim().length === 0) return;

    const newMessage: Message = { id: Date.now().toString(), text: inputText, sender: 'user' };
    setMessages(prevMessages => [newMessage, ...prevMessages]);

    // Simulate AI response
    // Replace with actual API call
    setTimeout(() => {
      const aiResponse: Message = { id: (Date.now() + 1).toString(), text: `Echo: ${inputText}`, sender: 'ai' };
      setMessages(prevMessages => [aiResponse, ...prevMessages]);
    }, 1000);

    setInputText('');
  }, [inputText]);

  const startNewConversation = () => {
    setMessages([]);
    console.log("New AI Coach conversation started.");
    // TODO: Clear conversation history in backend if necessary
  }

  return (
    // <SafeAreaView style={styles.safeArea}> // Changed to View
    <View style={styles.screenContainer}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingViewContainer}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0} // Adjust if header is ever added by a parent navigator for this tab
      >
        <View style={styles.headerControls}>
          <Text style={styles.title}>AI Coach</Text>
          <Button title="New Chat" onPress={startNewConversation} />
        </View>
        <FlatList
          data={messages}
          renderItem={({ item }) => (
            <View style={[styles.messageBubble, item.sender === 'user' ? styles.userMessage : styles.aiMessage]}>
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          )}
          keyExtractor={item => item.id}
          inverted // To show newest messages at the bottom
          style={styles.messageList}
          contentContainerStyle={{ paddingBottom: 10 }} // Ensure last message isn't hidden
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type your message..."
            placeholderTextColor="#888"
            multiline
          />
          <TouchableOpacity onPress={handleSend} style={styles.sendButtonContainer}>
            <View style={styles.sendButton}>
              <Text style={styles.sendButtonText}>Send</Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
    // </SafeAreaView> // Changed to View
  );
};

const styles = StyleSheet.create({
  // safeArea: { // Renamed to screenContainer
  screenContainer: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  keyboardAvoidingViewContainer: {
    flex: 1,
    // backgroundColor: '#1a1a1a', // Handled by safeArea
  },
  headerControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  messageList: {
    flex: 1,
    paddingHorizontal: 10,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 18,
    marginVertical: 5,
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: '#007bff',
    alignSelf: 'flex-end',
  },
  aiMessage: {
    backgroundColor: '#2c2c2c',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    color: '#ffffff',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
    color: '#ffffff',
    backgroundColor: '#2c2c2c',
  },
  sendButtonContainer: {
    marginLeft: 10,
  },
  sendButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AICoachScreen; 