import { View, Text, TouchableOpacity, Image, ActivityIndicator } from "react-native"
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { dec_basket, inc_basket, addBasket } from "../store/slices/userSlice";

const DetailFood = ({ route }) => {
  const navigation = useNavigation()
  // console.log(route.params)
  const { id } = route.params

  const basket = useSelector(state => state.user.basket)
  console.log(basket)

  const dispatch = useDispatch()

  const [animation, setAnimation] = useState(null)

  const [food, setFood] = useState(null)

  useEffect(() => {
    fetch(`https://savvie.herokuapp.com/food/${id}`)
      .then(res => res.json())
      .then(data => setFood(data))
  }, [])

  if (!food) return <ActivityIndicator size="large" color="#EE6221" className='flex-1' />

  return (
    <View className='flex-1'>
      {/* IMAGE */}
      <View className='h-[330] bg-blue-200'>
        <Image
          source={{
            uri: food?.imageUrl
          }}
          className='h-full w-full'
        />
        <TouchableOpacity
          className='top-[60] left-2 absolute'
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back-circle-outline" size={40} color="white" />
        </TouchableOpacity>

        <View className='absolute bottom-2 right-2 bg-red-400 w-[70]'>
          <View className='flex-row items-center self-center'>
            <FontAwesome name="star" size={25} color="orange" />
            <Text className='text-2xl ml-1'>5</Text>
          </View>
        </View>

      </View>
      {/* END IMAGE */}

      {/* FOOD DESC */}
      <View className=' bg-blue-300'>
        <View className='ml-3 my-2'>
          <View className='flex-row items-center'>
            <Text className='text-2xl font-semibold'>
              {food?.name}
            </Text>
            <Text className='text-lg'>
              Popular
            </Text>
          </View>
          <View className='flex-row items-center mb-2'>
            <Text className='text-lg'>
              20
            </Text>
            <MaterialCommunityIcons name="sale" size={20} color="black" />
          </View>

          <Text className='mb-2'>
            DESCRIPTION kadnskjdnaksjdn kankajsndaksjn ajksnd kjndskan
          </Text>

          <View>
            <Text className='text-2xl font-semibold'>
              25.000
            </Text>
            <Text className='text-sm line-through'>
              {food?.price}
            </Text>
          </View>
        </View>

      </View>
      {/* END FOOD DESC */}

      <TouchableOpacity onPress={() => dispatch(addBasket({ ...food, qty: 1 }))}>
        <Animatable.View animation={"bounceIn"} className='bg-green-600 h-[60] mx-[30] mt-7 rounded-lg justify-center'>
          <Text className='text-lg font-semibold self-center'>
            Add To Basket
          </Text>
        </Animatable.View>
      </TouchableOpacity>

    </View>
  )
}

export default DetailFood