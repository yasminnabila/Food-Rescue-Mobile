import { ScrollView, Text, View, Image, FlatList } from 'react-native';


import { Entypo } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native'

import * as Animatable from 'react-native-animatable';

import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';


const RestoDetailHeaders = () => {

  const stickyHeaderShown = useRef(false)

  const [showStickyHead, setShowStickyHead] = useState(false)
  const [mainAnimation, setMainAnimation] = useState("fadeIn")
  const [secondAnimation, setSecondAnimation] = useState("fadeIn")


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
    <ScrollView
      stickyHeaderIndices={showStickyHead && [0]}
      scrollEventThrottle={16}
      onScroll={(evt) => {
        // console.log(evt.nativeEvent.contentOffset)
        const { y } = evt.nativeEvent.contentOffset
        if (y >= 330 && !stickyHeaderShown.current) {
          stickyHeaderShown.current = true
          // mainHeaderRef.current.transitionTo({ opacity: 0 })
          // stickyHeaderRef.current.transitionTo({ opacity: 1 })

          setShowStickyHead(true)
          setMainAnimation("fadeOut")
          setSecondAnimation("fadeIn")
        } else if (y <= 330 && stickyHeaderShown.current) {

          stickyHeaderShown.current = false
          setShowStickyHead(false)
          setMainAnimation("fadeIn")
          setSecondAnimation("fadeOut")
          // mainHeaderRef.current.transitionTo({ opacity: 1 })
          // stickyHeaderRef.current.transitionTo({ opacity: 0 })
        }
      }}>

      {!showStickyHead &&
        <Animatable.View animation={mainAnimation} className='bg-red-200 h-[300] top-5'>
          <Image
            source={{ uri: "https://blog.meyerfood.id/wp-content/uploads/2021/02/bisnis-ayam-gepuk-pak-gembus.jpg" }}
            className='h-full w-full'
          />


          <View className='h-[150] bg-blue-300 rounded-2xl mx-2'>
            <View className='ml-6'>
              <Text className='text-2xl font-semibold mt-3'>
                Ayam Pak Gembus
              </Text>

              <View className='flex-row'>
                <Ionicons name="pin" size={15} color="black" />

                <Text className='mr-2'>
                  Jl.Pondok indah
                </Text>
              </View>

              <Text>10:00 - 22:00</Text>
            </View>

            <View className='flex-row mt-2 bg-red-400 space-x-6 justify-center items-center'>

              <View>
                <View className='flex-row bg-gray-300 items-center'>
                  <FontAwesome name="star" size={20} color="orange" />
                  <Text className='text-lg'>4.5</Text>
                </View>
              </View>

              <View>
                <View className='flex-row bg-green-300 items-center'>
                  <Feather name="thumbs-up" size={24} color="black" />
                  <Text className='text-lg'>123+</Text>
                </View>
              </View>

              <View>
                <View className='bg-green-300 items-center'>
                  <Text className='text-lg'>Restoran</Text>
                </View>
              </View>

              <View>
                <View className='bg-green-300 items-center'>
                  <View className='flex-row'>
                    <Entypo name="location-pin" size={24} color="black" />
                    <Text className='text-lg'>2.0km</Text>
                  </View>
                  <Text>Distance</Text>
                </View>
              </View>

            </View>

          </View>


        </Animatable.View>
      }

      {/* END HEADERS */}

      {showStickyHead &&
        <Animatable.View animation={secondAnimation} duration={200} className='h-[130] bg-green-200 mb-[170] rounded-b-3xl'>

          <Text>Bounce me!</Text>

        </Animatable.View>
      }



    </ScrollView>
  )
}

export default RestoDetailHeaders