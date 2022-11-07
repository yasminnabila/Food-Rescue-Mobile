import { StatusBar } from 'expo-status-bar';
import { FlatList, Pressable, ScrollView, Text, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native';
import FoodCard from '../components/FoodCard';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native'

import { Octicons } from '@expo/vector-icons';
import { currencyFormat } from 'simple-currency-format';

import * as Animatable from 'react-native-animatable';

import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import RestoDetailHeaders from '../components/RestoDetailHeaders';
import { useEffect } from 'react';
import FoodList from '../components/FoodList';
import { useSelector } from 'react-redux';
import LoadingScreen from './LoadingScreen';

//! debounce flatlist listheadercomponent apus category/ coba search beneran pake debaounce

const DetailResto = ({ route }) => {
  const { id } = route.params

  const navigation = useNavigation()
  const stickyHeaderShown = useRef(false)

  const basket = useSelector(state => state.user.basket)

  // basket?.forEach((el, i) => {
  //   console.log(el.name, i, "<<<<")
  // })
  // console.log("+++++++++++++++++++++++++++++++++++")
  // console.log(basket, "<<<<<< di Detail Resto")

  let qtyFood = 0
  let totalMoney = 0

  if (basket.length > 0) {
    // console.log(basket, "2")
    basket?.forEach((el) => { qtyFood += el.qty; totalMoney += el.price * el.qty })
  }

  // if (basket.length === 1) {
  //   setText('Item')
  // } else {
  //   setText("Items")
  // }
  const [text, setText] = useState(null)

  const [showStickyHead, setShowStickyHead] = useState(false)
  const [mainAnimation, setMainAnimation] = useState("fadeIn")
  const [secondAnimation, setSecondAnimation] = useState("fadeIn")
  const [basketAnimation, setBasketAnimation] = useState("bounceIn")


  useEffect(() => {
    fetch(`https://savvie.herokuapp.com/restaurants/${id}`)
      .then(res => res.json())
      .then(data => setRestoNFoods(data))
  }, [])

  useEffect(() => {
    if (basket[0]?.qty === 1) {
      setText("Item")
    } else {
      setText("Items")
    }
  }, [basket])


  function setRestoNFoods(data) {
    setFoods(data.Food)
    setResto(data)
  }

  const [foods, setFoods] = useState()
  const [resto, setResto] = useState()

  // console.log(JSON.stringify(foods))
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

  if (!foods) return <LoadingScreen />


  return (
    <View className='flex-1 bg-white'>

      <ScrollView
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={showStickyHead && [0]}
        scrollEventThrottle={16}

        onMomentumScrollEnd={(evt) => {
          const { y } = evt.nativeEvent.contentOffset
          if (y == 0 || y) {
            setBasketAnimation("bounceIn")
          }
        }}
        onMomentumScrollBegin={(evt) => {
          evt.nativeEvent.contentOffset.y ? setBasketAnimation("bounceOut") : null
        }}

        onScroll={(evt) => {

          const { y } = evt.nativeEvent.contentOffset
          if (y >= 330 && !stickyHeaderShown.current) {
            stickyHeaderShown.current = true

            setShowStickyHead(true)
            setMainAnimation("fadeOut")
            setSecondAnimation("fadeIn")

          } else if (y <= 330 && stickyHeaderShown.current) {

            stickyHeaderShown.current = false
            setShowStickyHead(false)
            setMainAnimation("fadeIn")
            setSecondAnimation("fadeOut")
          }
        }}>

        {!showStickyHead &&
          <Animatable.View animation={mainAnimation} className='bg-red-200 h-[300] top-5'>
            <Image
              source={{ uri: resto?.logoUrl }}
              className='h-full w-full'
            />

          </Animatable.View>
        }

        {/* END HEADERS */}

        {showStickyHead &&
          <Animatable.View animation={secondAnimation} duration={900} className='h-[130] bg-gray-500 mb-[170] rounded-b-3xl'>

            <Text>Bounce me!</Text>

          </Animatable.View>
        }

        {/* DETAIL RESTO */}
        <Animatable.View animation={mainAnimation} className='h-[150] bg-blue-300 rounded-2xl mx-2'>
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

        <View>
          {
            foods.map((el) => {
              return (
                <>
                  <FoodList foodFromRestoDetail={el} />
                </>
              )
            })
          }
        </View>

      </ScrollView >

      {
        basket.length > 0 ?
          <Animatable.View animation={basketAnimation} duration={700} className='bg-red-300 h-[50] absolute inset-x-[0] bottom-2 z-50 mx-5 rounded-lg items-start justify-center'>
            <TouchableOpacity onPress={() => navigation.navigate("Test basket")}>
              <View className='flex-row justify-center items-center'>
                <Text className='text-xl font-semibold pl-2'>
                  Basket
                </Text>
                <View className='pl-2'>
                  <Octicons name="dot-fill" size={15} color="black" />
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
          </Animatable.View> : null
      }


    </View >
  )
}

export default DetailResto