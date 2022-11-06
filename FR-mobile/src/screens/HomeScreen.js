import { StatusBar } from 'expo-status-bar';
import { FlatList, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import FoodCard from '../components/FoodCard';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native'

import * as Animatable from 'react-native-animatable';

const HomeScreen = () => {
  const stickyHeaderShown = useRef(false)
  const mainHeaderRef = useRef()
  const stickyHeaderRef = useRef()

  const navigation = useNavigation()


  const [scrollY, setSrollY] = useState(0)

  const [showStickyHead, setShowStickyHead] = useState(false)
  const [mainAnimation, setMainAnimation] = useState("slideInDown")
  const [secondAnimation, setSecondAnimation] = useState("slideInDown")

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

  const zoomOut = {
    0: {
      opacity: 1,
      scale: 1,
    },
    0.5: {
      opacity: 1,
      scale: 0.3,
    },
    1: {
      opacity: 0,
      scale: 0,
    },
  };
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

          {!showStickyHead && <Animatable.View animation={mainAnimation} className='bg-red-200 h-[170] rounded-b-3xl'>

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


            <Text className='text-xl self-center absolute bottom-7'>
              Hi (name user)!
            </Text>

            <Pressable
              className='bg-gray-100 border border-gray-400 h-[50] absolute top-[143] w-[85%] self-center rounded-3xl items-start justify-center'
              onPress={() => navigation.navigate("Search")}
            >
              <Text className='text-lg ml-4 text-gray-600'>
                What would you like to eat?
              </Text>
            </Pressable>

          </Animatable.View>}

          {/* END HEADERS */}

          {showStickyHead && <Animatable.View animation={secondAnimation} duration={1000} className='h-[130] bg-green-200 mb-[10] '>

            <Text>Bounce me!</Text>

          </Animatable.View>}




          {/* CAROUSEL */}
          <View className='bg-blue-200 h-[200] mt-[50]'>
            <Text className='text-2xl m-auto'>
              CAROUSEL {showStickyHead ? "muncul" : "tidak"}
            </Text>
          </View>
          {/* END CAROUSEL */}


          {/* CATEGORY */}
          <View className='bg-green-300 h-[200] mt-4 py-2'>
            <View className='flex-row justify-between'>
              <Text className='bg-red-300 text-2xl mt-1 ml-5'>
                CATEGORY
              </Text>
              <Text className='bg-red-300 text-lg mt-1 mr-2'>
                View all
              </Text>
            </View>

            <ScrollView className='bg-yellow-200 ' horizontal showsHorizontalScrollIndicator='false'>

              <Pressable
                className='bg-gray-200 w-[100] h-[70%] self-center ml-5 rounded-3xl'
                onPress={() => navigation.navigate('Test2')}>
                <Text>
                  TEST PINDAH CATEGORY
                </Text>

              </Pressable>

              <View className='bg-gray-200 w-[100] h-[70%] self-center ml-5 rounded-3xl'>


              </View>

              <View className='bg-gray-200 w-[100] h-[70%] self-center ml-5 rounded-3xl'>


              </View>

              <View className='bg-gray-200 w-[100] h-[70%] self-center ml-5 rounded-3xl'>


              </View>

              <View className='bg-gray-200 w-[100] h-[70%] self-center ml-5 rounded-3xl'>


              </View>

              <View className='bg-gray-200 w-[100] h-[70%] self-center ml-5 mr-5 rounded-3xl'>


              </View>

            </ScrollView>
          </View>
          {/* END CATEGORY */}


          {/* NEAR ME */}
          <View className='h-[300] bg-green-300 mt-4 '>
            {/* TITLE */}
            <Text className='bg-red-300 text-2xl mt-1 ml-5'>
              NEAR ME
            </Text>
            {/* END TITLE */}

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

            {
              /* <ScrollView className='bg-slate-300' horizontal showsHorizontalScrollIndicator='false'>
     
                <View className='bg-red-200 w-[150] h-[220] ml-3 rounded-2xl self-center'>
     
                  <View className='bg-white h-[50%] rounded-t-2xl'>
     
     
     
                    <View className='bg-black w-[40] h-[20]'>
     
     
                    </View>
     
                  </View>
     
                  <View className='bg-green-200 w-[45] h-[45] rounded-full top-[-20] left-1'>
     
     
                  </View>
     
     
                </View>
     
     
              </ScrollView> */
            }

          </View>
          {/* END NEARME */}

          {/* Resto terdekat */}
          <View className='bg-green-300 h-[200] mt-4 py-2'>
            <Text className='bg-red-300 text-2xl mt-1 ml-5'>
              Resto terdekat
            </Text>

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
            <Text className='text-2xl m-auto'>
              BANNER
            </Text>
          </View>
          {/* END BANNER */}

          {/* Popular Foods */}
          <View className='h-[300] bg-green-300 mt-4 '>
            {/* TITLE */}
            <Text className='bg-red-300 text-2xl mt-1 ml-5'>
              Popular Foods
            </Text>
            {/* END TITLE */}

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
            <Text className='bg-red-300 text-2xl mt-1 ml-5'>
              Makanan Hemat 20Rb
            </Text>
            {/* END TITLE */}

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
            <Text className='bg-red-300 text-2xl mt-1 ml-5'>
              Kamu melewatkan ini
            </Text>
            {/* END TITLE */}

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