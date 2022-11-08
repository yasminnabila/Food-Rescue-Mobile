import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Modalize, useModalize } from 'react-native-modalize';

import { FloatingLabelInput } from 'react-native-floating-label-input';
import { useNavigation } from '@react-navigation/native';
import { getData, storeData } from '../asyncStorage';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/userSlice';

const LoginRegis = () => {

  const navigation = useNavigation()

  const dispatch = useDispatch()
  const modalizeRef = useRef(null);
  const { ref, open, close } = useModalize();

  const [test, setTest] = useState([])

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  })

  function loginHandler() {
    console.log(loginForm)
    dispatch(login(loginForm))
    setLoginForm({
      email: "",
      password: ""
    })
  }

  return (
    <GestureHandlerRootView className='flex-1 justify-center items bg-center'>

      <View className='h-[60] mx-5'>
        <FloatingLabelInput
          label={'Email'}
          value={loginForm.email}
          autoCapitalize={false}
          onChangeText={value => setLoginForm({ ...loginForm, email: value })}
        />
      </View>
      <View className='h-[60] mx-5 mt-2'>
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

      <TouchableOpacity
        onPress={() => navigation.navigate("MainNavigation")}
        className='h-[100] bg-red-200'>
        <Text>
          screen 1
        </Text>
      </TouchableOpacity>


      {/* MODAL REGISTER */}
      <Modalize
        modalHeight={490}
        ref={ref}
      >
        {/* ICON / PNG */}
        <View className='bg-red-300 h-[220] w-[340] rounded-3xl mt-10 self-center'>

        </View>
        {/* ICON / PNG */}
        <View className='self-center mt-2'>
          <Text className='text-2xl text-center font-bold tracking-normal w-[300]'>
            Want to order from this resto instead?
          </Text>
        </View>
        <View className='self-center mt-2'>
          <Text className='text-base text-center font-normal tracking-normal mx-6'>
            Sure thing, but we'll need to clear the items in your current cart from the previous resto first.
          </Text>
        </View>
        <View className='flex-row space-x-5 items-center justify-center mt-5'>
          <TouchableOpacity className='border-2 border-green-300 h-[55] w-[170] rounded-3xl items-center justify-center'>
            <Text className='text-lg font-semibold'>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className='bg-yellow-300 h-[55] w-[170] rounded-3xl items-center justify-center'>
            <Text className='text-lg font-semibold'>
              Yes, go ahead
            </Text>
          </TouchableOpacity>
        </View>
      </Modalize>
      {/* MODAL REGISTER */}

    </GestureHandlerRootView>
  )
}

export default LoginRegis