import { Text, TouchableOpacity, View } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux'
import { clearUser, getUserData, selectIsLogin, selectUserData, selectXenditPay, setIsLogin, setXenditPay, topUp } from "../store/slices/userSlice";
import { Modalize, useModalize } from "react-native-modalize";
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { currencyFormat } from 'simple-currency-format';

import { WebView } from 'react-native-webview';
import { useCallback, useEffect, useRef, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import LoadingScreen from "./LoadingScreen";

const ProfileScreen = ({ navigation }) => {

  const xenditPay = useSelector(selectXenditPay)

  const userData = useSelector(selectUserData)
  const isLogin = useSelector(selectIsLogin)

  const dispatch = useDispatch()

  useFocusEffect(useCallback(() => {
    if (isLogin) {
      dispatch(getUserData())
    } else {
      navigation.navigate("LOGIN_REGIS")
    }
  }, [isLogin]))

  // console.log(userData.email)

  const clearAll = async () => {
    try {
      await AsyncStorage.clear()
    } catch (e) {
      // clear error
      console.log(e, '======')
    }
    console.log('Done.')
  }

  // console.log(userData)

  const { ref, open, close } = useModalize();

  const [price, setPrice] = useState(0);


  function topUpHandler() {
    // console.log(typeof (+price.split('.').join("")))
    dispatch(topUp(+price.split('.').join("")))
    close()
    setPrice('')
  }

  function logOutHandler() {
    clearAll()
    dispatch(clearUser())
    dispatch(setIsLogin(false))
    navigation.navigate("Home")
  }

  useEffect(() => {
    if (xenditPay) {
      navigation.navigate("Xendit")
      // setTimeout(() => {
      // }, 10000)
    } else if (!xenditPay) {

    }
  }, [xenditPay])
  console.log(xenditPay, "<<<<<<<")

  return (
    <View className='flex-1'>
      {/* <WebView
        source={{ uri: 'https://expo.dev' }}
      /> */}
      <View className='h-[470] bg-red-200'>

        {/* IMAGE */}
        <View className='bg-yellow-200 mt-[100] justify-center items-center'>
          <View className='h-[150] w-[150] rounded-full border-4 border-red-400'>
            {/* ISI IMAGE DI SINI */}
          </View>
        </View>
        {/* IMAGE */}

        {/* NAME */}
        <View className='bg-blue-300 items-center mt-5'>
          <Text className='text-2xl font-semibold'>
            {userData.fullName}
          </Text>
          <Text className='mt-1'>
            {userData.email}
          </Text>
          <Text className='mt-1'>
            {userData.phoneNumber}
          </Text>
        </View>
        {/* NAME */}

        <View className='flex-row justify-center space-x-4 mt-4'>

          <View className='h-[90] w-[170] rounded-3xl items-center justify-center border border-green-700'>
            <Text className='font-semibold'>
              Kamu menyelamatkan
            </Text>
            <Text className='mt-1'>
              0 Makanan
            </Text>
          </View>

          <View className='h-[90] w-[170] rounded-3xl items-center justify-center border border-green-700'>
            <Text className='font-semibold'>
              Total penghematan
            </Text>
            <Text className='mt-1'>
              Rp. 0
            </Text>
          </View>

        </View>
      </View>

      <View className='bg-gray-300 h-2'>

      </View>

      <View className='h-[100] bg-green-300 items-center flex-row justify-between'>
        <View className='ml-4'>
          <Text className='text-3xl'>
            Savvie pay
          </Text>
          <Text className='text-2xl'>
            {currencyFormat(userData?.Balance?.balance, "id-ID", "IDR")}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => open()}
          className='h-[50] bg-red-400 w-[100] rounded-3xl items-center justify-center mr-4'>
          <Text>
            TOP UP
          </Text>

        </TouchableOpacity>
      </View>
      <TouchableOpacity className='bg-red-200 mt-10 mx-10 h-10'
        onPress={logOutHandler}
      >
        <Text>
          LogOut
        </Text>
      </TouchableOpacity>

      {/* currencyFormat(totalPrice, "id-ID", "IDR") */}


      <Modalize
        modalHeight={400}
        ref={ref}
      >
        <View className='mt-4 mx-1 h-[80]'>
          <FloatingLabelInput
            label="Top up"
            value={price}
            maskType="currency"
            currencyDivider="." // which generates: 9.999.999,99 or 0,99 ...
            keyboardType="numeric"
            onChangeText={value => setPrice(value)}
            inputStyles={{
              fontSize: 30
            }}
            customLabelStyles={{
              fontSizeBlurred: 30,
              fontSizeFocused: 15
            }}
          />
        </View>

        <TouchableOpacity
          onPress={() => topUpHandler()}
          className='bg-gray-500 h-[70] w-[300] self-center mt-3 rounded-2xl items-center justify-center'>
          <Text className='text-lg'>
            Continue Payment
          </Text>
        </TouchableOpacity>

      </Modalize>
    </View >
  )
}

export default ProfileScreen