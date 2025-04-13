import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  ScrollView,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DoctorList from "../components/DoctorsList";
import axios from "axios";
import { StatusBar } from "expo-status-bar";

const ChatScreenPopup = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { _id: Date.now().toString(), text: "Hello Farhaan 👋 I'm your friend chatbot. How may I help you?", sender: "bot" },
    // { _id: (Date.now() + 1).toString(), text: "What can I do for you today?", sender: "bot" }
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [visibleWords, setVisibleWords] = useState([]);
  const [responseText, setResponseText] = useState([]);

  const fadeAnimations = useRef([]);
  const flatListRef = useRef(null);
  const translateTabY = useRef(new Animated.Value(0)).current;
  const translateDocY = useRef(new Animated.Value(500)).current;

  const memoizedChatHistory = React.useMemo(() => chatHistory, [chatHistory]);

  const popAnims = useRef({});

  const getPopAnim = (id) => {
    if (!popAnims.current[id]) {
      popAnims.current[id] = new Animated.Value(0);
    }
    return popAnims.current[id];
  };

  const cleanText = (text) => {
    return text
      .replace(/\t+/g, " ")    // Tabs to spaces
      .replace(/\s+/g, " ")    // Collapse all whitespace to single space
      .replace(/\n{2,}/g, "\n"); // Remove excessive new lines
  };

  // This function would connect to your Python backend
  const sendMessageToBackend = async (userMessage) => {
    try {
      const response = await axios.post("http://192.168.210.209:8000/chat/",
        {
          session_id: "1234",
          user_input: userMessage
        }, 
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(userMessage);
  
      console.log(response.data.response);
      return cleanText(response.data.response);
    } catch (error) {
      console.error("Error communicating with backend:", error);
      return "Sorry, I couldn't process your request right now.";
    }
  };
  
  const saveMessages = async (text, sender) => {
    // await response.data;
    // setChatHistory((prevHistory) => [
    //   ...prevHistory,
    //   { id: sender === "bot" ? "typing" : Date.now().toString(), text, sender },
    // ]);
    const response = await axios.post("http://192.168.210.209:3001/bot-chat", { text, sender });
    const data = response.data;
    console.log(data.message);
  }

  const handleSend = async () => {
    if (message.trim() === "") return;
  
    const userMessageText = message;
    saveMessages(userMessageText, "user");
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { _id: Date.now().toString(), text: userMessageText, sender: "user" },
    ]);
  
    setMessage("");
    setIsLoading(true);
  
    const botResponse = await sendMessageToBackend(userMessageText);
    const botMessageText = botResponse.trim();
  
    saveMessages(botMessageText, "bot");
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { _id: (Date.now() + 1).toString(), text: botMessageText, sender: "bot" },
    ]);
  
    setIsLoading(false);
  };

  useEffect(() => {
    // Trigger the pop-in animation for the latest message
    const latestMessage = chatHistory[chatHistory.length - 1];
    if (latestMessage) {
      const popAnim = getPopAnim(latestMessage._id);
      Animated.spring(popAnim, {
        toValue: 1,
        friction: 5,
        tension: 50,
        useNativeDriver: true,
      }).start();
    }
  }, [chatHistory]);

  const renderMessage = ({ item }) => {
    const isBot = item.sender === "bot";
    const popAnim = getPopAnim(item._id);

    return (
      <Animated.View
        style={[
          styles.messageBubble,
          isBot ? styles.botBubble : styles.userBubble,
          {
            transform: [
              { scale: popAnim },
              {
                translateX: popAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-50, 0],
                }),
              },
              {
                translateY: popAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-50, 0],
                }),
              },
            ],
            opacity: popAnim,
          },
        ]}
      >
        <Text
          style={[
            styles.messageText,
            isBot ? styles.botText : styles.userText,
          ]}
        >
          {item.text}
        </Text>
      </Animated.View>
    );
  };

  useEffect(() => {
    const getMessages = async () => {
      try {
          const response = await axios.get("http://192.168.210.209:3001/getMessages");
          const data = response.data;
          // console.log(data.messages);

          // Ensure `data.messages` is correctly added to chatHistory
          setChatHistory((prev) => [...prev, ...data.messages]); 
      } catch (error) {
          console.error("Error fetching messages:", error);
      }
  };
    getMessages();
  }, [])

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
}, [chatHistory]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <FlatList
        ref={flatListRef}
        data={chatHistory}
        renderItem={renderMessage}
        style={styles.chatContainer}
        keyExtractor={(item) => item._id} // Ensure this is correctly set
        contentContainerStyle={styles.chatContent}
        onLayout={() => flatListRef.current?.scrollToEnd({ animated: false })}
        />

      <Animated.View style={{ transform: [{ translateY: translateTabY }] }}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type message..."
            value={message}
            onChangeText={setMessage}
            placeholderTextColor="#999"
          />

          <TouchableOpacity style={styles.emojiButton}>
            <Ionicons name="happy-outline" size={32} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.sendButton,
              message.trim() ? styles.sendButtonActive : null,
            ]}
            onPress={handleSend}
            disabled={!message.trim()}
          >
            <Ionicons
              name="send"
              size={20}
              color={message.trim() ? "#fff" : ""}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
  },
  keyboardAvoid: {
    flex: 1,
  },
  header: {
    height: 60,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  chatContent: {
    flexGrow: 1,
    padding: 10,
    paddingBottom: 20,
  },
  messageBubble: {
    maxWidth: "80%",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginVertical: 5,
  },
  botBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderBottomLeftRadius: 5,
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#4FD1C5",
    borderBottomRightRadius: 5,
  },
  messageText: {
    fontSize: 16,
  },
  botText: {
    color: "#333",
    lineHeight: 20,
  },
  userText: {
    color: "#fff",
  },

  typingContainer: { flexDirection: "row", flexWrap: "wrap", lineHeight: 20 },
  typingText: { color: "red", fontSize: 16, lineHeight: 20 },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  emojiButton: {
    marginHorizontal: 8,
  },
  emoji: {
    fontSize: 24,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 20,
    borderBlockColor: "#f5f5f5",
    borderWidth: 0.3,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#333",
  },
  cameraButton: {
    marginHorizontal: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonActive: {
    backgroundColor: "#4FD1C5",
  },
  tabContainer: {
    backgroundColor: "#fff",
  },
  tabContent: {
    paddingHorizontal: 5,
    paddingTop: 8,
    paddingVertical: 12,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderWidth: 2,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 4,
    gap: 0,
  },
  tabIcon: {
    fontSize: 14,
    marginBottom: 4,
    marginRight: 5,
  },
  tabName: {
    fontSize: 16,
    color: "black",
    fontWeight: 600,
  },
});

export default ChatScreenPopup;
