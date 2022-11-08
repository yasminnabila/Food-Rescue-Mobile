import React, { useEffect } from 'react';

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
import { FlatList, ScrollView, Text, TextInput, View, Image, Pressable, TouchableOpacity } from 'react-native';
import FoodCard from '../components/FoodCard';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native'
import { currencyFormat } from 'simple-currency-format';


import { Octicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import RestoNFoodCard from '../components/RestoNFoodCard';

import LottieView from 'lottie-react-native';
import useDebounce from '../useDebounce/hook';
import { searchCharacters } from '../useDebounce/fetchFunction';
import LoadingScreen from './LoadingScreen';
import { useSelector } from 'react-redux';

const SearchScreen = () => {

  const navigation = useNavigation()
  const animation = useRef(null);

  const basket = useSelector(state => state.user.basket)
  // console.log(basket)

  const [searchTerm, setSearchTerm] = useState("");
  // console.log(searchTerm)

  let qtyFood = 0
  let totalMoney = 0

  if (basket.length > 0) {
    // console.log(basket, "2")
    basket?.forEach((el) => { qtyFood += el.qty; totalMoney += el.price * el.qty })
  }

  const [text, setText] = useState(null)
  useEffect(() => {
    if (basket[0]?.qty === 1) {
      setText("Item")
    } else {
      setText("Items")
    }
  }, [basket])


  const [results, setResults] = useState([]);
  // console.log(results, "<<< di search")

  const [isSearching, setIsSearching] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setIsSearching(true);
        searchCharacters(debouncedSearchTerm).then((results) => {
          setIsSearching(false);
          setResults(results);
        });
      } else {
        setResults([]);
        setIsSearching(false);
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  const foodList = [
    {
      "id": 1
    },
    {
      "id": 2
    },
    {
      "id": 3
    },
    {
      "id": 4
    },
    {
      "id": 5
    }
  ]


  return (
    <>
      <View className='flex-1'>

        {/* HEADER */}
        {/* <View className='bg-red-200 h-[120] justify-between mt-[50]'>

          <View className='bg-yellow-300 h-[50] flex-row justify-around gap-x-[80] items-center'>
            <Animatable.View className='absolute -top-[0] -right-0'>
              <Pressable onPress={() => { console.warn("test") }}>
                <LottieView source={require('../lottie/cart.json')} className='w-[200] h-[140] absolute -top-[15] -right-2' ref={animation} loop={false} duration={1300} />
              </Pressable>
            </Animatable.View>

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

            <View className='flex-row space-x-5'>
              <TouchableOpacity>
                <AntDesign name="heart" size={24} color="red" />
              </TouchableOpacity>
            </View>


          </View>

          <TextInput
            className='bg-gray-200 border border-gray-400 h-[50] text-gray-500 rounded-2xl text-left mx-4 mb-2 pl-5'
            placeholder='What would you like to eat?'
            onChangeText={setSearchTerm}
          />
        </View> */}
        {/* END HEADER */}


        {/* <ScrollView> */}

        {/* CAROUSEL */}
        {/* <TouchableOpacity className='bg-blue-200 h-[200] mt-[10]' onPress={() => {
            animation.current?.play();
          }}>
            <Text className='text-2xl m-auto'>
              CAROUSEL
            </Text>
          </TouchableOpacity> */}
        {/* END CAROUSEL */}


        {/* CATEGORY */}
        {/* <View className='bg-green-300  mt-4 py-2 mb-5'>

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

          </View> */}
        {/* END CATEGORY */}

        <FlatList
          data={results}
          ListHeaderComponent={
            <>
              <View className='bg-red-200 h-[120] justify-between mt-[50]'>
                <View className='bg-yellow-300 h-[50] flex-row justify-around gap-x-[80] items-center'>

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

                  <View className='flex-row space-x-5'>
                    <TouchableOpacity>
                      <AntDesign name="heart" size={24} color="red" />
                    </TouchableOpacity>
                  </View>


                </View>

                <TextInput
                  className='bg-gray-200 border border-gray-400 h-[50] text-gray-500 rounded-2xl text-left mx-4 mb-2 pl-5'
                  placeholder='What would you like to eat?'
                  onChangeText={(text) => setSearchTerm(text)}
                />
              </View>
              <View>
                <TouchableOpacity className='bg-blue-200 h-[200] mt-[10]' onPress={() => {
                  animation.current?.play();
                }}>
                  <Text className='text-2xl m-auto'>
                    CAROUSEL
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          }
          renderItem={({ item }) => {
            return <RestoNFoodCard resto={item} />
          }}
          ListEmptyComponent={() => {
            if (isSearching) return <LottieView source={require('../lottie/skeleton.json')} autoPlay loop className='h-[220] w-[100] ' />
            if (debouncedSearchTerm !== "" && results.length === 0) return <Text>TIdak ada data</Text>
            return null
          }
          }
          keyExtractor={(item) => item.id}
        />

        {
          basket.length > 0 ?
            <View className='bg-red-300 h-[50] absolute inset-x-[0] bottom-[20] z-50 mx-5 rounded-lg items-start justify-center'>
              <TouchableOpacity onPress={() => navigation.navigate("Test basket")}>
                <View className='flex-row justify-center items-center'>
                  <Text className='text-xl font-semibold pl-2'>
                    Basket
                  </Text>
                  <View className='pl-2'>
                    <Octicons name="dot-fill" size={14} color="black" />
                  </View>
                  <Text className='text-xl pl-2'>
                    {qtyFood}
                  </Text>
                  <Text className='text-xl pl-1'>
                    {text}
                  </Text>
                  <Text className='pl-[50] text-lg font-semibold'>
                    {currencyFormat(totalMoney, "id-ID", "IDR")}
                  </Text>
                </View>
              </TouchableOpacity>
            </View> : null
        }



        {/* </ScrollView> */}
      </View >
      <StatusBar style='auto' />
    </>
  )
}

export default SearchScreen