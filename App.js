import 'react-native-gesture-handler';

import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import ChatScreen from './src/screens/ChatScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack"
import { Ionicons } from '@expo/vector-icons';
import Dashboard from './src/screens/bottomNavigation/Dashboard';
import Explore from './src/screens/bottomNavigation/Explore';
import Experts from './src/screens/bottomNavigation/Experts';
import DoctorListScreen from './src/screens/bottomNavigation/experts/DoctorListScreen';
import DoctorProfileScreen from './src/screens/bottomNavigation/experts/DoctorProfileScreen';
import Mindful from './src/screens/bottomNavigation/Mindful';
import Reports from './src/screens/bottomNavigation/Reports';
import Profile from './src/screens/sideDrawer/Profile';
import Settings from './src/screens/sideDrawer/Settings';
import { NavigationContainer } from '@react-navigation/native';
import MusicPlayerScreen from './src/screens/bottomNavigation/sounds/MusicPlayer';
import Toast from 'react-native-toast-message';
import VideoCallScreen from './src/utils/VideoCallScreen';
import UserProfileScreen from './src/screens/ProfileScreen';
import LoginScreen from './src/screens/Login';
import Questionnaire from './src/screens/Questionnaire';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const DrawerToggle = ({ navigation }) => (
  <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ marginLeft: 15 }}>
    <Ionicons name="menu" size={30} color="black" />
  </TouchableOpacity>
);

// ✅ Bottom Tabs with Drawer Button in Header
function BottomTabs({ navigation }) {

  // useEffect(()=> {
  //   async function setup() {
  //     setupNotificationHandlers();
  //     const token = await getPushToken();
  //     if (token) {
  //       Alert.alert('Push Token', token); // Save this in your backend
  //     }
  //   }
  //   setup();
  // }, [])

  return (
    <View style={{ flex: 1 }}>
      {/* Bottom Tabs */}
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            switch (route.name) {
              case "Dashboard":
                iconName = "home";
                break;
              case "Explore":
                iconName = "compass";
                break;
              case "Experts":
                iconName = "people";
                break;
              case "Mindful":
                iconName = "happy";
                break;
              case "Reports":
                iconName = "document-text";
                break;
              default:
                iconName = "ellipse";
                break;
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          headerLeft: () => <DrawerToggle navigation={navigation} />, // ✅ Menu Button
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}>
              <View style={styles.profileButton}>
                <Text style={styles.profileButtonText}>FS</Text>
              </View>
            </TouchableOpacity>
          ),
        })}
      >
        <Tab.Screen name="Dashboard" component={Dashboard} />
        <Tab.Screen name="Explore" component={Explore} />
        <Tab.Screen name="Experts" component={Experts} />
        <Tab.Screen name="Mindful" component={Mindful} />
        <Tab.Screen name="Reports" component={Reports} />
      </Tab.Navigator>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate("ChatScreen")}>
        <Ionicons name="chatbubble-ellipses-outline" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen 
        name="Home" 
        component={StackNavigator} 
        options={{ headerShown: false }} 
      />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  );
}

function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Initial" component={BottomTabs} options={{ headerShown: false }} />
      <Stack.Screen name="MusicPlayer" component={MusicPlayerScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Doctors List" component={DoctorListScreen} />
      <Stack.Screen name="Doctor Profile" component={DoctorProfileScreen} />
      <Stack.Screen name="liveCall" component={VideoCallScreen} options={{ title: "Live call" }}/>
      <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ title: "Chat Screen" }}/>
      <Stack.Screen name="ProfileScreen" component={UserProfileScreen} options={{ title: "Profile" }}/>
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Questionnaire" component={Questionnaire} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

// const ExpertStack = () => {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Expert" component={Experts} />
//     </Stack.Navigator>
//   );
// };

export default function App() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
      <Toast />
    </NavigationContainer>
    
    // <ChatScreen />
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 70, // Adjust based on your tab height
    right: 20,
    backgroundColor: "#4B0082", // Customize color
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5, // Shadow on Android
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  profileButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFB6C1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  profileButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3F414E',
  },
});
