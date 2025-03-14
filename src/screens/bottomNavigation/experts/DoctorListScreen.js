import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { doctorsData } from '../../../data/doctorsData';
import DoctorListCard from '../../../components/DoctorListCard';

const DoctorListScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('Medicine Specialist');
  
  // Define category filters
  const categories = [
    'Medicine Specialist',
    'Cardiologist',
    'Dentist',
    'Physician'
  ];

  // Filter doctors based on selected category
  const filteredDoctors = doctorsData.filter(
    doctor => !selectedCategory || doctor.specialization === selectedCategory
  );

  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Doctor List</Text>
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="ellipsis-vertical" size={24} color="#000" />
        </TouchableOpacity>
      </View> */}
      
      {/* Category filter buttons */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.categoryContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonSelected
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryButtonText,
                selectedCategory === category && styles.categoryButtonTextSelected
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {/* Doctor list */}
      <View style={styles.listWrapper}>
        <FlatList
          data={filteredDoctors}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <DoctorListCard 
              doctor={item} 
              onPress={() => navigation.navigate('DoctorProfile', { doctorId: item.id })}
            />
          )}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
        />
      </View>
      
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: {
    padding: 5,
  },
  moreButton: {
    padding: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  categoryContainer: {
    paddingHorizontal: 15,
    paddingBottom: 0,
    marginBottom: -50
  },
  categoryButton: {
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: '#F0F0F0',
    maxHeight: 30,
  },
  categoryButtonSelected: {
    backgroundColor: '#4FADFF',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#666',
  },
  categoryButtonTextSelected: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  listWrapper: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 0,
    marginTop: -400
  },
  listContainer: {
    paddingHorizontal: 15,
    paddingBottom: 0,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  }
});

export default DoctorListScreen;