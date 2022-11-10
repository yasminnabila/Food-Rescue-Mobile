import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TrackScreen from "../screens/TrackScreen";
import HistoryScreen from "../screens/HistoryScreen";
import ProfileScreen from "../screens/ProfileScreen";
import StackScreen from "./StackScreen";
import SearchStacks from "./SearchStacks";
import { selectRole } from "../store/slices/userSlice";
import { useSelector } from "react-redux";
import TrackKurirScreen from "../screens/TrackKurirScreen";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const role = useSelector(selectRole);
  // const dispatch = useDispatch();
  // console.log(role, "Role>>>>>>>");

  // // AsyncStorage.getItem('@storage_Key').then(data => {
  // //   console.log(data)
  // // })
  // const getData = async () => {
  //   // await AsyncStorage.setItem("role", "customer");
  //   try {
  //     const value = await AsyncStorage.getItem("role");
  //     if (value !== null) {
  //       // value previously stored
  //       dispatch(setRole(value));
  //     }
  //   } catch (e) {
  //     console.log(e);
  //     // error reading value
  //   }
  // };

  // useEffect(() => {
  //   getData();
  // }, []);
  // const role = useSelector(state => state.user.role);
  // console.log(role, "role..... ");

  // const dispatch = useDispatch();
  // console.log(role, "Role>>>>>>>");

  // // AsyncStorage.getItem('@storage_Key').then(data => {
  // //   console.log(data)
  // // })
  // const getData = async () => {
  //   // await AsyncStorage.setItem("role", "customer");
  //   try {
  //     const value = await AsyncStorage.getItem("user");
  //     console.log(value, "MMMMMMMMMMMMMM");
  //     if (value.role !== null) {
  //       // value previously stored
  //       dispatch(setRole(value.role));
  //     }
  //   } catch (e) {
  //     console.log(e);
  //     // error reading value
  //   }
  // };

  // useFocusEffect(
  //   useCallback(() => {
  //     console.log("masuk bangggg");
  //     getData()
  //   }, [])
  // );
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={StackScreen}
        options={{
          headerShown: false,
        }}
      />
      {role === "kurir" ? (
        <Tab.Screen
          name="TrackKurir"
          component={TrackKurirScreen}
          options={{ headerShown: false }}
        />
      ) : (
        <Tab.Screen
          name="Track"
          component={TrackScreen}
          options={{ headerShown: false }}
        />
      )}
      <Tab.Screen
        name="Search"
        component={SearchStacks}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{ headerShown: false }}
      />

      {/* <Tab.Screen name="Profile" component={LoginRegisScreen} /> */}
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
