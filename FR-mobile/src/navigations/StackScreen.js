import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CategoryScreen from "../screens/CategoryScreen";
import LoginRegisScreen from "../screens/LoginRegisScreen";

import HomeScreen from "../screens/HomeScreen";
import LocationSrceen from "../screens/LocationSrceen";
import AddressScreen from "../screens/AddressScreen";

const Stack = createNativeStackNavigator();

const StackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Test1"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Test2"
        component={CategoryScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Test3"
        component={LoginRegisScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LocationSrceen"
        component={LocationSrceen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddressScreen"
        component={AddressScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackScreen;
