import { StatusBar } from 'expo-status-bar';
import { FlatList, Image, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import FoodCard from '../components/FoodCard';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native'

import * as Animatable from 'react-native-animatable';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData, selectUser, setUser } from '../store/slices/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CarouselCard from '../components/CarouselCard';

const HomeScreen = () => {
  const stickyHeaderShown = useRef(false)
  const mainHeaderRef = useRef()
  const stickyHeaderRef = useRef()

  const dispatch = useDispatch()

  const user = useSelector(selectUser)

  const navigation = useNavigation()

  const [scrollY, setSrollY] = useState(0)

  const [showStickyHead, setShowStickyHead] = useState(false)
  const [mainAnimation, setMainAnimation] = useState("slideInDown")
  const [secondAnimation, setSecondAnimation] = useState("slideInDown")

  const [categories, setCategories] = useState()

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

  useEffect(() => {
    fetch("https://savvie.herokuapp.com/categories")
      .then(res => res.json())
      .then(data => setCategories(data))
  }, [])

  console.log("=========================")
  // {
  //   categories.forEach((el) => {
  //     console.log(el.name)
  //   })
  // }
  // console.log(user.access_token, "<<<<<<<<<<<<<")
  console.log("=========================")


  return (
    <>
      <View className='flex-1 '>
        <ScrollView
          stickyHeaderIndices={showStickyHead && [0]}
          scrollEventThrottle={16}
          onScroll={(evt) => {
            // console.log(evt.nativeEvent.contentOffset)
            const { y } = evt.nativeEvent.contentOffset
            if (y >= 105 && !stickyHeaderShown.current) {
              stickyHeaderShown.current = true
              // mainHeaderRef.current.transitionTo({ opacity: 0 })
              // stickyHeaderRef.current.transitionTo({ opacity: 1 })

              setShowStickyHead(true)
              setMainAnimation("slideOutUp")
              setSecondAnimation("slideInDown")
            } else if (y <= 105 && stickyHeaderShown.current) {

              stickyHeaderShown.current = false
              setShowStickyHead(false)
              setMainAnimation("slideInDown")
              setSecondAnimation("slideOutUp")

              // mainHeaderRef.current.transitionTo({ opacity: 1 })
              // stickyHeaderRef.current.transitionTo({ opacity: 0 })
            }
          }}>


          {/* HEADERS */}

          {!showStickyHead && <Animatable.View animation={mainAnimation} className='bg-[#77aa9c] h-[170] rounded-b-3xl'>

            <View className='h-[70] mt-[40] flex-row justify-around gap-x-[150] items-center'>

              <View className='justify-center items-center gap-y-1'>
                <View className='flex-row justify-center items-center'>
                  <Entypo name="location-pin" size={19} color="black" />
                  <Text>
                    Your Location
                  </Text>
                </View>
                <Text className='ml-2'>
                  Jl.pondok indah
                </Text>
              </View>
              <AntDesign name="heart" size={24} color="red" />

            </View>


            <Text className='text-xl self-center absolute bottom-7 mb-3'>
              Hi (name user)!
            </Text>

            <Pressable
              className='bg-gray-100 border border-gray-400 h-[50] absolute top-[143] w-[85%] self-center rounded-3xl items-start justify-center'
              onPress={() => navigation.navigate("Search")}
            >
              <Text className='text-md ml-4 text-gray-600'>
                What food do you want to save today?
              </Text>
            </Pressable>

          </Animatable.View>}

          {/* END HEADERS */}

          {showStickyHead && <Animatable.View animation={secondAnimation} duration={1000} className='h-[130] bg-[#77aa9c] mb-[10] '>

            <Text>Bounce me!</Text>

          </Animatable.View>}




          {/* CAROUSEL */}
          <View className='h-[200] mt-[40] p-4'>
            <CarouselCard />
            {/* <Text className='text-2xl m-auto'>
              CAROUSEL {showStickyHead ? "muncul" : "tidak"}
            </Text> */}
          </View>
          {/* END CAROUSEL */}


          {/* CATEGORY */}
          <View className='h-[205] py-2'>
            <Text className='text-xl mt-1 ml-5 mb-3 font-bold'>
              Category
            </Text>
            <ScrollView className='bg-white' horizontal showsHorizontalScrollIndicator='false'>
              {
                categories?.map((el) => {
                  return (
                    <Pressable
                      className='bg-gray-200 w-[80] h-[80] mt-[20] mx-3 rounded-3xl'
                      onPress={() => navigation.navigate('Category', {
                        id: el.id
                      })}>
                      <Image
                        source={{
                          uri: el.imageUrl
                        }}
                        className='h-full w-full mb-3 mt-3'
                        resizeMode='full'
                      />
                      <Text className='self-center mt-3 text-xs font-semibold text-center'>{el.name}</Text>
                    </Pressable>
                  )
                })
              }
            </ScrollView>
          </View>
          {/* END CATEGORY */}

          {/* NEAR ME */}
          <View className='h-[300] mt-4 '>

            {/* TITLE */}
            <Text className='text-xl mt-1 ml-5 mb-1 font-bold'>
              Near me
            </Text>
            {/* END TITLE */}

            {/* CAPTION */}
            <Text className='text-md ml-5 mb-3 font-bold'>
              Explore tasty meal around you.
            </Text>
            {/* END CAPTION */}

            <FlatList
              data={foodList}
              renderItem={({ item }) => {
                return <FoodCard food={item} />
              }}
              keyExtractor={(item) => item.id}
              className='bg-slate-300'
              horizontal
              showsHorizontalScrollIndicator='false'
            />
          </View>
          {/* END NEARME */}

          {/* Resto terdekat */}
          <View className='bg-green-300 h-[200] mt-4 py-2'>

            {/* TITLE */}
            <Text className='text-xl mt-1 ml-5 mb-1 font-bold'>
              Restos in your area
            </Text>
            {/* END TITLE */}

            {/* CAPTION */}
            <Text className='text-md ml-5 mb-3 font-bold'>
              Try your area's finest eats.
            </Text>
            {/* END CAPTION */}

            <ScrollView className='bg-yellow-200 ' horizontal showsHorizontalScrollIndicator='false'>

              <View className='items-center justify-center bg-blue-400 ml-5'>

                <View className='bg-gray-200 w-[100] h-[100] rounded-full'>

                </View>

                <Text className='mt-2'>
                  Pak gembus
                </Text>

              </View>

              <View className='items-center justify-center bg-blue-400 ml-5'>

                <View className='bg-gray-200 w-[100] h-[100] rounded-full'>

                </View>

                <Text>
                  NAMA RESTO
                </Text>

              </View>

              <View className='items-center justify-center bg-blue-400 ml-5'>
                <View className='bg-gray-200 w-[100] h-[100] rounded-full'>


                </View>
                <Text>
                  NAMA RESTO
                </Text>
              </View>

              <View className='items-center justify-center bg-blue-400 ml-5'>
                <View className='bg-gray-200 w-[100] h-[100] rounded-full'>


                </View>
                <Text>
                  NAMA RESTO
                </Text>
              </View>

              <View className='items-center justify-center bg-blue-400 ml-5'>
                <View className='bg-gray-200 w-[100] h-[100] rounded-full'>


                </View>
                <Text>
                  NAMA RESTO
                </Text>
              </View>

            </ScrollView>
          </View>
          {/* END CATEGORY */}

          {/* BANNER */}
          <View className='bg-blue-200 h-[200] mt-4'>
            <Image
              source={{
                uri: "https://media.discordapp.net/attachments/1035762335383552128/1040049865855602738/B2C4E164-9A9C-4EE2-AB3E-026EBBF45A45.jpg"
              }}
              className='h-full w-full rounded-2xl'
              resizeMode='cover'
            />
          </View>
          {/* END BANNER */}

          {/* Popular Foods */}
          <View className='h-[300] bg-green-300 mt-4 '>
            {/* TITLE */}
            <Text className='text-xl mt-1 ml-5 mb-1 font-bold'>
              Restos on trend
            </Text>
            {/* END TITLE */}

            {/* CAPTION */}
            <Text className='text-md ml-5 mb-3 font-bold'>
              Try these to call yourself a foodie.
            </Text>
            {/* END CAPTION */}

            <FlatList
              data={foodList}
              renderItem={({ item }) => {
                return <FoodCard food={item} />
              }}
              keyExtractor={(item) => item.id}
              className='bg-slate-300'
              horizontal
              showsHorizontalScrollIndicator='false'
            />

          </View>
          {/* END Popular Foods */}

          {/* Makanan Hemat */}
          <View className='h-[300] bg-green-300 mt-4 '>

            {/* TITLE */}
            <Text className='text-xl mt-1 ml-5 mb-1 font-bold'>
              All prices chopped (up to 20k)
            </Text>
            {/* END TITLE */}

            {/* CAPTION */}
            <Text className='text-md ml-5 mb-3 font-bold'>
              Eat good with no worries
            </Text>
            {/* END CAPTION */}

            <FlatList
              data={foodList}
              renderItem={({ item }) => {
                return <FoodCard food={item} />
              }}
              keyExtractor={(item) => item.id}
              className='bg-slate-300'
              horizontal
              showsHorizontalScrollIndicator='false'
            />

          </View>
          {/* END Makanan Hemat */}

          {/* Kamu melewatkan ini */}
          <View className='h-[300] bg-green-300 mt-4 '>
            {/* TITLE */}
            <Text className='text-xl mt-1 ml-5 mb-1 font-bold'>
              You missed these
            </Text>
            {/* END TITLE */}

            {/* CAPTION */}
            <Text className='text-md ml-5 mb-3 font-bold'>
              Keep your eye out open next time!
            </Text>
            {/* END CAPTION */}

            <FlatList
              data={foodList}
              renderItem={({ item }) => {
                return <FoodCard food={item} />
              }}
              keyExtractor={(item) => item.id}
              className='bg-slate-300'
              horizontal
              showsHorizontalScrollIndicator='false'
            />

          </View>
          {/* END Kamu melewatkan ini */}

        </ScrollView>
      </View >
      <StatusBar style='auto' />
    </>
  )
}

export default HomeScreen