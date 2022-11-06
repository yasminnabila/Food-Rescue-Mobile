

import { StatusBar } from 'expo-status-bar';
import { FlatList, Pressable, ScrollView, Text, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native';
import FoodCard from '../components/FoodCard';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native'

import * as Animatable from 'react-native-animatable';

import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import RestoDetailHeaders from '../components/RestoDetailHeaders';
import { useEffect } from 'react';
import FoodList from '../components/FoodList';
import { useSelector } from 'react-redux';


const DetailResto = () => {
  const navigation = useNavigation()
  const stickyHeaderShown = useRef(false)

  const basket = useSelector(state => state.user.basket)
  console.log(basket, "1")

  let qtyFood = 0

  if (basket.length > 0) {
    console.log(basket, "2")
    basket?.forEach((el) => { qtyFood += el.qty })

  }


  const [showStickyHead, setShowStickyHead] = useState(false)
  const [mainAnimation, setMainAnimation] = useState("fadeIn")
  const [secondAnimation, setSecondAnimation] = useState("fadeIn")
  const [basetAnimation, setBasketAnimation] = useState("bounceIn")

  useEffect(() => {
    fetch("https://savvie.herokuapp.com/restaurants/2")
      .then(res => res.json())
      .then(data => setRestoNFoods(data))
  }, [])


  function setRestoNFoods(data) {
    setFoods(data.Food)
    setResto(data)
  }

  const [foods, setFoods] = useState()
  const [resto, setResto] = useState()

  // console.log(foods)
  // console.log(resto?.name, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")

  // const foodList = [
  //   {
  //     "id": 1
  //   },
  //   {
  //     "id": 2
  //   },
  //   {
  //     "id": 3
  //   },
  //   {
  //     "id": 4
  //   },
  //   {
  //     "id": 5
  //   },
  //   {
  //     "id": 5
  //   },
  //   {
  //     "id": 5
  //   },
  //   {
  //     "id": 5
  //   },
  //   {
  //     "id": 5
  //   }
  // ]

  if (!foods) return <ActivityIndicator size="large" color="#EE6221" className='flex-1' />


  return (
    <View className='flex-1 bg-white'>

      <ScrollView
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={showStickyHead && [0]}
        scrollEventThrottle={16}

        onMomentumScrollEnd={(evt) => {
          // console.log(evt.nativeEvent.contentOffset.y, "< momentum End")
          const { y } = evt.nativeEvent.contentOffset
          if (y == 0 || y) {
            setBasketAnimation("bounceIn")
          }
        }}
        onMomentumScrollBegin={(evt) => {
          // console.log(evt, "< momentum Start")
          evt.nativeEvent.contentOffset.y ? setBasketAnimation("bounceOut") : null
        }}

        onScroll={(evt) => {

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

            {/* DETAIL RESTO */}
            {/* <View className='h-[150] bg-blue-300 rounded-2xl mx-2'>
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

            </View> */}
            {/* END DETAIL RESTO */}



          </Animatable.View>
        }

        {/* END HEADERS */}

        {showStickyHead &&
          <Animatable.View animation={secondAnimation} className='h-[130] bg-green-200 mb-[170] rounded-b-3xl'>

            <Text>Bounce me!</Text>

          </Animatable.View>
        }

        {/* <FlatList
          data={foodList}
          horizontal={false}
          renderItem={({ item }) => {
            return <FoodCard food={item} />
          }}
          keyExtractor={(item) => item.id}
          className='bg-slate-300 mt-[180]'
        /> */}




        {/* DETAIL RESTO */}
        <Animatable.View animation={mainAnimation} duration={2000} className='h-[150] bg-blue-300 rounded-2xl mx-2'>
          <View className='ml-6'>
            <Text className='text-2xl font-semibold mt-3'>
              {resto?.name}
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
                <Text className='text-lg'>{resto?.rate}</Text>
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

        </Animatable.View>
        {/* END DETAIL RESTO */}




        {/* {
          foodList.map((el) => {
            return (
              <FoodCard />
            )
          })
        } */}

        {
          foods.map((el) => {
            return (

              <FoodList foodFromRestoDetail={el} />


              // <Pressable
              //   onPress={() => navigation.navigate('Test Food Detail')}
              // >
              //   <View className='h-[130] bg-red-300 mt-3'>
              //     <View className='flex-row'>
              //       <View className='bg-yellow-300 h-full w-[132] p-3'>
              //         <Image
              //           source={{ uri: "https://assets-pergikuliner.com/uploads/image/picture/590086/picture-1497521885.JPG" }}
              //           className='h-full w-full rounded-lg'
              //         />

              //       </View>
              //       <View className='bg-green-300 flex-1'>
              //         <Text className='text-lg font-semibold'>
              //           {el.name}
              //         </Text>
              //         <Text className='text-xs'>
              //           Desc asdak jnaskjndaks ksandkajsnd kajsndakdn jkasndkasjndkajn kjansdkajsnd kjas dnkd njakj nas n
              //         </Text>
              //         <Text className='font-semibold'>
              //           {el.price}
              //         </Text>
              //       </View>
              //     </View>
              //   </View>
              // </Pressable>

            )
          })
        }

        {/* <Pressable
          onPress={() => navigation.navigate('Test Food Detail')}
        >
          <View className='h-[130] bg-red-300 mt-3'>
            <View className='flex-row'>
              <View className='bg-yellow-300 h-full w-[132] p-3'>
                <Image
                  source={{ uri: "https://assets-pergikuliner.com/uploads/image/picture/590086/picture-1497521885.JPG" }}
                  className='h-full w-full rounded-lg'
                />

              </View>
              <View className='bg-green-300 flex-1'>
                <Text className='text-lg font-semibold'>
                  Paket ayam lengkap
                </Text>
                <Text className='text-xs'>
                  Desc asdak jnaskjndaks ksandkajsnd kajsndakdn jkasndkasjndkajn kjansdkajsnd kjas dnkd njakj nas n
                </Text>
                <Text className='font-semibold'>
                  46.000
                </Text>
              </View>
            </View>
          </View>
        </Pressable> */}
      </ScrollView >

      {
        basket.length > 0 ?
          <Animatable.View animation={basetAnimation} duration={700} className='bg-red-300 h-[70] absolute inset-x-[0] bottom-2 z-50 mx-5 rounded-lg'>
            <Text className='self-center text-3xl'>
              {qtyFood}
            </Text>
          </Animatable.View> : null
      }


    </View >
  )
}

export default DetailResto