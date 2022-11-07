
import { Text, View, Image, Pressable } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native'

import { currencyFormat } from 'simple-currency-format';
import { useEffect, useState } from 'react';


const RestoNFoodCard = ({ resto }) => {

  const navigation = useNavigation()
  return (
    <>
      {/* RESTO n FOOD CARD */}

      <Pressable
        className='bg-red-200 my-[10]'

        // onPress={() => navigation.navigate('Test Detail Resto'),{
        //   id: foodFromRestoDetail?.id
        // }}

        onPress={() => navigation.navigate('Test Detail Resto', {
          id: resto?.id
        })}
      >

        {/* RESTORAN */}
        <View className='flex-row-reverse h-[165]'>
          <View className='bg-orange-300 justify-center'>
            <View className='w-[140] h-[75%] p-3 bg-blue-300'>
              <View className='bg-green-200 w-full h-full rounded-2xl'>
                <Image
                  source={{
                    uri: resto?.logoUrl
                  }}
                  className='h-full w-full rounded-2xl'

                />
              </View>
              <View className='bg-red-700 h-[25] -top-[13] w-[55] self-center rounded-md flex-row justify-center items-center'>
                <FontAwesome name="star" size={15} color="orange" />
                <Text className='font-bold ml-1'>{resto?.rate}</Text>
              </View>
            </View>


          </View>
          <View className='bg-yellow-300 flex-1 pl-3 justify-center'>
            <View className='bg-red-200 -top-4'>
              <Text className='text-lg'>
                {resto?.name}
              </Text>
              <View className='flex-row items-end mb-1 '>
                <Ionicons name="pin" size={15} color="black" />
                <Text className='mr-1'>
                  {resto?.address}
                </Text>
                <Text className='text-xs'>
                  0.2Km
                </Text>
              </View>
              <Text>
                {resto?.open_time} - {resto?.close_time}
              </Text>
            </View>
          </View>
        </View>
        {/* END RESTO */}

        {/* MENU */}

        {
          resto.Food &&
          <View className='bg-green-300 h-[65] flex-row-reverse justify-between'>
            <View className='bg-red-700 h-full w-[140] p-1'>
              <View className='bg-yellow-200 h-full w-[70] self-center rounded-lg'>
                <Image
                  source={{ uri: resto?.Food[0]?.imageUrl }}
                  className='h-full w-full rounded-lg'
                />
              </View>
            </View>
            <View className='bg-blue-100 flex-1 pl-3'>
              <Text className='text-base'>{resto?.Food[0]?.name}</Text>
              <Text className='text-lg'>{currencyFormat(resto?.Food[0]?.price, "id-ID", "IDR")}</Text>
            </View>
          </View>
        }
        {/* END MENU */}

      </Pressable>
      {/* END RESTO n FOOD CARD */}
    </>
  )
}

export default RestoNFoodCard