
import { Text, View, Image, Pressable } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native'
import { Octicons } from '@expo/vector-icons';

import { currencyFormat } from 'simple-currency-format';
import { useEffect, useState } from 'react';


const RestoNFoodCard = ({ resto }) => {

  const navigation = useNavigation()
  // console.log(resto.Food[0]?.discount, "<<")
  return (
    <>
      {/* RESTO n FOOD CARD */}

      <Pressable
        className='my-[10] mx-1 shadow-lg '

        // onPress={() => navigation.navigate('Test Detail Resto'),{
        //   id: foodFromRestoDetail?.id
        // }}

        onPress={() => navigation.navigate('Test Detail Resto', {
          id: resto?.id
        })}
      >

        {/* RESTORAN */}
        <View className='flex-row-reverse h-[120] border-t-[0.1px] border-gray-400 bg-white rounded-t-lg'>
          <View className='justify-center '>
            <View className='w-[130] h-[120] p-2 ml-[0.5]'>

              <Image
                source={{
                  uri: resto?.logoUrl
                }}
                className='h-full w-full rounded-2xl border border-gray-300'

              />

            </View>


          </View>
          <View className='flex-1 pl-3 justify-center'>
            <View className='-top-4'>
              <Text className='text-lg font-bold'>
                {resto?.name}
              </Text>
              <View className='flex-row items-center mb-1 '>

                <Text className='mr-1'>
                  30 menit
                </Text>
                <View className='mx-1'>
                  <Octicons name="dot-fill" size={5} color="black" />
                </View>
                <Text className='text-xs'>
                  0.2 Km
                </Text>

                <View className='mx-1'>
                  <Octicons name="dot-fill" size={5} color="black" />
                </View>

                <View className='flex-row items-center'>
                  <FontAwesome name="star" size={13} color="orange" />
                  <Text className=''>{resto?.rate}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        {/* END RESTO */}

        {/* MENU */}

        {
          resto.Food &&
          <View className=' h-[80] flex-row-reverse justify-between border-b-[0.1px] border-t-[0.5px] border-gray-200 bg-white items-center rounded-b-lg'>
            <View className=' h-[70] w-[140] p-1'>
              <View className=' h-full w-[70] self-center rounded-lg ml-3'>
                <Image
                  source={{ uri: resto?.Food[0]?.imageUrl }}
                  className='h-full w-full rounded-lg border border-gray-200'
                />
              </View>
            </View>
            <View className=' flex-1 p-3 my-2'>
              <Text className='text-base '>{resto?.Food[0]?.name}</Text>
              <View className='flex-row space-x-1 items-center'>
                <Text className='text-lg font-bold'>{resto?.Food[0]?.newPrice}</Text>
                <Text className='text-md line-through'>{resto?.Food[0]?.price}</Text>
              </View>
              <Text className='text-xs mb-1'>Savvie discount {resto.Food[0]?.discount}%</Text>
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