import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { clearBasket, setIsPaid } from '../store/slices/userSlice';


const Success = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  useEffect(() => {
    setTimeout(() => {
      dispatch(setIsPaid(false))
      dispatch(clearBasket())
      navigation.navigate("Track")
    }, 3000)
  }, [])

  return (

    <View className='flex-1 items-center justify-center bg-white'>

      <LottieView source={require('../lottie/success.json')} autoPlay />

    </View>

  )
}

export default Success