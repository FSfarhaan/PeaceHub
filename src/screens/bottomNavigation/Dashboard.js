import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';

const Dashboard = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/* Greeting */}
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>Good Morning, Farhaan</Text>
          <Text style={styles.subGreetingText}>We wish you have a good day</Text>
        </View>

        {/* Main Cards Section */}
        <View style={styles.cardsContainer}>
          {/* First Card - Basics */}
          <TouchableOpacity style={[styles.cardLarge, {backgroundColor: '#8E97FD'}]}>
            <Image 
              source={require('../../../assets/icon.png')} 
              style={styles.cardImage} 
              resizeMode="contain"
            />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Basics</Text>
              <Text style={styles.cardSubtitle}>COURSE</Text>
              <View style={styles.cardButtonContainer}>
                <TouchableOpacity style={styles.cardButton}>
                  <Text style={styles.cardButtonText}>START</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>

          {/* Second Card - Relaxation */}
          <TouchableOpacity style={[styles.cardLarge, {backgroundColor: '#FFC97E'}]}>
            <Image 
              source={require('../../../assets/icon.png')} 
              style={styles.cardImage} 
              resizeMode="contain"
            />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Relaxation</Text>
              <Text style={styles.cardSubtitle}>MUSIC</Text>
              <View style={styles.cardButtonContainer}>
                <TouchableOpacity style={styles.cardButton}>
                  <Text style={styles.cardButtonText}>START</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Daily Thought Section */}
        <TouchableOpacity style={styles.dailyThoughtContainer}>
          <View style={styles.dailyThoughtContent}>
            <Text style={styles.dailyThoughtTitle}>Daily Thought</Text>
            <Text style={styles.dailyThoughtSubtitle}>MEDITATION • 3-10 MIN</Text>
          </View>
          <View style={styles.playButtonContainer}>
            <TouchableOpacity style={styles.playButton}>
              <Text style={styles.playButtonIcon}>▶</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        {/* Recommended Section */}
        <View style={styles.recommendedSection}>
          <Text style={styles.sectionTitle}>Recommended for you</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recommendedScroll}>
            {/* Focus Card */}
            <TouchableOpacity style={styles.recommendedCard}>
              <Image 
                source={require('../../../assets/icon.png')} 
                style={styles.recommendedCardImage} 
                resizeMode="cover"
              />
              <Text style={styles.recommendedCardTitle}>Focus</Text>
              <View style={styles.recommendedCardIcon}>
                <Text style={styles.recommendedCardIconText}>🧠</Text>
              </View>
            </TouchableOpacity>

            {/* Happiness Card */}
            <TouchableOpacity style={styles.recommendedCard}>
              <Image 
                source={require('../../../assets/icon.png')} 
                style={styles.recommendedCardImage} 
                resizeMode="cover"
              />
              <Text style={styles.recommendedCardTitle}>Happiness</Text>
              <View style={styles.recommendedCardIcon}>
                <Text style={styles.recommendedCardIconText}>😊</Text>
              </View>
            </TouchableOpacity>

            {/* Partial Third Card */}
            <TouchableOpacity style={styles.recommendedCard}>
              <Image 
                source={require('../../../assets/icon.png')} 
                style={styles.recommendedCardImage} 
                resizeMode="cover"
              />
              <Text style={styles.recommendedCardTitle}>For You</Text>
              <View style={styles.recommendedCardIcon}>
                <Text style={styles.recommendedCardIconText}>🌈</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Space for bottom navigation (not included as requested) */}
        <View style={styles.bottomSpace} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  logoText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3F414E',
  },
  greetingContainer: {
    marginTop: 30,
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
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  cardLarge: {
    width: '48%',
    height: 210,
    borderRadius: 10,
    padding: 15,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  cardImage: {
    position: 'absolute',
    right: -10,
    bottom: 20,
    width: 90,
    height: 140,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 10,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  cardButtonContainer: {
    marginBottom: 10,
  },
  cardButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  cardButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 12,
  },
  dailyThoughtContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 20,
    padding: 15,
    backgroundColor: '#333242',
    borderRadius: 10,
    height: 95,
  },
  dailyThoughtContent: {
    flex: 1,
  },
  dailyThoughtTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  dailyThoughtSubtitle: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.8,
    marginTop: 5,
  },
  playButtonContainer: {
    marginLeft: 10,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonIcon: {
    fontSize: 18,
    color: '#3F414E',
    marginLeft: 3,
  },
  recommendedSection: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3F414E',
    marginBottom: 15,
  },
  recommendedScroll: {
    flexDirection: 'row',
  },
  recommendedCard: {
    width: 160,
    height: 180,
    marginRight: 20,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  recommendedCardImage: {
    width: '100%',
    height: '100%',
  },
  recommendedCardTitle: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  recommendedCardIcon: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recommendedCardIconText: {
    fontSize: 18,
  },
  bottomSpace: {
    height: 80,
  }
});

export default Dashboard;