import { Text, View } from "react-native"
import * as Animatable from 'react-native-animatable';


const TrackScreen = () => {

  return (
    <View className='flex-1 items-center justify-center '>
      <Animatable.Text animation="slideInDown" direction="alternate" iterationCount='infinite'>Up and down you go</Animatable.Text>
      <Animatable.Text
        animation="pulse" easing="ease-in-back" iterationCount="infinite" className='text-2xl'>❤️</Animatable.Text>
    </View>
  )
}

export default TrackScreen