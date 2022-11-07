import { Text, TouchableOpacity, View, Image } from "react-native"
import { FontAwesome } from '@expo/vector-icons';
import { currencyFormat } from 'simple-currency-format';
import { dec_basket, inc_basket, addBasket } from "../store/slices/userSlice";
import { useDispatch } from "react-redux"


const BasketCard = ({ basket, i }) => {
  const dispatch = useDispatch()
  return (
    <View className='bg-white flex-row border border-y-1 border-gray-200 my-1 shadow-lg mx-4 rounded-lg'>

      <View className='w-[240] justify-center'>
        <View className='ml-4'>
          <Text className='text-lg'>
            {basket.name}
          </Text>
          <Text className='text-base'>
            {currencyFormat(basket.price, "id-ID", "IDR")}
          </Text>
        </View>
      </View>

      <View className='flex-1'>

        <View className='h-[90] w-[100] self-center mt-2 rounded-lg shadow-2xl'>
          <Image source={{ uri: basket.imageUrl }} className='w-full h-full rounded-lg shadow-2xl shadow-black border border-gray-300' />
        </View>

        <View className='flex-row justify-center items-center space-x-3 mt-1'>
          <TouchableOpacity onPress={() => dispatch(dec_basket(i))}>
            <FontAwesome name="minus-square-o" size={35} color="black" />
          </TouchableOpacity>

          <Text className='text-3xl'>{basket.qty}</Text>

          <TouchableOpacity onPress={() => dispatch(inc_basket(i))}>
            <FontAwesome name="plus-square-o" size={35} color="black" />
          </TouchableOpacity>
        </View>
      </View>

    </View>
  )
}

export default BasketCard