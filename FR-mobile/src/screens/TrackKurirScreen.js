import MapViewDirections from "react-native-maps-directions";
import MapView, { Marker } from "react-native-maps";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../config/socket";
import {
  selectDestination,
  selectOrigin,
  selectUserLocation,
} from "../store/slices/userSlice";
import * as Location from "expo-location";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const TrackKurirScreen = () => {
  const userLocation = useSelector(selectUserLocation);
  const origin = useSelector(selectOrigin);
  console.log(userLocation, "VVVVVVVVV", origin);
  const destination = useSelector(selectDestination);
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  const navigation = useNavigation()
  const [interval, setInterval] = useState()
  useEffect(() => {
    socket.emit("create-room", "makan");
  }, []);
  useEffect(() => {
    const _getLocationAsync = async () => {
      await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 5000,
        },
        (loc) => {
          console.log(loc, "<><><>><>loc interval");
          let data = {
            lat: loc.coords.latitude,
            lng: loc.coords.longitude,
          };
          socket.emit("location", { data, id: "makan" });
        }
      );
    };
    console.log(origin);
    setInterval(setInterval(() => {
      _getLocationAsync();
    }, 5000));

  }, []);
  useEffect(() => {
    if (!origin) return;
    mapRef.current.fitToSuppliedMarkers(["userLocation", "destination"], {
      edgePadding: { top: 50, right: 50, left: 50, bottom: 50 },
    });
  }, [userLocation]);
  // useEffect(() => {
  //   if (!origin || !destination) return;
  //   const getTravelTime = async () => {
  //     fetch(
  //       `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${"AIzaSyBsZhvFmRckxNCDiMhcWioVP126-G9onCc"}`
  //     )
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data, "<-------DATA KANG");
  //         dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
  //       });
  //   };
  //   getTravelTime();
  // }, [origin, destination, "AIzaSyBsZhvFmRckxNCDiMhcWioVP126-G9onCc"]);

  // useEffect(() => {
  //   (async () => {
  //     let { coords } = await Location.getCurrentPositionAsync({});
  //     if (destination) {
  //       let interval = setInterval(() => {
  //         socket.emit("location", {
  //           lat: coords.latitude,
  //           lng: coords.longitude,
  //         });
  //       }, 10000);
  //       return () => clearInterval(interval);
  //     }
  //   })();
  // },[]);

  return (
    <>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        mapType="mutedStandard"
        initialRegion={{
          latitude: origin.location.lat,
          longitude: origin.location.lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        showsUserLocation={true}
      >
        <View className="bg-white h-[50] w-[230] absolute top-[70] inset-x-0 flex flex-row mx-20 p-2 items-center shadow-lg rounded-3xl">
          <View className="border-r h-[30] justify-center mr-1 pr-2 absolute top-2 left-2">
            <MaterialIcons name="delivery-dining" size={24} color="black" />
          </View>
          <View className="ml-2 absolute inset-x-0 top-2 left-[45]">
            <Text className="font-medium text-black absolute top-0">
              On The Way
            </Text>
            <Text className="text-gray-700 text-xs top-4">arrived in 20 mins</Text>
          </View>
        </View>
        {/* <View className="justify-center, items-center bg-[#77AA9C] h-[34] w-[70] absolute top-[90%] inset-x-0 p-2 shadow-emerald-xl rounded-3xl ml-[70%]">
          <TouchableOpacity onPress={() => { clearInterval(interval); navigation.navigate("Profile") }} >
            <Text className="font-bold text-white" >Done</Text>
          </TouchableOpacity>
        </View> */}
        {userLocation && origin && (
          <>
            {/* <View className="bg-white mt-[16%] flex flex-row mx-7 p-3 items-center border-2 border-green-600 rounded-sm">
            <View className="border-r h-[40] justify-center mr-1 pr-2">
              <MaterialIcons name="delivery-dining" size={24} color="black" />
            </View>
            <View className="ml-2">
              <Text className="text-xl font-medium text-black">
                ON THE WAY
              </Text>
              <Text className="text-black">arrived in 20 menit</Text>
            </View>
          </View> */}
            <MapViewDirections
              origin={{
                latitude: origin?.location.lat,
                longitude: origin?.location.lng,
              }}
              destination={{
                latitude: "-6.2706229",
                longitude: "106.7798747",
              }}
              apikey={"AIzaSyBsZhvFmRckxNCDiMhcWioVP126-G9onCc"}
              strokeWidth={6}
              optimizeWaypoints={true}
              strokeColor="black"
            />
          </>
        )}
        {origin?.location && (
          <Marker
            draggable={true}
            coordinate={{
              latitude: origin.location.lat,
              longitude: origin.location.lng,
            }}
            title="Origin"
            description={origin.description}
            identifier="origin"
            image={require("../../assets/images/bike2.png")}
          />
        )}
        {userLocation && (
          <Marker
            coordinate={{
              latitude: "-6.2706229",
              longitude: "106.7798747",
            }}
            title="Destination"
            description={userLocation.description}
            identifier="destination"
            image={require("../../assets/images/greenMarker.png")}
          />
        )}
      </MapView>
      <View className='h-[100] w-full justify-center'>
        <TouchableOpacity onPress={() => { clearInterval(interval); navigation.navigate("Profile") }} className='mx-5 h-[60] bg-[#77aa9c] rounded-3xl justify-center items-center'>
          <Text className='text-2xl font-bold text-white'>
            Done
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default TrackKurirScreen;
