import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Button, Alert } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Modalize, useModalize } from 'react-native-modalize';

import { FloatingLabelInput } from 'react-native-floating-label-input';
import { useNavigation } from '@react-navigation/native';
import { getData, storeData } from '../asyncStorage';
import { useDispatch } from 'react-redux';
import { login, register, setIsLogin, setUser } from '../store/slices/userSlice';

import { useForm, Controller } from "react-hook-form";


const LoginRegis = () => {

  const navigation = useNavigation()

  const dispatch = useDispatch()

  const { ref, open, close } = useModalize();

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  })

  const [registerForm, setRegisterForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  })

  function registerHandler() {
    console.log(registerForm)
    dispatch(register(registerForm))
    setRegisterForm({
      fullName: "",
      email: "",
      password: "",
      phoneNumber: "",
      address: "",
    })
    close()
  }

  function loginHandler() {
    // console.log(loginForm)
    dispatch(login(loginForm)).then((res) => res.json())
      .then((data) => {
        storeData(data)
        return data

      }).then((data) => {
        console.log(data, "dataaaaa");
        dispatch(setIsLogin(true))
        dispatch(setUser(data))
        navigation.navigate("Test1")
      })
    setLoginForm({
      email: "",
      password: ""
    })
  }

  return (
    <GestureHandlerRootView className='flex-1 bg-[#77aa9c]'>
      <View className='items-center justify-center'>
        <View className='w-[350] h-[250] mt-[140] rounded-322xl'>
          <Image
            source={{
              uri: "https://media.discordapp.net/attachments/1035762335383552128/1039814550167498802/shutterstock_1729013995_Converted-01_copy.png?width=1648&height=1139"
            }}
            className='h-full w-full'
          />

        </View>

        <Text className='text-3xl font-semibold mt-5 text-white'>
          Let's start Savvie'ing
        </Text>


      </View>

      <View className='self-center mt-[45]'>
        <View className='h-[60] w-[300] my-2'>
          <FloatingLabelInput
            label={'Email'}
            value={loginForm.email}
            autoCapitalize={false}
            onChangeText={value => setLoginForm({ ...loginForm, email: value })}
          />
        </View>
        <View className='h-[60] w-[300] my-2'>
          <FloatingLabelInput
            label={'Password'}
            isPassword
            value={loginForm.password}
            autoCapitalize={false}
            onChangeText={value => setLoginForm({ ...loginForm, password: value })}
          />
        </View>
        <TouchableOpacity
          onPress={() => loginHandler()}
          className='h-[50] bg-yellow-500 my-3 rounded-2xl w-[200] self-center items-center justify-center'>
          <Text className='text-lg text-white font-semibold'>
            LOGIN
          </Text>
        </TouchableOpacity>

      </View>

      {/* <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        className='h-[50] bg-yellow-500 my-3 rounded-2xl w-[200] self-center items-center justify-center'>
        <Text className='text-lg'>
          next
        </Text>
      </TouchableOpacity> */}


      <TouchableOpacity
        onPress={() => open()}
        className='rounded-2xl absolute bottom-10 w-[300] items-center justify-center self-center'>
        <Text className='text-base text-white'>
          Dont have an Account? Sign Up
        </Text>
      </TouchableOpacity>


      {/* MODAL REGISTER */}
      <Modalize
        modalHeight={700}
        ref={ref}
      >
        <View className='self-center mt-[70]'>
          <Text className='text-lg text-center font-bold'>
            Start eating affordably
          </Text>


          <View className='mt-[30]'>
            <View className='h-[60] w-[300] my-2'>
              <FloatingLabelInput
                label={'Full name'}
                value={registerForm.fullName}
                autoCapitalize={false}
                onChangeText={value => setRegisterForm({ ...registerForm, fullName: value })}
              />
            </View>

            <View className='h-[60] w-[300] my-2'>
              <FloatingLabelInput
                label={'Email'}
                value={registerForm.email}
                autoCapitalize={false}
                onChangeText={value => setRegisterForm({ ...registerForm, email: value })}
              />
            </View>

            <View className='h-[60] w-[300] my-2'>
              <FloatingLabelInput
                label={'Password'}
                value={registerForm.password}
                isPassword
                autoCapitalize={false}
                onChangeText={value => setRegisterForm({ ...registerForm, password: value })}
              />
            </View>

            <View className='h-[60] w-[300] my-2'>
              <FloatingLabelInput
                label={'Address'}
                value={registerForm.address}
                autoCapitalize={false}
                onChangeText={value => setRegisterForm({ ...registerForm, address: value })}
              />
            </View>

            <View className='h-[60] w-[300] my-2'>
              <FloatingLabelInput
                label={'Phone number'}
                value={registerForm.phoneNumber}
                autoCapitalize={false}
                onChangeText={value => setRegisterForm({ ...registerForm, phoneNumber: value })}
              />
            </View>

            <TouchableOpacity
              onPress={() => registerHandler()}
              className='h-[50] bg-yellow-500 my-3 rounded-2xl w-[200] self-center items-center justify-center'>
              <Text className='text-lg'>
                REGISTER
              </Text>
            </TouchableOpacity>
          </View>
        </View>


      </Modalize>
      {/* MODAL REGISTER */}

    </GestureHandlerRootView>
  )
}

export default LoginRegis