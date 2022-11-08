import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Modalize, useModalize } from 'react-native-modalize';

import { FloatingLabelInput } from 'react-native-floating-label-input';
import { useDispatch } from 'react-redux';

const HistoryScreen = () => {

  const dispatch = useDispatch()

  const modalizeRef = useRef(null);

  const { ref, open, close } = useModalize();

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const [topUp, setTop] = useState()

  console.log(topUp)


  return (
    <View className='flex-1'>


      <View className='h-[300] bg-red-400'>

      </View>

      <View style={{ backgroundColor: '#fff' }}>
        <FloatingLabelInput
          label={'Savvie Pay'}
          value={topUp}
          onChangeText={value => setTop(value)}
        />
      </View>


      <Modalize
        modalHeight={490}
        ref={ref}
      >


        <View className='bg-red-300 h-[220] w-[340] rounded-3xl mt-10 self-center'>

        </View>



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

    </View>

  )
}

export default HistoryScreen