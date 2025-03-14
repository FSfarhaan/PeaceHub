import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Mindful = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [days, setDays] = useState([]);
  const todayDate = new Date().toISOString().split('T')[0];
  const [selections, setSelections] = useState({
    mood: null,
    sleep: null,
    appetite: null,
    energy: null,
    focus: null,
    stress: null,
    exercise: null,
    hydration: null,
    socialInteraction: null,
    gratitude: null,
  });
  const [journalEntry, setJournalEntry] = useState('');

  // const days = [
  //   { day: 'Sun', date: 24 },
  //   { day: 'Mon', date: 25 },
  //   { day: 'Tue', date: 26 },
  //   { day: 'Wed', date: 27 },
  //   { day: 'Thu', date: 28 },
  //   { day: 'Fri', date: 29 },
  //   { day: 'Sat', date: 30 },
  // ];

  const getCurrentWeek = () => {
    const today = new Date();
    const currentDayIndex = today.getDay(); // 0 (Sunday) to 6 (Saturday)
  
    // Find the Sunday of the current week
    const sunday = new Date(today);
    sunday.setDate(today.getDate() - currentDayIndex);
  
    // Generate the week (Sunday to Saturday)
    const week = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(sunday);
      date.setDate(sunday.getDate() + i);
      
      return {
        day: date.toLocaleDateString('en-US', { weekday: 'short' }), // 'Sun', 'Mon' etc.
        date: date.getDate(), // Numeric date
        fullDate: date.toISOString().split('T')[0] // "YYYY-MM-DD" for accurate comparison
      };
    });
  
    return week;
  };

  const handleSelection = (category, value) => {
    setSelections(prev => ({ ...prev, [category]: value }));
  };

  const emojiOptions = {
    mood: [
      { label: 'Low mood', emoji: '😔', value: 0 },
      { label: 'Bad', emoji: '😣', value: 1 },
      { label: 'Ok', emoji: '😐', value: 2 },
      { label: 'Good', emoji: '😊', value: 3 },
      { label: 'Fantastic', emoji: '😄', value: 4 },
    ],
    sleep: [
      { label: 'Terrible', emoji: '😴', value: 0 },
      { label: 'Bad', emoji: '😣', value: 1 },
      { label: 'Ok', emoji: '😐', value: 2 },
      { label: 'Good', emoji: '😊', value: 3 },
      { label: 'Excellent', emoji: '😄', value: 4 },
    ],
    appetite: [
      { label: 'None', emoji: '🚫', value: 0 },
      { label: 'Low', emoji: '🍽️', value: 1 },
      { label: 'Normal', emoji: '🍲', value: 2 },
      { label: 'Increased', emoji: '🍴', value: 3 },
      { label: 'Excessive', emoji: '🍔', value: 4 },
    ],
    energy: [
      { label: 'Depleted', emoji: '🔋', value: 0 },
      { label: 'Low', emoji: '🔌', value: 1 },
      { label: 'Average', emoji: '⚡', value: 2 },
      { label: 'Good', emoji: '🔆', value: 3 },
      { label: 'High', emoji: '⚡⚡', value: 4 },
    ],
    focus: [
      { label: 'Distracted', emoji: '🤯', value: 0 },
      { label: 'Poor', emoji: '😵', value: 1 },
      { label: 'Average', emoji: '🧠', value: 2 },
      { label: 'Good', emoji: '🎯', value: 3 },
      { label: 'Excellent', emoji: '🔍', value: 4 },
    ],
    stress: [
      { label: 'Extreme', emoji: '😱', value: 0 },
      { label: 'High', emoji: '😰', value: 1 },
      { label: 'Moderate', emoji: '😐', value: 2 },
      { label: 'Low', emoji: '🙂', value: 3 },
      { label: 'None', emoji: '😌', value: 4 },
    ],
    exercise: [
      { label: 'None', emoji: '🛌', value: 0 },
      { label: 'Light', emoji: '🚶', value: 1 },
      { label: 'Moderate', emoji: '🏃', value: 2 },
      { label: 'Intense', emoji: '🏋️', value: 3 },
      { label: 'Extreme', emoji: '🥵', value: 4 },
    ],
    hydration: [
      { label: 'Poor', emoji: '💧', value: 0 },
      { label: 'Low', emoji: '🥛', value: 1 },
      { label: 'Average', emoji: '💦', value: 2 },
      { label: 'Good', emoji: '🚰', value: 3 },
      { label: 'Excellent', emoji: '🌊', value: 4 },
    ],
    socialInteraction: [
      { label: 'None', emoji: '🔇', value: 0 },
      { label: 'Minimal', emoji: '👤', value: 1 },
      { label: 'Moderate', emoji: '👥', value: 2 },
      { label: 'Active', emoji: '💬', value: 3 },
      { label: 'Extensive', emoji: '🎭', value: 4 },
    ],
    gratitude: [
      { label: 'Low', emoji: '😕', value: 0 },
      { label: 'Mild', emoji: '🙂', value: 1 },
      { label: 'Moderate', emoji: '😊', value: 2 },
      { label: 'High', emoji: '🙏', value: 3 },
      { label: 'Profound', emoji: '✨', value: 4 },
    ],
  };

  const renderEmojiOptions = (category) => {
    return emojiOptions[category].map((option, index) => (
      <TouchableOpacity
        key={index}
        style={[
          styles.emojiContainer,
          selections[category] === option.value && styles.selectedEmoji
        ]}
        onPress={() => handleSelection(category, option.value)}
      >
        <Text style={styles.emoji}>{option.emoji}</Text>
        <Text style={styles.emojiLabel}>{option.label}</Text>
      </TouchableOpacity>
    ));
  };

  const categoryNames = {
    mood: 'Mood',
    sleep: 'Sleep quality',
    appetite: 'Appetite',
    energy: 'Energy level',
    focus: 'Focus & concentration',
    stress: 'Stress level',
    exercise: 'Physical activity',
    hydration: 'Hydration',
    socialInteraction: 'Social interaction',
    gratitude: 'Gratitude level',
  };

  const handleSave = () => {
    const selectionsArray = Object.entries(selections);
    console.log("Day: " + selectedDay);
    console.log(selectionsArray);
    console.log("Journal: " + journalEntry);
  }

  useEffect(() => {
    const week = getCurrentWeek();
    setDays(week);
    const today = week.find(day => day.fullDate === todayDate);
    if (today) setSelectedDay(today.date);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>

        <ScrollView style={styles.scrollView}>
          <View style={styles.greetingContainer}>
            <Text style={styles.greetingText}>Track Your Journey ✨</Text>
            <Text style={styles.subGreetingText}>Take a moment to reflect today</Text>
          </View>

          {/* Calendar Section */}
          <View style={styles.calendarContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {days.map((item) => (
                <TouchableOpacity 
                  key={item.date} 
                  style={[
                    styles.dayContainer,
                    selectedDay === item.date && styles.selectedDayContainer
                  ]}
                  onPress={() => setSelectedDay(item.date)}
                >
                  <Text style={styles.dayText}>{item.day}</Text>
                  <Text style={[
                    styles.dateText,
                    selectedDay === item.date && styles.selectedDateText
                  ]}>{item.date}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Questions Section */}
          <View style={styles.questionsContainer}>
            {Object.keys(categoryNames).map((category) => (
              <View key={category} style={styles.questionSection}>
                <Text style={styles.questionTitle}>{categoryNames[category]}</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.optionsContainer}>
                  {renderEmojiOptions(category)}
                </ScrollView>
              </View>
            ))}

            {/* Journal Entry */}
            <View style={styles.journalSection}>
              <Text style={styles.journalTitle}>Today's Reflection</Text>
              <Text style={styles.journalSubtitle}>Write about your thoughts, feelings, and experiences</Text>
              <View style={styles.journalInputContainer}>
                <TextInput
                  style={styles.journalInput}
                  multiline
                  placeholder="How are you feeling today? What's on your mind?"
                  value={journalEntry}
                  onChangeText={setJournalEntry}
                  textAlignVertical="top"
                />
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Save Button */}
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Log</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333'
  },
  greetingContainer: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3F414E',
  },
  subGreetingText: {
    fontSize: 16,
    color: '#A1A4B2',
    marginTop: 5,
    marginBottom: 20
  },
  scrollView: {
    flex: 1,
  },
  calendarContainer: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  dayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 70,
    marginHorizontal: 6,
    borderRadius: 15,
  },
  selectedDayContainer: {
    backgroundColor: '#e6e6ff',
  },
  dayText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  selectedDateText: {
    color: '#6366f1',
  },
  questionsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  questionSection: {
    marginBottom: 24,
  },
  questionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  optionsContainer: {
    flexDirection: 'row',
  },
  emojiContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    marginRight: 12,
    borderRadius: 15,
    backgroundColor: '#fff',
    borderBlockColor: '#333',
    borderWidth: .1
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
    // elevation: 2,
  },
  selectedEmoji: {
    borderWidth: 2,
    borderColor: '#6366f1',
    backgroundColor: '#e6e6ff',
  },
  emoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  emojiLabel: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
  },
  journalSection: {
    marginTop: 16,
    marginBottom: 24,
  },
  journalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  journalSubtitle: {
    fontSize: 14,
    color: '#777',
    marginBottom: 16,
  },
  journalInputContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 16,
    borderWidth: .1,
    borderBlockColor: "#333"
  },
  journalInput: {
    minHeight: 150,
    fontSize: 16,
    color: '#333',
  },
  saveButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#8E67FD',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default Mindful;