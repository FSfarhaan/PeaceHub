import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import ChatScreen from './src/screens/ChatScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack"
import { Ionicons } from '@expo/vector-icons';
import Dashboard from './src/screens/bottomNavigation/Dashboard';
import Explore from './src/screens/bottomNavigation/Explore';
import Experts from './src/screens/bottomNavigation/Experts';
import Mindful from './src/screens/bottomNavigation/Mindful';
import Reports from './src/screens/bottomNavigation/Reports';
import Profile from './src/screens/sideDrawer/Profile';
import Settings from './src/screens/sideDrawer/Settings';
import { NavigationContainer } from '@react-navigation/native';
import MusicPlayerScreen from './src/screens/bottomNavigation/sounds/MusicPlayer';

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
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Dashboard':
              iconName = 'home';
              break;
            case 'Explore':
              iconName = 'compass';
              break;
            case 'Experts':
              iconName = 'people';
              break;
            case 'Mindful':
              iconName = 'happy';
              break;
            case 'Reports':
              iconName = 'document-text';
              break;
            default:
              iconName = 'ellipse';
              break;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerLeft: () => <DrawerToggle navigation={navigation} />, // ✅ Add Menu Button
        headerRight: () => <TouchableOpacity>
                    <View style={styles.profileButton}>
                      <Text style={styles.profileButtonText}>FS</Text>
                    </View>
                  </TouchableOpacity>
      })}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Explore" component={Explore} />
      <Tab.Screen name="Experts" component={Experts} />
      <Tab.Screen name="Mindful" component={Mindful} />
      <Tab.Screen name="Reports" component={Reports} />
    </Tab.Navigator>
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
      <Stack.Screen name="Home" component={BottomTabs} options={{ headerShown: false }} />
      <Stack.Screen name="MusicPlayer" component={MusicPlayerScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
    // <ChatScreen />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  profileButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EBEAEC',
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
