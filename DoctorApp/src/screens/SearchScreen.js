import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { doctorsData } from '../data/doctorsData';
import DoctorListCard from '../components/DoctorListCard';

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (text) => {
    setSearchQuery(text);
    
    if (text.trim() === '') {
      setFilteredDoctors([]);
      setIsSearching(false);
      return;
    }
    
    setIsSearching(true);
    
    const filtered = doctorsData.filter(doctor => 
      doctor.name.toLowerCase().includes(text.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(text.toLowerCase())
    );
    
    setFilteredDoctors(filtered);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Find Doctors</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or specialization"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity 
            style={styles.clearButton} 
            onPress={() => handleSearch('')}
          >
            <Ionicons name="close-circle" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>
      
      {isSearching ? (
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
          ListEmptyComponent={
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>No doctors found matching "{searchQuery}"</Text>
            </View>
          }
        />
      ) : (
        <View style={styles.categoriesContainer}>
          <Text style={styles.sectionTitle}>Search by Category</Text>
          <View style={styles.categories}>
            <TouchableOpacity 
              style={styles.categoryItem}
              onPress={() => navigation.navigate('DoctorList')}
            >
              <View style={[styles.categoryIcon, { backgroundColor: '#E6F7FF' }]}>
                <Ionicons name="medkit" size={24} color="#4FADFF" />
              </View>
              <Text style={styles.categoryText}>General</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.categoryItem}
              onPress={() => navigation.navigate('DoctorList')}
            >
              <View style={[styles.categoryIcon, { backgroundColor: '#FFF0E6' }]}>
                <Ionicons name="heart" size={24} color="#FF8C4F" />
              </View>
              <Text style={styles.categoryText}>Cardiology</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.categoryItem}
              onPress={() => navigation.navigate('DoctorList')}
            >
              <View style={[styles.categoryIcon, { backgroundColor: '#E6FFF0' }]}>
                <Ionicons name="fitness" size={24} color="#4FFF8C" />
              </View>
              <Text style={styles.categoryText}>Dentist</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.categoryItem}
              onPress={() => navigation.navigate('DoctorList')}
            >
              <View style={[styles.categoryIcon, { backgroundColor: '#F0E6FF' }]}>
                <Ionicons name="eye" size={24} color="#8C4FFF" />
              </View>
              <Text style={styles.categoryText}>Eye</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingTop: 60,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  clearButton: {
    padding: 5,
  },
  listContainer: {
    padding: 20,
  },
  noResultsContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  noResultsText: {
    fontSize: 16,
    color: '#666',
  },
  categoriesContainer: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SearchScreen;