import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const PatientListScreen = () => {  
    const navigation = useNavigation();

  // Sample data for the patient list
  const patients = [
    {
      id: '1',
      name: 'Farhaan Shaikh',
      description: 'Anxiety disorder, weekly sessions since January'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      description: 'Depression, bi-weekly sessions, good progress'
    },
    {
      id: '3',
      name: 'Michael Chen',
      description: 'PTSD treatment, requires careful approach'
    },
    {
      id: '4',
      name: 'Emma Rodriguez',
      description: 'Stress management, work-related issues'
    },
    {
      id: '5',
      name: 'David Kim',
      description: 'Marriage counseling, joint sessions with spouse'
    },
    {
      id: '6',
      name: 'Priya Patel',
      description: 'Grief counseling, recent loss of parent'
    },
    {
      id: '7',
      name: 'James Wilson',
      description: 'Substance recovery support, 3 months sober'
    }
  ];

  // Function to handle patient selection
  const handlePatientSelect = (patient) => {
    navigation.navigate("ProgressScreen");
  };

  // Render each patient item
  const renderPatientItem = ({ item }) => (
    <TouchableOpacity
      style={styles.patientItem}
      onPress={() => handlePatientSelect(item)}
      activeOpacity={0.7}
    >
      <View style={styles.patientInfo}>
        <Text style={styles.patientName}>{item.name}</Text>
        <Text style={styles.patientDescription}>{item.description}</Text>
      </View>
      <MaterialIcons name="arrow-forward-ios" size={20} color="#666" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <FlatList
        data={patients}
        renderItem={renderPatientItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  listContainer: {
    padding: 16,
  },
  patientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  patientInfo: {
    flex: 1,
    marginRight: 10,
  },
  patientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  patientDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default PatientListScreen;