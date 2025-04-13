// screens/NoteScreen.js
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const NoteScreen = ({ route, navigation }) => {
  const { isNewNote, noteId, title, content } = route.params || {};
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');

  const handleSaveNote = async () => {
    const note = {
      title: noteTitle, content: noteContent
    }

    const response = await axios.post("", note);
    await response.data;
  }

  useEffect(() => {
    // If editing an existing note, we would load its data
    if (noteId && !isNewNote) {
      // In a real app, we would fetch the note data here
      // For now, we'll just set a placeholder title if provided
      if (title && content) {
        setNoteTitle(title);
        setNoteContent(content);
      }
    }

    // Set up navigation header back button
    navigation.setOptions({
      // headerLeft: () => (
      //   <TouchableOpacity 
      //     style={styles.backButton} 
      //     onPress={() => navigation.goBack()}
      //   >
      //     <Feather name="chevron-left" size={24} color="#20B2AA" />
      //   </TouchableOpacity>
      // ),
      headerRight: () => (
        <TouchableOpacity style={styles.bellButton} onPress={handleSaveNote}>
          <Ionicons name="checkmark" size={28} color="#8E67FD" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, noteId, isNewNote, title]);

  return (
    <SafeAreaView style={styles.container}>

<View style={{ padding: 20, paddingBottom: 0 }}>
        <TextInput
          style={styles.titleInput}
          placeholder="Today’s Reflection"
          value={noteTitle}
          onChangeText={setNoteTitle}
          placeholderTextColor="#888"
        />
        <View style={{ height: .4, width: "100%", backgroundColor: "#333", marginBottom: 5 }} />
        <Text style={{ marginLeft: 5, color: "gray"}}>20/3/25 | 5:09 pm</Text>
        </View>

      <ScrollView style={styles.scrollView}>

        <TextInput
          style={styles.contentInput}
          placeholder="Your thoughts go here..."
          value={noteContent}
          onChangeText={setNoteContent}
          multiline
          placeholderTextColor="#888"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
    padding: 20,
    paddingTop: 5
  },
  backButton: {
    marginLeft: 15,
  },
  bellButton: {
    marginRight: 15,
  },
  titleInput: {
    fontSize: 25,
    fontWeight: 'bold',
    // marginBottom: 16,
    color: '#333',
  },
  contentInput: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    // flex: 1,
    // textAlignVertical: 'top',
  }
});

export default NoteScreen;