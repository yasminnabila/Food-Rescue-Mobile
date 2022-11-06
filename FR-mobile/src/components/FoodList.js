
import { useNavigation } from '@react-navigation/native'
import { Image, Pressable, Text, View } from 'react-native'



const FoodList = ({ foodFromRestoDetail }) => {
  const navigation = useNavigation()
  // console.log(foodFromRestoDetail, " <<<<<<<<<<<< di FoodList comp")
  return (
    <Pressable
      onPress={() => navigation.navigate('Test Food Detail', {
        id: foodFromRestoDetail?.id
      })}
    >
      <View className='h-[130] bg-red-300 mt-3'>
        <View className='flex-row'>
          <View className='bg-yellow-300 h-full w-[132] p-3'>
            <Image
              source={{ uri: foodFromRestoDetail.imageUrl }}
              className='h-full w-full rounded-lg'
            />

          </View>
          <View className='bg-green-300 flex-1'>
            <Text className='text-lg font-semibold'>
              {foodFromRestoDetail.name}
            </Text>
            <Text className='text-xs'>
              Desc asdak jnaskjndaks ksandkajsnd kajsndakdn jkasndkasjndkajn kjansdkajsnd kjas dnkd njakj nas n
            </Text>
            <Text className='font-semibold'>
              {foodFromRestoDetail.price}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  )
}

export default FoodList