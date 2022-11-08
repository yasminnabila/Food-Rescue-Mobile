import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DetailResto from '../screens/DetailResto';
import SearchScreen from '../screens/SearchScreen';
import LoginRegisScreen from '../screens/LoginRegisScreen';
import DetailFood from '../screens/DetailFood';
import BasketScreen from '../screens/BasketScreen';


const Stack = createNativeStackNavigator();

// pindahin semua screen abis itu rapihin login terus buat category terus harus selesai hari inii


const SearchStacks = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Test Search" component={SearchScreen} options={{
        headerShown: false,
      }} />
      <Stack.Screen name="Test3" component={LoginRegisScreen} options={{
        headerShown: false,
      }} />

    </Stack.Navigator>
  )
}

export default SearchStacks