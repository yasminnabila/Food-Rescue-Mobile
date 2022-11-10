import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import {
  selectOrigin,
  setDestination,
  setOrigin,
  setUserCurrentLocation,
} from "../store/slices/userSlice";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";


const LocationSrceen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [latlong, setLatlong] = useState("waiting....");
  const [location, setLocation] = useState("Waiting...");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let { coords } = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = coords;
      setLatlong({ lat: latitude, lng: longitude });
      console.log(coords, "<><><><><><>");
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
  return (
    <View className="mx-5">
      <View className="h-[70] mt-[40] flex-row items-center">
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Test1");
          }}
        >
          <AntDesign name="left" size={24} color="gray" />
        </TouchableOpacity>
        <Text className="ml-[19%] font-bold text-xl">Set Your Location</Text>
      </View>
      <GooglePlacesAutocomplete
        placeholder="Enter destination address?"
        onPress={(data, details = null) => {
          dispatch(
            setOrigin({
              location: details.geometry.location,
              description: data.description,
            })
          );
          dispatch(setUserCurrentLocation({ location: details.geometry.location }))
          navigation.navigate("AddressScreen");
        }}
        styles={toInputBoxStyles}
        fetchDetails={true}
        returnKeyType={"search"}
        enablePoweredByContainer={false}
        minLength={2}
        query={{
          key: "AIzaSyBsZhvFmRckxNCDiMhcWioVP126-G9onCc",
          language: "id",
        }}
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={400}
      />
      <TouchableOpacity
        onPress={() => {
          dispatch(
            setOrigin({
              location: latlong,
              description: location,
            })
          );
          navigation.navigate("AddressScreen");
        }}
      >
        <View className="flex-row items-center pt-3">
          <MaterialIcons name="gps-fixed" size={24} color="black" />
          <Text>Your Location</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default LocationSrceen;

const toInputBoxStyles = StyleSheet.create({
  container: {
    flex: 0,
  },
  textInput: {
    backgroundColor: "#DDDDDF",
    borderRadius: 30,
    fontSize: 16,
  },
  textInputContainer: {
    paddingBottom: 0,
  },
});
