import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import LoginRegisScreen from '../screens/LoginRegisScreen';
import TabNavigation from './TabNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { selectIsLogin, setIsLogin, setUser } from '../store/slices/userSlice';
import DetailResto from '../screens/DetailResto';
import DetailFood from '../screens/DetailFood';
import BasketScreen from '../screens/BasketScreen';
import Login from '../screens/Login';
import CategoryScreen from '../screens/CategoryScreen';
import OnBoardScreen from '../screens/OnBoardScreen';
import XenditScreen from '../screens/XenditScreen';
import StoreDashboard from '../screens/StoreDashboard';


const Stack = createNativeStackNavigator();

const Navigation = () => {
  // const dispatch = useDispatch()
  const isLogin = useSelector(selectIsLogin)
  console.log(isLogin, "login");


  // const getData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('user')
  //     console.log(value, "makan")
  //     if (value !== null) {
  //       // value previously stored
  //       const user = JSON.parse(value)
  //       console.log({ user }, "yg lg login")
  //       dispatch(setIsLogin(true))
  //       dispatch(setUser(user))

  //     }
  //   } catch (e) {
  //     console.log(e)
  //     // error reading value
  //   }
  // }

  // useEffect(() => {
  //   console.log('masuk jugaaaa');

  //   getData()
  // }, [])

  return (
    <NavigationContainer>


      <Stack.Navigator>

        {!isLogin ?
          <>
            <Stack.Screen name='OnBoardScreem' component={OnBoardScreen} options={{
              headerShown: false
            }} />
            <Stack.Screen name="LOGIN_REGIS" component={Login} options={{
              headerShown: false,
              animation: "simple_push",
              // presentation: "modal"
            }} />
          </>
          :
          null
        }
        <Stack.Screen name="MainNavigation" component={TabNavigation} options={{
          headerShown: false,
        }} />
        <Stack.Screen name="storeDashboard" component={StoreDashboard} options={{
          headerShown: false,
        }}/>
        <Stack.Screen name="Test Detail Resto" component={DetailResto} options={{
          headerShown: false,
        }} />
        <Stack.Screen name='Test Food Detail' component={DetailFood} options={{
          headerShown: false,
        }} />
        <Stack.Screen name='Test basket' component={BasketScreen} options={{
          // presentation: "fade",
          animation: "slide_from_bottom",
          headerShown: false
        }} />
        <Stack.Screen name="Category" component={CategoryScreen} options={{
          headerShown: false
        }} />
        <Stack.Screen name='Xendit' component={XenditScreen} options={{
          headerShown: false,
          presentation: "modal"
        }} />

      </Stack.Navigator>

    </NavigationContainer>
  )
}
//! global stoarge basket [], 
// {
//   type:'add_item',
//   payload: {...item, qty:1}
// }
// {
//   type: 'inc_item',
//   payload: idx
// }
// {
//   type: 'dec_item',
//   payload: item
// }

// tambahkan key qty ke object item yagn akn di simpen ke basket, 
//! {...item, qty: 1}
//! kalo add qty: cari index porduct, terus items.qty ++ 

//! kalo min qty: cari index porduct, terus items.qty -- 



export default Navigation