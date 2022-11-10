import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Button, Alert } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Modalize, useModalize } from 'react-native-modalize';

import { FloatingLabelInput } from 'react-native-floating-label-input';
import { useNavigation } from '@react-navigation/native';
import { getData, storeData } from '../asyncStorage';
import { useDispatch } from 'react-redux';
import { login, register } from '../store/slices/userSlice';

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
    dispatch(login({ email: "rescuefood@gmail.com", password: "1234" }))
    setLoginForm({
      email: "",
      password: ""
    })
  }

  return (
    <GestureHandlerRootView className='flex-1'>
      <View className='h-[300] bg-red-300'></View>

      <View className='self-center'>
        <Text>
          LOGIN
        </Text>
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
            value={loginForm.password}
            autoCapitalize={false}
            onChangeText={value => setLoginForm({ ...loginForm, password: value })}
          />
        </View>
        <TouchableOpacity
          onPress={() => loginHandler()}
          className='h-[50] bg-yellow-500 my-3 rounded-2xl w-[200] self-center items-center justify-center'>
          <Text className='text-lg'>
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
        className='bg-yellow-500 rounded-2xl absolute bottom-10 w-[300] items-center justify-center self-center'>
        <Text className='text-lg'>
          Dont have an Account? Sign Up
        </Text>
      </TouchableOpacity>


      {/* MODAL REGISTER */}
      <Modalize
        modalHeight={700}
        ref={ref}
      >
        <View className='self-center mt-[70]'>
          <Text>
            Register
          </Text>

          <View className='h-[60] w-[300] my-2'>
            <FloatingLabelInput
              label={'FullName'}
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
              label={'PhoneNumber'}
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


      </Modalize>
      {/* MODAL REGISTER */}

    </GestureHandlerRootView>
  )
}

export default LoginRegis