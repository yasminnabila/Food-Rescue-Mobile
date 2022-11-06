import { Button, SafeAreaView, ScrollView, Text, useWindowDimensions, View } from "react-native";
import { DetailsHeaderScrollView, StickyHeaderScrollView } from 'react-native-sticky-parallax-header'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { useSelector, useDispatch } from 'react-redux'
import { dec_basket, inc_basket, addBasket } from "../store/slices/userSlice";

const HistoryScreen = () => {

  const dispatch = useDispatch()
  const basket = useSelector(state => state.user.basket)
  console.log(basket)
  return (
    <StickyHeaderScrollView>



      {
        basket.map((el, i) => {
          return (
            <View className='flex-1 justify-center items-center mt-10'>
              <Text>
                {el.name} - {el.qty}
              </Text>
              <Button title="inc" onPress={() => dispatch(inc_basket(i))} />
              <Button title="dec" onPress={() => dispatch(dec_basket(i))} />
            </View>
          )
        })
      }

      <Button title="add to cart" onPress={() => dispatch(addBasket({ id: 4, name: "ale-ale", qty: 1 }))} />


    </StickyHeaderScrollView>
  )
}

export default HistoryScreen