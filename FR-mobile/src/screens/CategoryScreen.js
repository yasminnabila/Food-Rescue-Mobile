import { useNavigation } from "@react-navigation/native"
import { useEffect, useState } from "react"
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import FoodList from "../components/FoodList"
import LoadingScreen from "./LoadingScreen"

const CategoryScreen = ({ route }) => {
  const { id } = route.params
  console.log(id)
  const navigation = useNavigation()
  const [category, setCategory] = useState(false)

  console.log(category)

  useEffect(() => {
    fetch(`https://savvie.herokuapp.com/categories/${id}`)
      .then(res => res.json())
      .then(data => setCategory(data))
  }, [])

  if (!category) return <LoadingScreen />

  return (
    <View className='flex-1'>

      <View className='bg-red-300 h-[270] justify-center items-center'>
        <View className='bg-blue-400 h-[150] w-[340] mt-[60] rounded-2xl'>
          <Image
            className='h-full w-full rounded-2xl'
            source={{ uri: category?.imageUrl }} />
        </View>
      </View>

      <TouchableOpacity className='h-[200] bg-blue-300'
        onPress={() => navigation.navigate("Test Detail Resto", {
          id: category?.Food?.RestaurantId
        })}
      >
        <Image source={{ uri: category?.Food?.imageUrl }} className='h-[200] w-[200]' />
      </TouchableOpacity>

      {/* <FoodList foodFromCategory={}/> */}

      <View />
    </View>
  )
}

export default CategoryScreen