import { Image, Text, View } from "react-native"
import { FontAwesome } from '@expo/vector-icons';

const FoodCard = ({ food }) => {

  return (

    <View className='bg-red-500 w-[150] h-[220] ml-3 rounded-2xl self-center'>

      {/* IMAGE */}
      <View className='bg-white h-[110] rounded-t-2xl'>

        <Image source={{
          uri: "https://cdn1-production-images-kly.akamaized.net/a-wAq_1s1PwAnaOQm4qQ8ggWvdI=/1200x675/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/2958639/original/057463300_1572940011-shutterstock_127677473.jpg"
        }} className='h-full w-full rounded-t-2xl' />

        {/* PROMO BANNER */}
        <View className='w-[40] h-[20] bg-orange-500 absolute -left-2 top-3 rounded-lg shadow-md shadow-black'>
          <Text className='text-xs m-auto'>
            50%
          </Text>
        </View>
        {/* END PROMO BANNER */}

        {/* JARAK */}
        <View className='bg-blue-300 absolute bottom-1 right-2  w-[40] h-[20] items-center justify-center flex-row'>
          <Text className='text-[12px]'>
            2.3
          </Text>
          <Text className='text-[9px]'>
            km
          </Text>
        </View>
        {/* END JARAK */}

        {/* PHOTO RESTO */}
        <View className='bg-green-200 w-[45] h-[45] rounded-full absolute bottom-[-20] left-1 z-50'>
          <Image source={{
            uri: "https://blog.meyerfood.id/wp-content/uploads/2021/02/bisnis-ayam-gepuk-pak-gembus.jpg"
          }} className='h-full w-full rounded-full' resizeMode='stretch' />
        </View>
        {/* END PHOTO RESTO */}

      </View>
      {/* END IMAGE */}


      {/* FOOD DESCRIPTION */}

      {/* STOCK */}
      <View>
        <Text className='text-right mr-3 mt-[4] text-[11px]'>
          10+ tersedia
        </Text>
      </View>
      {/* END STOCK */}

      <View className='ml-1'>
        {/* HARGA */}
        <View className='-z-10 mt-2 flex-row space-x-1 items-center'>
          <Text className='bg-white text-[10px] line-through text-gray-500'>
            Rp.40.000
          </Text>
          <Text className='bg-white text-xs'>
            Rp.20.000
          </Text>
        </View>
        {/* END HARGA */}

        {/* NAMA MAKANAN */}
        <View className='bg-yellow-200'>
          <Text className='text-xs'>
            Ayam Goreng
          </Text>
        </View>
        {/* END NAMA MAKANAN */}

        {/* RATING */}
        <View className='bg-green-300'>
          <View className='flex-row items-center space-x-1'>
            <FontAwesome name="star" size={13} color="gold" />
            <Text className='text-xs'>4.6</Text>
          </View>
        </View>
        {/* END RATING */}
      </View>

      {/* END FOOD DESCRIPTION */}
    </View>
  )

}

export default FoodCard