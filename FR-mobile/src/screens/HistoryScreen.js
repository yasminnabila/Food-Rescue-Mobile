import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Modalize, useModalize } from 'react-native-modalize';

import { FloatingLabelInput } from 'react-native-floating-label-input';
import { useNavigation } from '@react-navigation/native';

const HistoryScreen = () => {

  const navigation = useNavigation()

  // const dispatch = useDispatch()
  const modalizeRef = useRef(null);
  const { ref, open, close } = useModalize();

  const [test, setTest] = useState([])

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const basketCheck = () => {
    test.length == 0 && open()
  }

  // useEffect(() => {
  //   basketCheck()
  // }, [test])

  return (
    <GestureHandlerRootView className='flex-1 justify-center items bg-center'>

      <TouchableOpacity
        onPress={() => navigation.navigate("screen 2")}
        className='h-[100] bg-red-200'>
        <Text>
          screen 1
        </Text>
      </TouchableOpacity>


      {/* MODAL REGISTER */}
      <Modalize
        modalHeight={490}
        ref={ref}
      >
        {/* ICON / PNG */}
        <View className='bg-red-300 h-[220] w-[340] rounded-3xl mt-10 self-center'>

        </View>
        {/* ICON / PNG */}
        <View className='self-center mt-2'>
          <Text className='text-2xl text-center font-bold tracking-normal w-[300]'>
            Want to order from this resto instead?
          </Text>
        </View>
        <View className='self-center mt-2'>
          <Text className='text-base text-center font-normal tracking-normal mx-6'>
            Sure thing, but we'll need to clear the items in your current cart from the previous resto first.
          </Text>
        </View>
        <View className='flex-row space-x-5 items-center justify-center mt-5'>
          <TouchableOpacity className='border-2 border-green-300 h-[55] w-[170] rounded-3xl items-center justify-center'>
            <Text className='text-lg font-semibold'>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className='bg-yellow-300 h-[55] w-[170] rounded-3xl items-center justify-center'>
            <Text className='text-lg font-semibold'>
              Yes, go ahead
            </Text>
          </TouchableOpacity>
        </View>
      </Modalize>
      {/* MODAL REGISTER */}

    </GestureHandlerRootView>
  )
}

export default HistoryScreen