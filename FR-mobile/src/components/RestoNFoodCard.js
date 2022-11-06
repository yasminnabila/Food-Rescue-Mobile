
import { Text, View, Image, Pressable } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native'



const RestoNFoodCard = () => {
  const navigation = useNavigation()
  return (
    <>
      {/* RESTO n FOOD CARD */}
      <Pressable
        className='bg-red-200 mb-[10]'
        onPress={() => navigation.navigate('Test Detail Resto')}
      >

        {/* RESTORAN */}
        <View className='flex-row-reverse h-[165]'>
          <View className='bg-orange-300 justify-center'>
            <View className='w-[140] h-[75%] p-3 bg-blue-300'>
              <View className='bg-green-200 w-full h-full rounded-2xl'>
                <Image
                  source={{
                    uri: "https://blog.meyerfood.id/wp-content/uploads/2021/02/bisnis-ayam-gepuk-pak-gembus.jpg"
                  }}
                  className='h-full w-full rounded-2xl'

                />
              </View>
              <View className='bg-red-700 h-[25] -top-[13] w-[55] self-center rounded-md flex-row justify-center items-center'>
                <FontAwesome name="star" size={15} color="orange" />
                <Text className='font-bold'>4.5</Text>
              </View>
            </View>


          </View>
          <View className='bg-yellow-300 flex-1 pl-3 justify-center'>
            <View className='bg-red-200 -top-4'>
              <Text className='text-lg'>
                Ayam Gepuk Pak Gembus
              </Text>
              <View className='flex-row items-end mb-1 '>
                <Ionicons name="pin" size={15} color="black" />
                <Text className='mr-1'>
                  Jl.pondok indah
                </Text>
                <Text className='text-xs'>
                  0.2Km
                </Text>
              </View>
              <Text>
                10:00 - 20:00
              </Text>
            </View>
          </View>
        </View>
        {/* END RESTO */}

        {/* MENU */}
        <View className='bg-green-300 h-[65] flex-row-reverse justify-between'>
          <View className='bg-red-700 h-full w-[140] p-1'>
            <View className='bg-yellow-200 h-full w-[70] self-center rounded-lg'>
              <Image
                source={{ uri: "https://assets-pergikuliner.com/uploads/image/picture/590086/picture-1497521885.JPG" }}
                className='h-full w-full rounded-lg'
              />
            </View>
          </View>
          <View className='bg-blue-100 flex-1 pl-3'>
            <Text className='text-base'>Ayam geprek</Text>
            <Text className='text-lg'>30.000</Text>
          </View>
        </View>

        {/* END MENU */}

      </Pressable>
      {/* END RESTO n FOOD CARD */}
    </>
  )
}

export default RestoNFoodCard