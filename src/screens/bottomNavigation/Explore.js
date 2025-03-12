import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  Image,
  TextInput,
  StatusBar,
  Button,
  Linking
} from 'react-native';
import { Feather, Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Explore = () => {

    const navigation = useNavigation();
  // Mock data for categories
  const categories = [
    {
      id: 1,
      title: 'Family Stress',
      members: '12,098K Members',
      image: require('../../../assets/family.jpg')
    },
    {
      id: 2,
      title: 'Self-Love Hub',
      members: '10,394K Members',
      image: require('../../../assets/selflove.jpg')
    },
    {
      id: 3,
      title: 'Relationships',
      members: '8,754K Members',
      image: require('../../../assets/relationship.jpg')
    },
    {
      id: 4,
      title: 'Career Guidance',
      members: '9,127K Members',
      image: require('../../../assets/career.jpg')
    }
  ];

  // Mock data for articles
  const articles = [
    {
      id: 1,
      title: 'This Is What Happens to the Brain & Body When You are Heartbroken',
      content: 'I was 16 the first time I had my heart broken. After he ended things, my heart felt like it went through a meat grinder...',
      videos: 36,
      duration: '8 Hours 19 Minutes',
      lesson: 4,
      progress: 65,
      image: require('../../../assets/article1.webp'),
      link: "https://www.verywellmind.com/what-happens-to-your-brain-during-heartbreak-8740210"
    },
    {
      id: 2,
      title: 'How to Get Over a Breakup, According to Experts',
      content: 'The circumstances around every breakup are unique. Sometimes the passion fizzles out, or you decided to leave for a chance at a healthier partner or relationship...',
      videos: 28,
      duration: '6 Hours 45 Minutes',
      lesson: 3,
      progress: 45,
      image: require('../../../assets/article2.webp'),
      link: "https://www.popsugar.com/love/get-over-breakup-30884425"
    },
    {
      id: 3,
      title: 'Can Stress Make You Physically Sick?',
      content: 'Short-term (acute) stress is a normal part of life and can help you prepare for a challenge and respond to a dangerous situation...',
      videos: 42,
      duration: '9 Hours 30 Minutes',
      lesson: 6,
      progress: 20,
      image: require('../../../assets/article3.webp'),
      link: "https://www.verywellhealth.com/can-stress-make-you-sick-8788556"
    },
    {
      id: 4,
      title: 'Social media is too toxic and addictive, say Gen Z',
      content: 'The young people who grew up with smartphones say it damages mental health — and that they would keep their own children offline as long as possible...',
      videos: 42,
      duration: '9 Hours 30 Minutes',
      lesson: 6,
      progress: 20,
      image: require('../../../assets/article4.jpg'),
      link: "https://www.thetimes.com/life-style/parenting/article/gen-z-social-media-harms-mental-health-mxq06n7xq"
    }
  ];

  // Mock data for nature sounds
  const natureSounds = [
    {
      id: 1,
      title: 'Forest Rain Ambient',
      subtitle: 'Relaxing rain sounds for deep focus',
      reactions: 126,
      responses: 24,
      image: require('../../../assets/rain.jpeg')
    },
    {
      id: 2,
      title: 'Morning Birdsong',
      subtitle: 'Soothing chirping sounds to start your day peacefully',
      reactions: 98,
      responses: 15,
      image: require('../../../assets/birds.jpeg')
    }
  ];

  const renderCategoryItem = (item) => (
    <TouchableOpacity key={item.id} style={styles.categoryCard}>
      <Image source={item.image} style={styles.categoryImage} />
      <Text style={styles.categoryTitle}>{item.title}</Text>
      <Text style={styles.categoryMembers}>{item.members}</Text>
    </TouchableOpacity>
  );

  const renderArticleItem = (item) => (
    <TouchableOpacity key={item.id} style={styles.articleCard}>
      <View style={styles.articleImageContainer}>
        <Image source={item.image} style={styles.articleImage} />
      </View>
      
      <View style={styles.articleContent}>
        <Text style={styles.articleTitle} numberOfLines={2}>{item.title}</Text>
        <View style={styles.articleMetaContainer}>
          <Text style={styles.articleMeta} numberOfLines={3}>{item.content}</Text>
        </View>

        <TouchableOpacity onPress={() => openWebsite(item.link)} style={styles.cardButton}>
            <Text style={styles.cardButtonText}>Read More</Text>
        </TouchableOpacity>
        
      </View>
    </TouchableOpacity>
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
      
      <TouchableOpacity onPress={() => navigation.navigate('MusicPlayer', { musicId: '1' })} style={styles.playButton}>
        <Ionicons name="play" size={24} color="#6C63FF" />
      </TouchableOpacity>
    </View>
  );

  const openWebsite = (url) => {
    Linking.openURL(url).catch((err) => console.error('Error opening link:', err));
  };

  return (
    <SafeAreaView style={styles.container}>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={{ padding: 20 }}>
            <Text style={styles.greetingText}>Find Your Tribe</Text>
            <Text style={styles.subGreetingText}>Connect, share, and grow together</Text>
        </View>
        {/* Categories */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.categoriesScrollView}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map(renderCategoryItem)}
        </ScrollView>
        
        {/* Articles Section */}
        <View style={{ padding: 20, paddingTop: 10}}>
            <Text style={styles.greetingText}>Explore & Learn</Text>
            <Text style={styles.subGreetingText}>Read articles that inspire growth</Text>
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.articlesScrollView}
          contentContainerStyle={styles.articlesContainer}
        >
          {articles.map(renderArticleItem)}
        </ScrollView>
        
        {/* Nature Sounds Section */}

        <View style={[styles.sectionHeader, {marginTop: 10}]}>
            <View>
                <Text style={styles.greetingText}>Find Your Calm</Text>
                <Text style={styles.subGreetingText}>Let nature soothe your mind</Text>
            </View>
            <TouchableOpacity>
                <Text style={styles.showAllText}>Show all</Text>
            </TouchableOpacity>
        </View>
        
        <View style={styles.soundsContainer}>
          {natureSounds.map(renderNatureSoundItem)}
        </View>
        
        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
  },
  greeting: {
    fontSize: 14,
    color: '#666',
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 25,
    marginHorizontal: 20,
    paddingHorizontal: 15,
    height: 45,
    marginBottom: 20,
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
    height: '100%',
    fontSize: 15,
    color: '#333',
  },
  scrollView: {
    flex: 1,
    paddingTop: 10
  },
  categoriesScrollView: {
    marginBottom: 20,
  },
  categoriesContainer: {
    paddingLeft: 20,
    paddingRight: 10,
  },
  categoryCard: {
    width: 200,
    height: 250,
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    marginRight: 10,
    justifyContent: 'space-between',
  },
  categoryImage: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  categoryMembers: {
    fontSize: 12,
    color: '#999',
    marginBottom: 10
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  showAllText: {
    fontSize: 14,
    color: '#6C63FF',
    fontWeight: '500',
  },
  articlesScrollView: {
    marginBottom: 20,
  },
  articlesContainer: {
    paddingLeft: 20,
    paddingRight: 10,
  },
  articleCard: {
    width: 280,
    backgroundColor: '#FFF',
    borderRadius: 15,
    overflow: 'hidden',
    marginRight: 15,
    borderWidth: .3,
    borderColor: "#333"
  },
  articleImageContainer: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
  },
  articleImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  articleContent: {
    padding: 15,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  articleMetaContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  articleMeta: {
    fontSize: 12,
    color: '#999',
    marginRight: 5,
  },
  cardButton: {
    backgroundColor: 'rgba(70, 200, 255, 0.5)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  cardButtonText: {
    color: '#333',
    fontWeight: '600',
    fontSize: 12,
  },
  soundsContainer: {
    paddingHorizontal: 20,
  },
  soundCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
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
  },
  bottomSpacing: {
    height: 40,
  },
});

export default Explore;