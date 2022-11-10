import { Image, Text, View } from "react-native"
import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { currencyFormat } from 'simple-currency-format';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectOrigin } from "../store/slices/userSlice";


const FoodCard = ({ food }) => {
  const origin = useSelector(selectOrigin);
  const navigation = useNavigation()
  const [information, setInformation] = useState()

  // console.log(food.loaction.coordinates[0], '<<< di food card')
  // console.log(food.loaction.coordinates[1], '<<< di food card')

  const [restoFood, setRestoFood] = useState(null)

  console.log(+information?.distance?.value / 1000, "<<<<<<<<<<<")
  // console.log(restoFood.Food[0].name)

  let km = +information?.distance?.value / 1000
  useEffect(() => {
    fetch(`https://savvie.herokuapp.com/restaurants/${food.id}`)
      .then(res => res.json())
      .then(data => setRestoFood(data))
  }, [])

  useEffect(() => {
    if (!origin) return;
    const getTravelTime = async () => {
      fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.location.lat}%2C${origin.location.lng}&destinations=${food.location.coordinates[0]}%2C${food.location.coordinates[1]}&key=AIzaSyBsZhvFmRckxNCDiMhcWioVP126-G9onCc`
      )
        .then((res) => res.json())
        .then((data) => {
          setInformation(data.rows[0].elements[0]);
        });
    };
    getTravelTime();
  }, [origin]);

  if (!restoFood) return <Text>TEST</Text>

  return (

    <TouchableOpacity
      onPress={() => navigation.navigate('Test Detail Resto', {
        id: food.id
      })}
      className='bg-red-500 w-[150] h-[220] ml-3 rounded-2xl self-center'>

      {/* IMAGE */}
      <View className='bg-white h-[110] rounded-t-2xl'>

        <Image source={{
          uri: restoFood.Food[0].imageUrl
        }} className='h-full w-full rounded-t-2xl' />

        {/* PROMO BANNER */}
        <View className='w-[40] h-[20] bg-orange-500 absolute -left-2 top-3 rounded-lg shadow-md shadow-black'>
          <Text className='text-xs m-auto'>
            {restoFood.Food[0].discount}%
          </Text>
        </View>
        {/* END PROMO BANNER */}

        {/* JARAK */}
        <View className='bg-blue-300 absolute bottom-1 right-2  w-[40] h-[20] items-center justify-center flex-row'>
          <Text className='text-[12px]'>
            {km}
          </Text>
          <Text className='text-[9px]'>
            km
          </Text>
        </View>
        {/* END JARAK */}

        {/* PHOTO RESTO */}
        <View className='bg-green-200 w-[45] h-[45] rounded-full absolute bottom-[-20] left-1 z-50'>
          <Image source={{
            uri: restoFood.logoUrl
          }} className='h-full w-full rounded-full' resizeMode='stretch' />
        </View>
        {/* END PHOTO RESTO */}

      </View>
      {/* END IMAGE */}


      {/* FOOD DESCRIPTION */}

      {/* STOCK */}
      <View>
        <Text className='text-right mr-3 mt-[4] text-[11px]'>
          {restoFood.Food[0].quantity}
          + tersedia
        </Text>
      </View>
      {/* END STOCK */}

      <View className='ml-1'>
        {/* HARGA */}
        <View className='-z-10 mt-2 flex-row space-x-1 items-center'>
          <Text className='bg-white text-[10px] line-through text-gray-500'>

            {currencyFormat(restoFood.Food[0].price, "id-ID", "IDR")}

          </Text>
          <Text className='bg-white text-xs'>

            {currencyFormat(restoFood.Food[0].newPrice, "id-ID", "IDR")}

          </Text>
        </View>
        {/* END HARGA */}

        {/* NAMA MAKANAN */}
        <View className='bg-yellow-200'>
          <Text className='text-xs'>
            {restoFood.Food[0].name}
          </Text>
        </View>
        {/* END NAMA MAKANAN */}

        {/* RATING */}
        <View className='bg-green-300'>
          <View className='flex-row items-center space-x-1'>
            <FontAwesome name="star" size={13} color="gold" />
            <Text className='text-xs'>{restoFood.rate}</Text>
          </View>
        </View>
        {/* END RATING */}
      </View>

      {/* END FOOD DESCRIPTION */}
    </TouchableOpacity>
  )

}

export default FoodCard