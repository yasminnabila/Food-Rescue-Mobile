import { Image, Text, TouchableOpacity, View } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux'
import { clearUser, getUserData, selectIsLogin, selectUser, selectUserData, selectXenditPay, setIsLogin, setXenditPay, topUp } from "../store/slices/userSlice";
import { Modalize, useModalize } from "react-native-modalize";
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { currencyFormat } from 'simple-currency-format';

import { WebView } from 'react-native-webview';
import { useCallback, useEffect, useRef, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import LoadingScreen from "./LoadingScreen";

const ProfileScreen = ({ navigation }) => {
  const role = useSelector(state => state.user.role);
  const xenditPay = useSelector(selectXenditPay)
  const { access_token } = useSelector(selectUser);

  const userData = useSelector(selectUserData)
  console.log(userData, "<><>><><><>><");

  const isLogin = useSelector(selectIsLogin)
  const [data, setData] = useState({
    totalFood: 0,
    totalMoney: 0
  })
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

  useEffect(() => {
    fetch("https://savvie2.herokuapp.com/checkout", {
      headers: {
        access_token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        let temp = []
        let total = 0
        data.forEach(el => {
          el.OrderItems.forEach(el => temp.push(el))
        })
        temp.forEach(el => {
          total += el.quantity * el.itemPrice
        })
        console.log(temp, "---------temp");
        // console.log(total, "---------total");
        setData({
          totalFood: temp.length,
          totalMoney: total,
        })
      });
  }, []);

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
      <View className='h-[470] bg-white'>

        {/* IMAGE */}
        <View className='mt-[100] justify-center items-center'>
          <View className='h-[120] w-[120] rounded-full border-2 border-gray-400'>
            <Image
              className='h-full w-full rounded-full'
              source={{ uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" }} />
          </View>
        </View>
        {/* IMAGE */}

        {/* NAME */}
        <View className='items-center mt-5'>
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
            <Text className='font-semibold text-[#77aa9c]'>
              Kamu menyelamatkan
            </Text>
            <Text className='mt-1 font-bold text-green-700'>
              {data?.totalFood} Makanan
            </Text>
          </View>

          <View className='h-[90] w-[170] rounded-3xl items-center justify-center border border-green-700'>
            <Text className='font-semibold text-[#77aa9c]'>
              Total penghematan
            </Text>
            <Text className='mt-1 font-bold text-green-700'>
              {currencyFormat(data?.totalMoney, "id-ID", "IDR")}
            </Text>
          </View>

        </View>
      </View>

      <View className='bg-gray-300 h-[0.9]'>

      </View>

      <View className='h-[80] bg-white items-center flex-row justify-between'>
        <View className='ml-4'>
          <Text className='text-lg'>
            Savvie pay
          </Text>
          <Text className='text-xl font-bold text-[#77aa9c]'>
            {currencyFormat(userData?.Balance?.balance, "id-ID", "IDR")}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => open()}
          className='h-[40] bg-[#77aa9c] w-[80] rounded-3xl items-center justify-center mr-4'>
          <Text className='text-white font-bold'>
            TOP UP
          </Text>

        </TouchableOpacity>
      </View>

      <View className='bg-gray-300 h-[0.9]'>

      </View>
      {
        role === "kurir" ? <TouchableOpacity className='bg-[#77aa9c] mt-10 mx-[100] h-10 items-center justify-center rounded-2xl' onPress={() => {
          navigation.navigate("storeDashboard")
        }}>
          <Text className='text-white font-bold'>
            Store Dashboard
          </Text>
        </TouchableOpacity> : ""

      }
      <TouchableOpacity className='bg-[#77aa9c] mt-10 mx-[100] h-10 items-center justify-center rounded-2xl'
        onPress={logOutHandler}
      >
        <Text className='text-white font-bold '>
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