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

const ChatScreen = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { id: "1", text: "Hello Farhaan 👋 I'm Chatbot Max", sender: "bot" },
    { id: "2", text: "How are you?", sender: "bot" },
    { id: "3", text: "Hi, Max! I'm fine", sender: "user" },
    { id: "4", text: "What can I do for you today?", sender: "bot" }
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [visibleWords, setVisibleWords] = useState([]);
  const [responseText, setResponseText] = useState([]);

  const fadeAnimations = useRef([]);
  const flatListRef = useRef(null);
  const translateTabY = useRef(new Animated.Value(0)).current;
  const translateDocY = useRef(new Animated.Value(500)).current;

  const typingMessage = {
    id: "typing",
    text: "Wait for the response",
    sender: "bot",
  };

  const tabs = [
    {
      id: "1",
      name: "Emergency contact",
      icon: "🩺",
      borderBlockColor: "#ef4444",
      backgroundColor: "#fee2e2",
    },
    {
      id: "2",
      name: "Schedule a session",
      icon: "🛒",
      borderBlockColor: "#9333ea",
      backgroundColor: "#f3e8ff",
    },
    {
      id: "3",
      name: "Group",
      icon: "📃",
      borderBlockColor: "#eab308",
      backgroundColor: "#fef9c3",
    },
    {
      id: "4",
      name: "Favorites",
      icon: "❤️",
      borderBlockColor: "#22c55e",
      backgroundColor: "#dcfce7",
    },
    {
      id: "5",
      name: "Pharmacy",
      icon: "💊",
      borderBlockColor: "#3b82f6",
      backgroundColor: "#dbeafe",
    },
  ];

  // This function would connect to your Python backend
  const sendMessageToBackend = async (userMessage) => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch("http://your-python-backend/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error("Error communicating with backend:", error);
      return "Sorry, I couldn't process your request right now.";
    }
  };

  const handleSend = async () => {
    if (message.trim() === "") return;

    // Add user message to chat
    const userMessageId = Date.now().toString();
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { id: userMessageId, text: message, sender: "user" },
    ]);

    const userMessageText = message;
    setMessage("");
    // setIsLoading(true);

    // Simulate backend response (replace with actual API call)
    // Uncomment the line below and comment out the setTimeout when connecting to real backend
    // const botResponse = await sendMessageToBackend(userMessageText);

    const text =
      "Some sentence which definitely should be meaningful because it will come from an actual python backend. Currently some placeholder text is placed to simulate the response.";
    setIsTyping(true);
    setResponseText(text.split(" "));

    // setTimeout(() => {
    //     const botMessageId = (Date.now() + 1).toString();
    //     setChatHistory(prevHistory => [
    //         ...prevHistory,
    //         { id: botMessageId, text: text, sender: 'bot' }
    //     ]);
    //     // setIsLoading(false);
    // }, 2000);
  };

  const handleDoctor = () => {
    Animated.parallel([
      Animated.timing(translateTabY, {
        toValue: 150, // Move input & tabs DOWN by 100 pixels
        duration: 500, // Takes 500 milliseconds (0.5 seconds)
        useNativeDriver: true, // Optimizes performance
      }),
      Animated.timing(translateDocY, {
        toValue: 0, // Fully fades in the doctors' list
        duration: 500,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const onClose = () => {
    Animated.parallel([
      Animated.timing(translateTabY, {
        toValue: 0, // Move input & tabs DOWN by 100 pixels
        duration: 500, // Takes 500 milliseconds (0.5 seconds)
        delay: 300,
        useNativeDriver: true, // Optimizes performance
      }),
      Animated.timing(translateDocY, {
        toValue: 500, // Fully fades in the doctors' list
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const renderMessage = ({ item }) => {
    const isBot = item.sender === "bot";

    return (
      <View
        style={[
          styles.messageBubble,
          isBot ? styles.botBubble : styles.userBubble,
        ]}
      >
        {item.id === "typing" ? (
          <View style={styles.typingContainer}>
            {visibleWords.map((word, index) => (
              <Animated.Text
                key={index}
                style={[
                  styles.botText,
                  styles.messageText,
                  { opacity: fadeAnimations.current[index] },
                ]}
              >
                {word}{" "}
              </Animated.Text>
            ))}
          </View>
        ) : (
          <Text
            style={[
              styles.messageText,
              isBot ? styles.botText : styles.userText,
            ]}
          >
            {item.text}
          </Text>
        )}
      </View>
    );
  };

  const handleSchedule = (name) => {
    const newMessage = "Book a session for me with " + name;
    const userMessageId = Date.now().toString();
    setChatHistory((prev) => [
      ...prev,
      { id: userMessageId, text: newMessage, sender: "user" },
    ]);
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);

    setTimeout(() => {
      const botMessageId = (Date.now() + 1).toString();
      const text = "Successfully scheduled a session with " + name;
      setIsTyping(true);
      setResponseText(text.split(" "));

      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 2000);
  };

  useEffect(() => {
    if (responseText.length === 0) return;

    fadeAnimations.current = responseText.map(() => new Animated.Value(0));

    setVisibleWords([]);

    let i = 0;

    const interval = setInterval(() => {
      setVisibleWords((prev) => [...prev, responseText[i]]);

      Animated.timing(fadeAnimations.current[i], {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();

      i++;
      if (i >= responseText.length) {
        clearInterval(interval);

        setTimeout(() => {
          setChatHistory((prev) => [
            ...prev,
            {
              id: (Date.now() + 1).toString(),
              text: responseText.join(" "),
              sender: "bot",
            },
          ]);
          setVisibleWords([]);
          setResponseText([]);
          setIsTyping(false);
          setIsLoading(false);
        }, 100); // Small delay to ensure smooth transition
      }

      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);

    return () => clearInterval(interval);
  }, [responseText]);

  // useEffect(() => {
  //     if (!isTyping && visibleWords.length > 0) {
  //         // setChatHistory(prev => [
  //         //     ...prev,
  //         //     { id: (Date.now() + 1).toString(), text: visibleWords.join(' '), sender: 'bot' }
  //         // ]);
  //         setVisibleWords([]);  // Clear only after adding to chatHistory
  //         setResponseText([]);
  //     }
  //  }, [isTyping]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: "https://via.placeholder.com/40" }}
          style={styles.avatar}
        />
      </View>

      <FlatList
        ref={flatListRef}
        data={[
          ...chatHistory,
          ...(isTyping
            ? [{ id: "typing", text: visibleWords.join(" "), sender: "bot" }]
            : []),
        ]}
        renderItem={renderMessage}
        style={styles.chatContainer}
        keyExtractor={(item) => item.id}
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

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabContainer}
          contentContainerStyle={styles.tabContent}
        >
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tab,
                {
                  backgroundColor: tab.backgroundColor,
                  borderBlockColor: tab.borderBlockColor,
                  borderRightColor: tab.borderBlockColor,
                  borderLeftColor: tab.borderBlockColor,
                },
              ]}
              onPress={tab.id === "2" ? handleDoctor : undefined}
            >
              <Text style={styles.tabIcon}>{tab.icon}</Text>
              <Text style={styles.tabName}>{tab.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>

      {
        <Animated.View
          style={{
            position: "absolute",
            bottom: 0,
            transform: [{ translateY: translateDocY }],
          }}
        >
          <DoctorList onClose={onClose} handleSchedule={handleSchedule} />
        </Animated.View>
      }
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

export default ChatScreen;
