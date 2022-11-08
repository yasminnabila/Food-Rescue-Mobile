import { Button, FlatList, SafeAreaView, ScrollView, Switch, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { DetailsHeaderScrollView, StickyHeaderScrollView } from 'react-native-sticky-parallax-header'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { FontAwesome } from '@expo/vector-icons';

import SelectDropdown from 'react-native-select-dropdown'
import { Picker } from '@react-native-picker/picker';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Modalize, useModalize } from 'react-native-modalize';

import { useSelector, useDispatch } from 'react-redux'
import { dec_basket, inc_basket, addBasket, selectDelivery, setDelivery, checkOut } from "../store/slices/userSlice";
import BasketCard from "./BasketCard";
import { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { currencyFormat } from 'simple-currency-format';



const BasketScreen = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const basket = useSelector(state => state.user.basket)
  const delivery = useSelector(selectDelivery)
  const { ref, open, close } = useModalize();

  let total = 0

  if (basket.length > 0) {
    basket?.forEach((el) => { total += el.price * el.qty })
  }

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
    dispatch(setDelivery("Delivery"))
    close()
  }

  function pickupHandler() {
    dispatch(setDelivery("Pickup"))
    close()
  }

  function checkOutHanlder(total) {
    dispatch(checkOut({ total, basket, delivery }))
  }



  return (
    <GestureHandlerRootView className='flex-1 bg-white'>

      {/* HISTORY CARD LIST */}

      <FlatList
        data={basket}
        ListHeaderComponent={
          <View className='bg-red-400 h-[180]'>
            {/* DELIVERY OPTION */}
            {
              basket.length > 0 &&
              <>
                <View
                  className='h-[80] justify-between flex-row items-center border-b-2 border-gray-300'
                >
                  <View className='flex-row space-x-2 items-center ml-3'>
                    <View className='h-[60] bg-yellow-600 w-[60] rounded-full'>
                      {/* <Text>test</Text> */}
                    </View>
                    <View>
                      <Text className='text-base font-semibold'>{delivery}</Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={() => open('dest')}
                    className='h-[40] w-[95] mr-3 border-2 border-green-600 rounded-3xl items-center justify-center'>
                    <Text className='text-base font-semibold'>
                      Change
                    </Text>
                  </TouchableOpacity>
                </View>
                <View className='bg-yellow-300'>
                  <Text className='text-4xl'>
                    Delivery Location
                  </Text>
                  <Text>
                    user Location
                  </Text>
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
                  14.500
                </Text>
              </View>

              <View className='bg-gray-200 h-[1]'></View>

              <View className='flex-row justify-between mt-3'>
                <Text className='font-bold text-base'>
                  Total Payment
                </Text>
                <Text className='font-bold text-base'>
                  14.500
                </Text>
              </View>

            </View>
          )
        }
      />


      <View className='bg-blue-300 h-[170] border-t-2 border-gray-100'>

        <View className='ml-7 mt-2'>
          <Text className='text-[500]'>
            Sevvie Pay
          </Text>
          <Text className='font-bold'>
            80.000
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => checkOutHanlder(total)}
          className='bg-red-200 h-[50] mx-4 rounded-3xl justify-center items-center my-3'>
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
            <View className='h-[50] bg-yellow-600 w-[50] rounded-full'>

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
            <View className='h-[50] bg-yellow-600 w-[50] rounded-full'>

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



    </GestureHandlerRootView>
  )
}

export default BasketScreen