import { Text, View } from "react-native"
import * as Animatable from 'react-native-animatable';

import LottieView from 'lottie-react-native';



const LoadingScreen = () => {

  return (
    <View className='flex-1 items-center justify-center bg-white'>
      {/* 
      <Animatable.Text animation="slideInDown" direction="alternate" iterationCount='infinite'>Up and down you go</Animatable.Text>
      <Animatable.Text
        animation="pulse" easing="ease-in-back" iterationCount="infinite" className='text-2xl'>❤️
      </Animatable.Text> 
      */}
      <LottieView source={require('../lottie/loading2.json')} autoPlay loop />

    </View>
  )
}

export default LoadingScreen