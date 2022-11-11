import { Text, View, Dimensions, TextInput, Pressable, ScrollView, TouchableOpacity } from "react-native"
import Svg, { Image, Ellipse, ClipPath } from "react-native-svg"
import Animated, { useSharedValue, useAnimatedStyle, interpolate, withTiming, withDelay, log } from "react-native-reanimated"
import { useEffect, useState } from "react"
import { BlurView } from 'expo-blur';
import { useDispatch } from 'react-redux'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { setIsLogin, setRole } from "../store/slices/userSlice";

const LoginRegisScreen = () => {

  const dispatch = useDispatch()

  const { height, width } = Dimensions.get('window')
  const imagePosition = useSharedValue(1)

  const [isRegister, setIsregister] = useState(false)

  const imageAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [-height / 1.4, 0])
    return {
      transform: [{ translateY: withTiming(interpolation, { duration: 1000 }) }]
    }
  })

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [250, 0])
    return {
      opacity: withTiming(imagePosition.value, { duration: 500 }),
      transform: [{ translateY: withTiming(interpolation, { duration: 1000 }) }]
    }
  })

  const closeButton = useAnimatedStyle(() => {
    return {
      opacity: withTiming(imagePosition.value === 1 ? 0 : 1, { duration: 800 })
    }
  })

  const formAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [5, 0])
    return {
      opacity: imagePosition.value === 0 ? withDelay(400, withTiming(1, { duration: 800 })) : withTiming(0, { duration: 300 }),
      transform: [{ translateY: withTiming(interpolation, { duration: 400 }) }]
    }
  })

  const loginHandler = () => {
    imagePosition.value = 0
    isRegister ? setIsregister(false) : null
  }


  const registerHandler = () => {
    imagePosition.value = 0
    !isRegister ? setIsregister(true) : null

  }

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const defaultForm = {
    email: "",
    fullname: "",
    address: "",
    phoneNumber: "",
    password: ""
  }

  const [formInput, setForminput] = useState(defaultForm)

  // function inputFormHandler(e) {
  //   console.log(e)
  //   setForminput(
  //     {
  //       ...formInput,
  //       [e.target.name]: e.target.value
  //     }
  //   )
  // }

  const submitHandler = (data) => {
    console.log(data)
    // setForminput(defaultForm)
    dispatch(setIsLogin(true))
    dispatch(setRole(role))
    storeData(data)
  }

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      console.log(jsonValue)
      await AsyncStorage.setItem('@storage_Key', jsonValue)
      await AsyncStorage.setItem('username', "test1")
      await AsyncStorage.setItem('role', "customer")

    } catch (e) {
      // saving error
      console.log(e)
    }
  }


  useEffect(() => {
    fetch("https://testing-savvie.herokuapp.com/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formInput)
    })
      .then(res => res.json())
      .then(data => console.log(data))

  }, [])

  return (

    <View className='flex-1 items-center justify-end bg-white'>

      <Animated.View className='absolute top-0 bottom-0 left-0 right-0' style={imageAnimatedStyle}>
        <Svg height={height + 100} width={width} >
          <ClipPath id="clipPathId">
            <Ellipse cx={width / 2} rx={height} ry={height + 100} />
          </ClipPath>
          <Image
            href={require('../../photos/login-regis-bg.jpg')}
            height={height + 100}
            width={width + 100}
            preserveAspectRatio="XmidYmid slice"
            clipPath="url(#clipPathId)"
          />

        </Svg>
        <Animated.View className='h-[40] w-[40] justify-center self-center items-center bg-white rounded-full -top-[20] border border-gray-300'
          style={closeButton}>
          <Text onPress={() => imagePosition.value = 1} className='text-lg'>X</Text>
        </Animated.View>
      </Animated.View>



      <View className='w-full justify-center mb-[130]'>



        <Animated.View style={buttonAnimatedStyle}>
          <BlurView intensity={10}>
            <Pressable className='justify-center items-center rounded-3xl h-[55] mx-[20] my-[10] border border-gray-600 backdrop-blur-2xl' onPress={loginHandler}>

              <Text className='text-white font-bold text-xl tracking-wider'>LOG IN</Text>

            </Pressable>
          </BlurView>
        </Animated.View>

        <Animated.View style={buttonAnimatedStyle}>
          {/* <BlurView intensity={10}> */}

          <Pressable className='justify-center items-center rounded-3xl h-[55] mx-[20] my-[10] border border-gray-600 bg-black' onPress={registerHandler}>
            <Text className='text-white font-bold text-xl tracking-wider '>REGISTER</Text>
          </Pressable>
          {/* </BlurView> */}

        </Animated.View>



        <Animated.View className='absolute -top-[90] bottom-0 left-0 right-0 -z-50 justify-center' style={formAnimatedStyle}>

          <TextInput
            name='email'
            value={formInput.email}
            onChangeText={(newValue) => setForminput({ ...formInput, email: newValue })}
            placeholder='Email'
            className='h-[50] rounded-2xl pl-5 mx-[15] mb-2 border border-gray-300'
          />

          {isRegister && (
            <>
              <TextInput
                name='fullname'
                value={formInput.fullname}
                onChangeText={(newValue) => setForminput(newValue)}
                placeholder="Full Name"
                className='h-[50] rounded-2xl pl-5 mx-[15] my-2 border border-gray-300'
              />
              <TextInput
                name='address'
                value={formInput.address}
                onChangeText={(newValue) => setForminput(newValue)}
                placeholder="Address"
                className='h-[50] rounded-2xl pl-5 mx-[15] my-2 border border-gray-300'
              />
              <TextInput
                name='phoneNumber'
                value={formInput.phoneNumber}
                onChangeText={(newValue) => setForminput(newValue)}
                placeholder="Phone Number"
                className='h-[50] rounded-2xl pl-5 mx-[15] my-2 border border-gray-300'
              />
            </>
          )}
          <TextInput
            placeholder="Password"
            value={formInput.password}
            onChangeText={(newValue) => setForminput({ ...formInput, password: newValue })}
            className='h-[50] rounded-2xl pl-5 mx-[15] my-2 border border-gray-300'
          />


          <View className='justify-center items-center rounded-3xl bg-red-400 h-[55] mx-[15] my-4 border border-gray-400' style={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 8,
            },
            shadowOpacity: 0.46,
            shadowRadius: 11.14,

            elevation: 17,
          }}>
            <TouchableOpacity onPress={() => submitHandler(formInput)} className='text-white font-bold text-xl tracking-wider'>
              <Text>{isRegister ? "REGISTER" : "LOGIN"}</Text></TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => submitHandler(formInput, "kurir")} className='text-white font-bold text-xl tracking-wider'>
            <Text>Kurir</Text></TouchableOpacity>
        </Animated.View>




      </View>


    </View>
  )
}

export default LoginRegisScreen