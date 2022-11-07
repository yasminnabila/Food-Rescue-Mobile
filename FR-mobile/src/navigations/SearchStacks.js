import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DetailResto from '../screens/DetailResto';
import SearchScreen from '../screens/SearchScreen';
import LoginRegisScreen from '../screens/LoginRegisScreen';
import DetailFood from '../screens/DetailFood';
import BasketScreen from '../screens/BasketScreen';


const Stack = createNativeStackNavigator();

const SearchStacks = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Test Search" component={SearchScreen} options={{
        headerShown: false,
      }} />
      <Stack.Screen name="Test Detail Resto" component={DetailResto} options={{
        headerShown: false,
      }} />
      <Stack.Screen name='Test Food Detail' component={DetailFood} options={{
        headerShown: false,
      }} />
      <Stack.Screen name='Test basket' component={BasketScreen} options={{
        // presentation: "fade",
        animation: "slide_from_bottom"
      }} />
      <Stack.Screen name="Test3" component={LoginRegisScreen} options={{
        headerShown: false,
      }} />

    </Stack.Navigator>
  )
}

export default SearchStacks