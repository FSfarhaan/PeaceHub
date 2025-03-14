import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DoctorCard from '../components/DoctorCard';
import { doctorsData } from '../data/doctorsData';

const HomeScreen = ({ navigation }) => {
  // Filter popular doctors
  const popularDoctors = doctorsData.filter(doctor => doctor.isPopular);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello,</Text>
          <Text style={styles.userName}>Jacob Jones</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search doctor, health issue, etc."
          placeholderTextColor="#999"
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Doctors</Text>
            <TouchableOpacity 
              onPress={() => navigation.navigate('DoctorList')}
            >
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.doctorsScrollView}
          >
            {popularDoctors.map(doctor => (
              <DoctorCard 
                key={doctor.id} 
                doctor={doctor} 
                onPress={() => navigation.navigate('DoctorProfile', { doctorId: doctor.id })}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.categoriesContainer}>
            <TouchableOpacity style={styles.categoryItem}>
              <View style={[styles.categoryIcon, { backgroundColor: '#E6F7FF' }]}>
                <Ionicons name="heart" size={24} color="#4FADFF" />
              </View>
              <Text style={styles.categoryText}>Cardiology</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.categoryItem}>
              <View style={[styles.categoryIcon, { backgroundColor: '#FFF2E6' }]}>
                <Ionicons name="medkit" size={24} color="#FF8C4B" />
              </View>
              <Text style={styles.categoryText}>Medicine</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.categoryItem}>
              <View style={[styles.categoryIcon, { backgroundColor: '#E6FFF2' }]}>
                <Ionicons name="fitness" size={24} color="#4BFF8C" />
              </View>
              <Text style={styles.categoryText}>Dentist</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.categoryItem}>
              <View style={[styles.categoryIcon, { backgroundColor: '#F2E6FF' }]}>
                <Ionicons name="eye" size={24} color="#8C4BFF" />
              </View>
              <Text style={styles.categoryText}>Eye Care</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
            <TouchableOpacity 
              onPress={() => navigation.navigate('Appointments')}
            >
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.appointmentCard}>
            <View style={styles.appointmentInfo}>
              <Text style={styles.appointmentDate}>Mar 14, 2025 • 10:00 AM</Text>
              <Text style={styles.appointmentDoctor}>Dr. Sumaira Sumi</Text>
              <Text style={styles.appointmentSpecialty}>Medicine Specialist</Text>
            </View>
            <View style={styles.appointmentActions}>
              <TouchableOpacity style={[styles.appointmentButton, styles.rescheduleButton]}>
                <Text style={styles.rescheduleText}>Reschedule</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.appointmentButton, styles.cancelButton]}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  greeting: {
    fontSize: 14,
    color: '#666',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20,
    paddingHorizontal: 15,
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllText: {
    fontSize: 14,
    color: '#4FADFF',
  },
  doctorsScrollView: {
    paddingLeft: 20,
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  categoryItem: {
    alignItems: 'center',
    width: '22%',
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  appointmentCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  appointmentInfo: {
    marginBottom: 15,
  },
  appointmentDate: {
    fontSize: 14,
    color: '#4FADFF',
    marginBottom: 5,
  },
  appointmentDoctor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  appointmentSpecialty: {
    fontSize: 14,
    color: '#666',
  },
  appointmentActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  appointmentButton: {
    width: '48%',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  rescheduleButton: {
    backgroundColor: '#E6F7FF',
  },
  rescheduleText: {
    color: '#4FADFF',
    fontWeight: '500',
  },
  cancelButton: {
    backgroundColor: '#FFF2F2',
  },
  cancelText: {
    color: '#FF4B4B',
    fontWeight: '500',
  },
});

export default HomeScreen;