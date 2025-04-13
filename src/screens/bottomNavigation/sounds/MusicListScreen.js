import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { soundList } from '../../../data/MusicData';

const MusicListScreen = ({ navigation }) => {
    // console.log(soundList);

  const [selectedCategory, setSelectedCategory] = useState('For you');
  
  // Define category filters
  const categories = [
    'For you',
    'Nature',
    'Motivational',
    'Sleep'
  ];

  // Filter doctors based on selected category
  const filteredSounds = selectedCategory === 'For you' ? soundList : soundList.filter(
    sound => !selectedCategory || sound.type === selectedCategory
  );

  const renderNatureSoundItem = (item) => (
      <View key={item.id} style={styles.soundCard}>
        <View style={styles.soundCardLeft}>
          <Image source={item.image} style={styles.soundImage} />
          <View style={styles.soundTextContainer}>
            <Text style={styles.soundTitle}>{item.title}</Text>
            <Text style={styles.soundSubtitle} numberOfLines={2}>{item.subtitle}</Text>
            <View style={styles.soundMetaContainer}>
              <Ionicons name="heart-outline" size={14} color="#6C63FF" />
              <Text style={styles.soundMetaText}>{item.reactions} reactions</Text>
              <Ionicons name="chatbox-outline" size={14} color="#6C63FF" style={{ marginLeft: 8 }} />
              <Text style={styles.soundMetaText}>{item.responses} responses</Text>
            </View>
          </View>
        </View>
        
        <TouchableOpacity onPress={() => navigation.navigate('MusicPlayer', { musicId: item.id })} style={styles.playButton}>
          <Ionicons name="play" size={24} color="#6C63FF" />
        </TouchableOpacity>
      </View>
    );
  
  const renderCategoryButton = (category) => {
    const isSelected = category === selectedCategory;
    return (
      <TouchableOpacity
        key={category}
        style={[
          styles.categoryButton,
          isSelected && { backgroundColor: '#8E67FD' }
        ]}
        onPress={() => setSelectedCategory(category)}
      >
        <Text style={[
          styles.categoryText,
          isSelected && { color: 'white' }
        ]}>
          {category}
        </Text>
      </TouchableOpacity>
    );
  };

  

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>Find Calming Sounds 🧑‍⚕️</Text>
          <Text style={styles.subGreetingText}>Find the right sound for you</Text>
        </View>

        {/* Category Filter */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map(category => renderCategoryButton(category))}
        </ScrollView>

        {/* Doctors Grid */}
        <View style={styles.soundsContainer}>
          {filteredSounds.map((item) => (
            <View key={item.id}>
              {renderNatureSoundItem(item)}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    paddingHorizontal: 10,
  },
  greetingContainer: {
    marginTop: 25,
    paddingHorizontal: 10,
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
    marginBottom: 10
  },
  categoriesContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 6,
    marginBottom: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  soundsContainer: {
    paddingHorizontal: 10,
  },
  soundCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderWidth: .1,
    borderColor: "#333"
  },
  soundCardLeft: {
    flexDirection: 'row',
    flex: 1,
  },
  soundImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
  },
  soundTextContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  soundTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  soundSubtitle: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  soundMetaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  soundMetaText: {
    fontSize: 12,
    color: '#999',
    marginLeft: 4,
  },
  playButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#F0EEFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  }
});

export default MusicListScreen;