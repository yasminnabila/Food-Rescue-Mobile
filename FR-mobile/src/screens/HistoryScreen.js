import React, { useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Modalize, useModalize } from 'react-native-modalize';

const HistoryScreen = () => {

  // const dispatch = useDispatch()
  const modalizeRef = useRef(null);
  const { ref, open, close } = useModalize();


  const onOpen = () => {
    modalizeRef.current?.open();
  };

  return (
    <GestureHandlerRootView className='flex-1 justify-center items-center'>

      {/* content */}
      <View
        className='h-[80] w-[350] justify-between rounded-xl flex-row items-center border-2 border-gray-300'
      >
        <View className='flex-row space-x-2 items-center ml-3'>
          <View className='h-[60] bg-yellow-600 w-[60] rounded-full'>
            {/* <Text>test</Text> */}
          </View>
          <View>
            <Text className='text-base font-semibold'>PickUp</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => open('dest')}
          className='h-[40] w-[95] mr-3 border-2 border-green-600 rounded-3xl items-center justify-center'>
          <Text className='text-base font-semibold'>
            Change
          </Text>
        </TouchableOpacity>

      </View>

      <Modalize
        childrenStyle={{ flex: 1 }}
        modalHeight={200}
        ref={ref}
      >
        <Text className='mt-7 text-2xl font-bold ml-3'>
          Select order type
        </Text>

        <View className='h-[60] flex-row justify-between mt-2 mx-2'>

          <View className='flex-row space-x-2 items-center ml-3'>
            <View className='h-[50] bg-yellow-600 w-[50] rounded-full'>

            </View>
            <View>
              <Text className='text-base font-semibold'>Delivery</Text>
            </View>
          </View>

          <TouchableOpacity className='h-[30] w-[30] mr-3 rounded-full border-2 border-gray self-center'>

          </TouchableOpacity>

        </View>
        <View className='h-[60] flex-row justify-between mt-2 border-t border-gray-200 mx-2'>

          <View className='flex-row space-x-2 items-center ml-3'>
            <View className='h-[50] bg-yellow-600 w-[50] rounded-full'>

            </View>
            <View>
              <Text className='text-base font-semibold'>PickUp</Text>
            </View>
          </View>

          <TouchableOpacity className='h-[30] w-[30] mr-3 rounded-full border-2 border-gray self-center'>

          </TouchableOpacity>

        </View>



      </Modalize>

    </GestureHandlerRootView>

  )
}

export default HistoryScreen