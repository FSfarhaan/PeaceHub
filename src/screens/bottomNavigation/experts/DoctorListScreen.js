import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { doctorsData } from '../../../data/doctorsData';
import DoctorListCard from '../../../components/DoctorListCard';



const DoctorListScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Define category filters
  const categories = [
    'All',
    'Psychologist',
    'Psychiatrist',
    'Therapist'
  ];

  // Filter doctors based on selected category
  const filteredDoctors = selectedCategory === 'All' ? doctorsData : doctorsData.filter(
    doctor => !selectedCategory || doctor.designation === selectedCategory
  );

  const renderDoctorCard = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Doctor Profile', { doctorId: item.id })} style={styles.doctorCard}>
      <Image source={item.image} style={styles.doctorImage} />
      <Text style={styles.doctorName}>{item.name}</Text>
      <Text style={styles.doctorInstitution}>{item.specialization}</Text>
      <Text style={styles.doctorDesignation}>{item.designation}</Text>
    </TouchableOpacity>
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
          <Text style={styles.greetingText}>Meet Our Experts 🧑‍⚕️</Text>
          <Text style={styles.subGreetingText}>Find the right specialist for you</Text>
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
        <View style={styles.doctorsGrid}>
          {filteredDoctors.map((item) => (
            <View key={item.id} style={styles.doctorCardContainer}>
              {renderDoctorCard({ item })}
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
  doctorsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  doctorCardContainer: {
    width: '48%',
    marginBottom: 15,
  },
  doctorCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    // alignItems: 'center',
    borderWidth: .1,
    borderColor: "#333"
  },
  doctorImage: {
    width: "100%",
    height: 150,
    borderRadius: 5,
    marginBottom: 10,
  },
  doctorName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  doctorDesignation: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  doctorInstitution: {
    fontSize: 11,
    color: '#888',
  },
});

export default DoctorListScreen;