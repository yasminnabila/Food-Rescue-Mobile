import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import TrackScreen from "../screens/TrackScreen";
import SearchScreen from "../screens/SearchScreen";
import HistoryScreen from "../screens/HistoryScreen";
import ProfileScreen from "../screens/ProfileScreen";
import StackScreen from "./StackScreen";
import SearchStacks from "./SearchStacks";
import { selectRole, setRole } from "../store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import TrackKurirScreen from "../screens/TrackKurirScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginRegisScreen from "../screens/LoginRegisScreen";
import { useFocusEffect } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const role = useSelector(state => state.user.role);
  console.log(role, "role..... ");
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, size }) => {
          let iconName;
          let rn = route.name;
          if (rn === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (rn === "Track") {
            iconName = focused ? "map" : "map-outline";
          } else if (rn === "Track Courier") {
            iconName = focused ? "map" : "map-outline";
          } else if (rn === "Search") {
            iconName = focused ? "search" : "search-outline";
          } else if (rn === "Profile") {
            iconName = focused ? "user-circle" : "user-circle-o";
            return <FontAwesome name={iconName} size={24} color={"#77AA9C"} />
          }
          return <Ionicons name={iconName} size={size} color={"#77AA9C"} />;
        },
        tabBarActiveTintColor: "#77AA9C",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={StackScreen} />
      {
        role === "kurir" ?
          <Tab.Screen name="Track Courier" component={TrackKurirScreen} /> :
          <Tab.Screen name="Track" component={TrackScreen} />
      }
      <Tab.Screen name="Search" component={SearchStacks} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>

  )

  // return (
  //   <Tab.Navigator
  //     screenOptions={{
  //       headerShown: false,
  //     }}
  //   >
  //     <Tab.Screen
  //       name="Home"
  //       component={StackScreen}
  //       options={{
  //         headerShown: false,
  //       }}
  //     />
  //     {role === "kurir" ? (
  //       <Tab.Screen
  //         name="TrackKurir"
  //         component={TrackKurirScreen}
  //         options={{ headerShown: false }}
  //       />
  //     ) : (
  //       <Tab.Screen
  //         name="Track"
  //         component={TrackScreen}
  //         options={{ headerShown: false }}
  //       />
  //     )}
  //     <Tab.Screen
  //       name="Search"
  //       component={SearchStacks}
  //       options={{
  //         headerShown: false,
  //       }}
  //     />
  //     <Tab.Screen
  //       name="History"
  //       component={HistoryScreen}
  //       options={{ headerShown: false }}
  //     />

  //     {/* <Tab.Screen name="Profile" component={LoginRegisScreen} /> */}
  //     <Tab.Screen name="Profile" component={ProfileScreen} />
  //   </Tab.Navigator>
  // );
};

export default TabNavigation;
