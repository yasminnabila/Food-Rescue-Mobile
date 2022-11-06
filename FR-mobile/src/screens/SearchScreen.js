import React from 'react';

import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolation
} from 'react-native-reanimated';

import { SafeAreaProvider } from 'react-native-safe-area-context'
import { DetailsHeaderScrollView, StickyHeaderScrollView, TabbedHeaderPager } from 'react-native-sticky-parallax-header'


// export const HEADER_IMAGE_HEIGHT = Dimensions.get('window').width / 3;


import { StatusBar } from 'expo-status-bar';
import { FlatList, ScrollView, Text, TextInput, View, Image, Pressable } from 'react-native';
import FoodCard from '../components/FoodCard';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native'


import * as Animatable from 'react-native-animatable';
import RestoNFoodCard from '../components/RestoNFoodCard';


const SearchScreen = () => {

  const navigation = useNavigation()

  return (
    <>
      <View className='flex-1'>

        <View className='bg-red-200 h-[120] justify-between mt-[50]'>

          <View className='bg-yellow-300 h-[50] flex-row justify-around gap-x-[100] items-center'>

            <View className='bg-red-300'>
              <View className='flex-row items-center'>
                <Text className='mr-2'>
                  Your Location
                </Text>
                <AntDesign name="down" size={15} color="red" />
              </View>
              <Text className='text-lg'>
                Jl. Alam Permai IX No.68
              </Text>
            </View>

            <AntDesign name="heart" size={24} color="red" />


          </View>


          <TextInput
            className='bg-gray-200 border border-gray-400 h-[50] text-gray-500 rounded-2xl text-left mx-4 mb-2 pl-5'
            placeholder='What would you like to eat?'
          />
        </View>

        <ScrollView>


          {/* HEADERS */}



          {/* END HEADERS */}


          {/* CAROUSEL */}
          <View className='bg-blue-200 h-[200] mt-[10]'>
            <Text className='text-2xl m-auto'>
              CAROUSEL
            </Text>
          </View>
          {/* END CAROUSEL */}


          {/* CATEGORY */}
          <View className='bg-green-300  mt-4 py-2 mb-5'>

            <View className='flex-row justify-between'>
              <Text className='bg-red-300 text-2xl mt-1 ml-5'>
                CATEGORY
              </Text>
            </View>

            <View className='bg-yellow-200  flex-row flex-wrap justify-center items-center gap-5 mt-1'>

              <View className='bg-gray-200 w-[100] h-[100] rounded-3xl'>

              </View>
              <View className='bg-gray-200 w-[100] h-[100] rounded-3xl'>

              </View>
              <View className='bg-gray-200 w-[100] h-[100] rounded-3xl'>

              </View>
              <View className='bg-gray-200 w-[100] h-[100] rounded-3xl'>

              </View>
              <View className='bg-gray-200 w-[100] h-[100] rounded-3xl'>

              </View>
              <View className='bg-gray-200 w-[100] h-[100] rounded-3xl'>

              </View>
              <View className='bg-gray-200 w-[100] h-[100] rounded-3xl'>

              </View>
              <View className='bg-gray-200 w-[100] h-[100] rounded-3xl'>

              </View>
              <View className='bg-gray-200 w-[100] h-[100] rounded-3xl'>

              </View>

            </View>
          </View>
          {/* END CATEGORY */}


          <RestoNFoodCard />




        </ScrollView>
      </View >
      <StatusBar style='auto' />
    </>
  )
}

export default SearchScreen