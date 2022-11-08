import { View, Text, TouchableOpacity, Image, ActivityIndicator } from "react-native"
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { useRef, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Octicons } from '@expo/vector-icons';
import { currencyFormat } from 'simple-currency-format';



import { AntDesign } from '@expo/vector-icons';

import { dec_basket, inc_basket, addBasket, clearBasket } from "../store/slices/userSlice";

import LottieView from 'lottie-react-native';
import LoadingScreen from "./LoadingScreen";
import { Modalize, useModalize } from "react-native-modalize";

const DetailFood = ({ route }) => {



  const { id } = route.params
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const basket = useSelector(state => state.user.basket)


  const AnimationRef = useRef(null);
  const lottieAnimation = useRef(null);

  const modalizeRef = useRef(null);
  const { ref, open, close } = useModalize();


  const _onPress = () => {
    if (AnimationRef) {
      AnimationRef.current?.flash()
    }
  }

  const [buttonAnimation, setButtonAnimation] = useState("bounceIn")

  const [addToBasketAnimation, setAddToBasketAnimation] = useState("bounceIn")

  const [basketAnimation, setBasketAnimation] = useState("bounceIn")


  const [qtyAnimation, setQtyAnimation] = useState(null)

  const [foodInBasket, setFoodInBasket] = useState(false)

  const [currentQty, setCurrentQty] = useState(null)
  const [currentPrice, setCurrentPrice] = useState(null)

  const [isSameResto, setIsSameResto] = useState(true)


  let totalPrice = currentPrice * currentQty

  const [currenIdx, setCurrentIdx] = useState(null)

  const checkId = basket.map((el) => el.id)

  const checkRestoId = basket.map((el) => console.log(el.RestaurantId))

  const [food, setFood] = useState(null)

  function basketChecker() {
    basket.forEach((el, i) => {
      if (id == el.id) {
        setFoodInBasket(true)
        setCurrentQty(el.qty)
        setCurrentPrice(el.price)
      }
    })
    if (!checkId.includes(id)) {
      setFoodInBasket(false)
      setCurrentQty(0)
    }
  }

  function decHandler() {
    dispatch(dec_basket(currenIdx))
    _onPress()
  }
  function incHandler() {
    dispatch(inc_basket(currenIdx))
    lottieAnimation.current?.play();
  }

  function idxChecker() {
    const idx = basket.findIndex(el => el.id === id)
    setCurrentIdx(+idx)
  }


  function addToBasket() {
    lottieAnimation.current?.play();
    if (!isSameResto) {
      open()
    } else {
      setFoodInBasket(true)
      dispatch(addBasket({ ...food, qty: 1 }))
    }
  }

  function clearBasketHandler() {
    dispatch(clearBasket())
    close()
    setIsSameResto(true)
    dispatch(addBasket({ ...food, qty: 1 }))
  }

  function sameRestoChecker() {
    if (basket.length === 0) {
      setIsSameResto(true)
    } else if (basket[0]?.RestaurantId && basket[0]?.RestaurantId === food?.RestaurantId) {
      setIsSameResto(true)
    } else {
      setIsSameResto(false)
    }
  }

  useEffect(() => {
    fetch(`https://savvie.herokuapp.com/food/${id}`)
      .then(res => res.json())
      .then(data => setFood(data))
  }, [])

  useEffect(() => {
    basketChecker()
    idxChecker()
  }, [basket])

  useEffect(() => {
    sameRestoChecker()
  }, [food])


  console.log("------- DI FOOD DETAIL -----------")

  console.log(isSameResto)
  console.log(basket[0]?.RestaurantId, food?.RestaurantId, "<<<<<<<< check resto id")

  console.log(currentQty, "<< qty state CRNT")
  console.log(currenIdx, "<< IDX state IDX <<")
  console.log(currentPrice, "<< Price CRNT")


  basket?.forEach((el, i) => {
    console.log("id :|", el.id, "|name :", el.name, "|qty :", el.qty, "|price", el.price, "|idx :", i, "<< isi basket")
  })

  // console.log(basket, "<<<<<< di Detail Food")

  console.log("+++++++++++ DI FOOD DETAIL ++++++++++++++++++++++++")




  if (!food) return <LoadingScreen />

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
          <Ionicons name="chevron-back-circle-outline" size={40} color="black" />
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

      {foodInBasket &&
        <Animatable.View animation={buttonAnimation} className='flex-row justify-center items-end h-[70] space-x-5'>

          <TouchableOpacity onPress={() => decHandler()}>
            <AntDesign name="minussquareo" size={35} color="black" />
          </TouchableOpacity>

          <Animatable.Text ref={AnimationRef} className='text-3xl'>{currentQty}</Animatable.Text>

          <TouchableOpacity onPress={() => incHandler()}>
            <AntDesign name="plussquareo" size={35} color="black" />
          </TouchableOpacity>

        </Animatable.View>
      }

      {
        !currentQty &&

        <TouchableOpacity onPress={() => addToBasket()}>
          <Animatable.View animation={addToBasketAnimation} className='bg-green-600 h-[60] mx-[30] mt-7 rounded-lg justify-center'>
            <Text className='text-lg font-semibold self-center'>
              Add To Basket
            </Text>
          </Animatable.View>
        </TouchableOpacity>


      }

      {
        currentQty ?
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute inset-x-[0] bottom-[65] "
          >

            <Animatable.View animation={basketAnimation} duration={1000} className='bg-red-300 h-[50] mx-5 rounded-lg items-center justify-center'>
              <View className='flex-row justify-center items-center'>
                <Text className='text-xl font-semibold pl-2'>
                  Add To Basket
                </Text>
                <View className='pl-2'>
                  <Octicons name="dash" size={15} color="black" />
                </View>
                <Text className='pl-2 text-lg font-semibold'>
                  {currencyFormat(totalPrice, "id-ID", "IDR")}
                </Text>
              </View>

              <LottieView source={require('../lottie/cart.json')} className='w-[200] mr-2 h-[150] absolute -inset-x-[21] -bottom-[17] z-50 ' loop={false} duration={2000} ref={lottieAnimation} />
            </Animatable.View>
          </TouchableOpacity>
          : null
      }

      <Modalize
        modalHeight={490}
        ref={ref}
      >

        {/* ICON / PNG */}
        <View className='h-[220] w-[340] rounded-3xl mt-10 self-center'>
          <Image
            className='h-full w-full'
            source={{ uri: "https://media.discordapp.net/attachments/1035762335383552128/1039374828077072465/GOJEK1.png" }} />
        </View>
        {/* ICON / PNG */}


        <View className='self-center mt-2'>
          <Text className='text-2xl text-center font-bold tracking-normal w-[300]'>
            Want to order from this resto instead?
          </Text>
        </View>
        <View className='self-center mt-2'>
          <Text className='text-base text-center font-normal tracking-normal mx-6'>
            Sure thing, but we'll need to clear the items in your current cart from the previous resto first.
          </Text>
        </View>
        <View className='flex-row space-x-5 items-center justify-center mt-5'>
          <TouchableOpacity
            onPress={() => close()}
            className='border-2 border-green-300 h-[55] w-[170] rounded-3xl items-center justify-center'>
            <Text className='text-lg font-semibold'>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => clearBasketHandler()}
            className='bg-yellow-300 h-[55] w-[170] rounded-3xl items-center justify-center'>
            <Text className='text-lg font-semibold'>
              Yes, go ahead
            </Text>
          </TouchableOpacity>
        </View>

      </Modalize>



    </View>
  )
}

export default DetailFood