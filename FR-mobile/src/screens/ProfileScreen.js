import { Text, TouchableOpacity, View } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux'
import { setIsLogin } from "../store/slices/userSlice";
const ProfileScreen = () => {

  const dispatch = useDispatch()

  const clearAll = async () => {
    try {
      await AsyncStorage.clear()
    } catch (e) {
      // clear error
      console.log(e)
    }

    console.log('Done.')
  }

  function logOutHandler() {
    clearAll()
    dispatch(setIsLogin(false))
  }
  return (
    <View>

      <TouchableOpacity className='bg-red-200 mt-10 mx-10 h-10'
        onPress={logOutHandler}
      >
        <Text>
          LogOut
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default ProfileScreen