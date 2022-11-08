import { Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setDestination, setIsLogin } from "../store/slices/userSlice";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import Geocoder from "react-native-geocoding";

const ProfileScreen = () => {
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
  return (
    <View>
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
    </View>
  );
};

export default ProfileScreen;
