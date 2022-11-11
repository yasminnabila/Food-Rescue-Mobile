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

  const [showStickyHead, setShowStickyHead] = useState(false)
  const [mainAnimation, setMainAnimation] = useState("fadeIn")
  const [secondAnimation, setSecondAnimation] = useState("fadeIn")
  const [basketAnimation, setBasketAnimation] = useState("bounceIn")

  const [text, setText] = useState(null)

  useEffect(() => {
    fetch(`https://savvie2.herokuapp.com/restaurants/${id}`)
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
          <Animatable.View
            animation={secondAnimation}
            duration={1000}
            className='h-[130] bg-[#77aa9c] mb-[170] rounded-b-xl justify-center shadow shadow-black'>

            <View className='flex-row mt-10'>
              <View className='bg-white h-[70] w-[70] ml-3 p-2 rounded-md border border-gray-100'>
                <View className='bg-red-300 rounded-full h-full w-full border border-gray-300'>
                  <Image
                    source={{
                      uri: resto.logoUrl
                    }}
                    className='h-full w-fulls rounded-full'
                  />
                </View>

              </View>
              <View className='flex-1'>
                <Text className='text-2xl font-semibold ml-2 text-white'>
                  {resto.name}
                </Text>
                <Text className='text-[10px] mx-2 text-white'>
                  {resto.address}
                </Text>
              </View>
            </View>

          </Animatable.View>
        }

        {/* DETAIL RESTO */}
        <Animatable.View animation={mainAnimation}
          className='bg-white rounded-2xl mx-2 border border-gray-200 shadow'>
          <View className='ml-6'>
            <Text className='text-2xl font-semibold mt-3'>
              {resto?.name}
            </Text>
            <View className='h-[1] bg-gray-200 w-[320] my-2'></View>
            <Text>
              {resto?.type}
            </Text>
            <View className='h-[1] bg-gray-200 w-[320] my-2'></View>
            <View className='mt-1'>
              <Text>Opening hours</Text>
              <Text>10:00 - 22:00</Text>
            </View>
            <View className='h-[1] bg-gray-200 w-[320] my-2'></View>
          </View>

          <View className='flex-row my-2 space-x-3 justify-start center ml-6'>

            <View>
              <View className='flex-row  items-center'>
                <FontAwesome name="star" size={15} color="orange" />
                <Text className=''>{resto?.rate}</Text>
              </View>
            </View>
            <View>
              <View className='flex-row items-center'>
                <Feather name="thumbs-up" size={15} color="black" />
                <Text className=''>{resto?.review_count}+</Text>
              </View>
            </View>
            <Text>|</Text>
            <View>
              <View className='items-center'>
                <View className='flex-row items-center'>
                  <Entypo name="location-pin" size={15} color="black" />
                  <Text>2.0km</Text>
                </View>
              </View>
            </View>

            <View>
              <View className='flex-row items-center'>
                <Text>10 mins</Text>
              </View>
            </View>

          </View>

        </Animatable.View>
        {/* END DETAIL RESTO */}

        <Text className='text-2xl font-semibold text-red-600 ml-3 mt-5'>Today's Offer</Text>

        {
          foods.map((el) => {
            return (
              <>
                <FoodList foodFromRestoDetail={el} />
              </>
            )
          })
        }

        <View className='h-[100] mt-[30]'>

        </View>


      </ScrollView >

      {
        basket.length > 0 ?
          <Animatable.View animation={basketAnimation} duration={700} className='bg-[#77aa9c] h-[50] absolute inset-x-[0] bottom-[65] z-50 mx-5 rounded-lg items-start justify-center'>
            <TouchableOpacity onPress={() => navigation.navigate("Test basket")}>
              <View className='flex-row items-center'>
                <Text className='text-xl font-semibold pl-2 text-white ml-2'>
                  Basket
                </Text>
                <View className='pl-2'>
                  <Octicons name="dot-fill" size={14} color="white" />
                </View>
                <Text className='text-xl pl-2 text-white'>
                  {qtyFood}
                </Text>
                <Text className='text-xl pl-1 text-white'>
                  {text}
                </Text>
                <Text className='pl-[80] text-lg font-semibold text-white'>
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