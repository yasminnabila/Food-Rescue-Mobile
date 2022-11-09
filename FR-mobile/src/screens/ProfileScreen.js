import { Text, TouchableOpacity, View } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux'
import { clearUser, getUserData, selectUserData, setIsLogin, topUp, setDestination } from "../store/slices/userSlice";
import { Modalize, useModalize } from "react-native-modalize";
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { currencyFormat } from 'simple-currency-format';
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import { useEffect, useState, useRef } from "react";
import Geocoder from "react-native-geocoding";




  
  
  
  const ProfileScreen = () => {
  const userData = useSelector(selectUserData)
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [latlong, setLatlong] = useState("waiting....");
  const [location, setLocation] = useState("Waiting...");
  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      // clear error
      console.log(e);
    }
    console.log('Done.')
  }

  // console.log(userData)

  const { ref, open, close } = useModalize();

  const [price, setPrice] = useState(0);


  function topUpHandler() {
    // console.log(typeof (+price.split('.').join("")))
    dispatch(topUp(+price.split('.').join("")))
    close()
    setPrice('')
  }

  function logOutHandler() {
    clearAll()
    dispatch(clearUser())
    dispatch(setIsLogin(false))

    console.log("Done.");
  };
  useEffect(() => {
    (async () => {
      let { coords } = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = coords;
      setLatlong({ lat: latitude, lng: longitude });
      Geocoder.init("AIzaSyAw99RzBxkw-upCWfK5gVURlEMRzTn3pOI", {
        language: "id",
      });
      Geocoder.from(latitude, longitude)
        .then((json) => {
          let address = json.results[0];
          setLocation(address.formatted_address);
        })
        .catch((error) => console.warn(error));
    })();
  }, []);
  function logOutHandler() {
    clearAll();
    dispatch(setIsLogin(false));
  }

  useEffect(() => {
    dispatch(getUserData())
  }, [userData])


  return (
    <View className='flex-1'>

      <View className='h-[470] bg-red-200'>

        {/* IMAGE */}
        <View className='bg-yellow-200 mt-[100] justify-center items-center'>
          <View className='h-[150] w-[150] rounded-full border-4 border-red-400'>
            {/* ISI IMAGE DI SINI */}
          </View>
        </View>
        {/* IMAGE */}

        {/* NAME */}
        <View className='bg-blue-300 items-center mt-5'>
          <Text className='text-2xl font-semibold'>
            {userData.fullName}
          </Text>
          <Text className='mt-1'>
            {userData.email}
          </Text>
          <Text className='mt-1'>
            {userData.phoneNumber}
          </Text>
        </View>
        {/* NAME */}

        <View className='flex-row justify-center space-x-4 mt-4'>

          <View className='h-[90] w-[170] rounded-3xl items-center justify-center border border-green-700'>
            <Text className='font-semibold'>
              Kamu menyelamatkan
            </Text>
            <Text className='mt-1'>
              0 Makanan
            </Text>
          </View>

          <View className='h-[90] w-[170] rounded-3xl items-center justify-center border border-green-700'>
            <Text className='font-semibold'>
              Total penghematan
            </Text>
            <Text className='mt-1'>
              Rp.
            </Text>
          </View>

        </View>
      </View>

      <View className='bg-gray-300 h-2'>

      </View>

      <View className='h-[100] bg-green-300 items-center flex-row justify-between'>
        <View className='ml-4'>
          <Text className='text-3xl'>
            Savvie pay
          </Text>
          <Text className='text-2xl'>
            {currencyFormat(userData?.Balance?.balance, "id-ID", "IDR")}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => open()}
          className='h-[50] bg-red-400 w-[100] rounded-3xl items-center justify-center mr-4'>
          <Text>
            TOP UP
          </Text>

        </TouchableOpacity>
      </View>

      <TouchableOpacity className='bg-red-200 mt-10 mx-10 h-10 items-center justify-center rounded-md' onPress={()=>{
        navigation.navigate("storeDashboard")
      }}>
        <Text>Store Dashboard</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-red-200 mt-10 mx-10 h-10"
        onPress={logOutHandler}
      >
        <Text>LogOut</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("TrackKurir");
          dispatch(
            setDestination({
              location: latlong,
              description: location,
            })
          );
        }}
      >
        <View className="mt-[90%] items-center bg-black p-3 mx-20 rounded-3xl">
          <Text className="text-white font-bold">Deliver it</Text>
        </View>
      </TouchableOpacity>

      {/* currencyFormat(totalPrice, "id-ID", "IDR") */}


      <Modalize
        modalHeight={400}
        ref={ref}
      >
        <View className='mt-4 mx-1 h-[80]'>
          <FloatingLabelInput
            label="Top up"
            value={price}
            maskType="currency"
            currencyDivider="." // which generates: 9.999.999,99 or 0,99 ...
            keyboardType="numeric"
            onChangeText={value => setPrice(value)}
            inputStyles={{
              fontSize: 30
            }}
            customLabelStyles={{
              fontSizeBlurred: 30,
              fontSizeFocused: 15
            }}
          />
        </View>

        <TouchableOpacity
          onPress={() => topUpHandler()}
          className='bg-gray-500 h-[70] w-[300] self-center mt-3 rounded-2xl items-center justify-center'>
          <Text className='text-lg text-red'>
            Continue Payment
          </Text>
        </TouchableOpacity>

      </Modalize>
    </View >
  )
}
  


export default ProfileScreen;
