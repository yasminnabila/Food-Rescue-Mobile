import {
  Button,
  FlatList,
  SafeAreaView,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  Image
} from "react-native";
import {
  DetailsHeaderScrollView,
  StickyHeaderScrollView,
} from "react-native-sticky-parallax-header";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";

import SelectDropdown from "react-native-select-dropdown";
import { Picker } from "@react-native-picker/picker";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Modalize, useModalize } from "react-native-modalize";

import { useSelector, useDispatch } from "react-redux";
import {
  dec_basket,
  inc_basket,
  addBasket,
  selectDelivery,
  setDelivery,
  checkOut,
  selectOrigin,
  selectIsPaid,
  selectUserData,
} from "../store/slices/userSlice";
import BasketCard from "./BasketCard";
import { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { currencyFormat } from "simple-currency-format";
import { Ionicons } from "@expo/vector-icons";
import { GOOGLE_MAPS_APIKEY } from "@env";
import Success from "./Success";
import LoadingScreen from "./LoadingScreen";

const BasketScreen = () => {
  const isPaid = useSelector(selectIsPaid)

  const userData = useSelector(selectUserData)
  // console.log(userData?.Balance?.balance, "<<<<<<<<<<< dot ")
  let balance = userData?.Balance?.balance
  let [information, setInformation] = useState("loading...");
  const origin = useSelector(selectOrigin);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const basket = useSelector((state) => state.user.basket);
  console.log(basket, "basket bang");
  const delivery = useSelector(selectDelivery);
  const { ref, open, close } = useModalize();
  console.log(information, "??????");
  // console.log(basket[0].Restaurant.location.coordinates[0], "<<<<----get resto address");
  let totalMoney = 0;
  let total = 0



  const paymentModal = useRef(null)

  if (basket.length > 0) {
    basket?.forEach((el) => { total += el.price * el.qty })
  }

  useEffect(() => {
    if (!origin || !basket.length) return;
    const getTravelTime = async () => {
      fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.location.lat}%2C${origin.location.lng}&destinations=${basket[0].Restaurant.location.coordinates[0]}%2C${basket[0].Restaurant.location.coordinates[1]}&key=${GOOGLE_MAPS_APIKEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          setInformation(data.rows[0].elements[0]);
        });
    };
    getTravelTime();
  }, [origin, GOOGLE_MAPS_APIKEY]);
  // console.log("=========================")
  // {
  //   basket.forEach((el) => {
  //     console.log(el.id, el.name, el.qty, el.RestaurantId, el.price)
  //   })
  // }
  // console.log("=========================")

  useEffect(() => {
    if (basket.length == 0) {
      navigation.goBack()
    }
  }, [basket])

  function deliveryHandler() {
    dispatch(setDelivery("Delivery"));
    close();
  }

  function pickupHandler() {
    dispatch(setDelivery("Pickup"));
    close();
  }

  function checkOutHanlder(total) {
    dispatch(checkOut({ total, basket, delivery }))
  }


  const modalizeRef = useRef(null);

  const onOpen = () => {
    console.log("MASUK")
    modalizeRef.current?.open();
  };

  let totalPayment = total + 10000

  if (isPaid) return <Success />

  return (
    <GestureHandlerRootView className='flex-1 bg-white'>

      {/* HISTORY CARD LIST */}

      <FlatList
        data={basket}
        ListHeaderComponent={
          <View className='bg-[#77aa9c] h-[250] mb-2'>
            {/* DELIVERY OPTION */}
            {
              basket.length > 0 &&
              <>
                <View className='mb-[70]'></View>
                <View
                  className='h-[80] justify-between flex-row items-center'
                >
                  <View className='flex-row space-x-2 items-center ml-3'>
                    <View className='h-[60] bg-white w-[60] rounded-full justify-center items-center border border-gray-500'>
                      <Image
                        className='h-full w-full'
                        source={{ uri: "https://cdn.discordapp.com/attachments/1035762335383552128/1039374758552285194/Delivery.png" }} />
                    </View>
                    <View>
                      <Text className='text-base font-semibold text-white'>{delivery}</Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={() => open('dest')}
                    className='h-[40] w-[95] mr-3 border-2 border-green-700 rounded-3xl items-center justify-center'>
                    <Text className='text-base font-semibold text-white'>
                      Change
                    </Text>
                  </TouchableOpacity>
                </View>
                <View className='h-[1] bg-gray-50 mx-3'></View>
                <View className=''>
                  <View className='ml-4'>
                    <Text className='text-2xl font-semibold text-white'>
                      Delivery Location
                    </Text>
                    <Text>
                      {origin?.description.slice(0, 53) + "..."}
                    </Text>
                    <Text>
                      {Math.round(information?.distance?.value / 1000)} km
                    </Text>
                    <Text>Estimated time {information?.duration?.text}</Text>
                  </View>
                </View>
              </>
            }
            {/* END DELIVERY OPTION */}


          </View>
        }
        renderItem={({ item, index }) => {
          return <BasketCard basket={item} i={index} />
        }}
        keyExtractor={(item) => item.id}
        ListFooterComponent={

          (basket.length > 0 &&
            <View className='mt-10 bg-white border border-y-1 border-gray-200 my-4 shadow-lg mx-4 rounded-lg p-4'>

              <Text className='text-xl font-semibold'>
                Payment summary
              </Text>

              <View className='flex-row justify-between mt-3'>
                <Text className='text-base'>
                  Price
                </Text>
                <Text className='text-base'>
                  {currencyFormat(total, "id-ID", "IDR")}
                </Text>
              </View>

              <View className='flex-row justify-between mt-1 mb-3'>
                <Text className='text-base'>
                  Delivery fee
                </Text>
                <Text className='text-base'>
                  {currencyFormat(10000, "id-ID", "IDR")}
                </Text>
              </View>

              <View className='bg-gray-200 h-[1]'></View>

              <View className='flex-row justify-between mt-3'>
                <Text className='font-bold text-base'>
                  Total Payment
                </Text>
                <Text className='font-bold text-base'>
                  {currencyFormat(totalPayment, "id-ID", "IDR")}
                </Text>
              </View>

            </View>
          )
        }
      />


      <View className='bg-[#77aa9c] h-[170] border-t-2 border-gray-100'>

        <View className='ml-7 mt-2'>
          <Text className='text-[500]'>
            Sevvie Pay
          </Text>
          <Text className='font-bold'>
            {currencyFormat(balance, "id-ID", "IDR")}
          </Text>
        </View>
        {/* 
        <TouchableOpacity
          onPress={onOpen}
          className='h-[30] w-10 bg-red-200 self-center'>
          <Text>
            tet
          </Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          onPress={() => checkOutHanlder(total)}
          className='bg-white h-[50] mx-4 rounded-3xl justify-center items-center my-3'>
          <Text className='text-lg font-semibold'>
            Place delivery order
          </Text>
        </TouchableOpacity>
      </View>

      {/* MODAL PICK DELIVERY OPTION */}
      <Modalize
        childrenStyle={{ flex: 1 }}
        modalHeight={300}
        ref={ref}
      >
        <Text className='mt-7 text-2xl font-bold ml-3'>
          Select order type
        </Text>

        <View className='h-[60] flex-row justify-between my-2 mx-2'>

          <View className='flex-row space-x-2 items-center ml-3'>
            <View className='h-[50] w-[50] rounded-full border'>
              <Image
                className='h-full w-full rounded-full'
                source={{ uri: "https://cdn.discordapp.com/attachments/1035762335383552128/1039374758552285194/Delivery.png" }} />
            </View>
            <View>
              <Text className='text-base font-semibold'>Delivery</Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => deliveryHandler()}
            className='h-[30] w-[30] mr-3 rounded-full border-2 border-gray self-center'>

          </TouchableOpacity>

        </View>
        <View className='bg-gray-200 h-[1] mx-4'></View>
        <View className='h-[60] flex-row justify-between mt-2  mx-2'>

          <View className='flex-row space-x-2 items-center ml-3'>
            <View className='h-[50] w-[50] rounded-full border '>
              <Image
                className='h-full w-full rounded-full'
                source={{ uri: "https://media.discordapp.net/attachments/1035762335383552128/1039374757293998171/Cart3.png" }} />
            </View>
            <View>
              <Text className='text-base font-semibold'>PickUp</Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => pickupHandler()}

            className='h-[30] w-[30] mr-3 rounded-full border-2 border-gray self-center'>

          </TouchableOpacity>

        </View>

      </Modalize>
      {/* END MODAL PICK DELIVERY OPTION */}



      {/* TEST MODAL TOP UP */}
      <Modalize
        childrenStyle={{ flex: 1 }}
        modalHeight={300}
        ref={modalizeRef}
      >
        <Text className='mt-7 text-2xl font-bold ml-3'>
          TOP UP
        </Text>



      </Modalize>

    </GestureHandlerRootView>
  )
}

export default BasketScreen