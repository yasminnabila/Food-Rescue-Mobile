import { View, Text } from "react-native";
import MapViewDirections from "react-native-maps-directions";
import MapView, { Marker } from "react-native-maps";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDestination,
  selectOrigin,
  setDestination,
  setTravelTimeInformation,
} from "../store/slices/userSlice";
import { GOOGLE_MAPS_APIKEY } from "@env";
import socket from "../config/socket";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";

const TrackScreen = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  useEffect(() => {
    socket.emit("create-room", "makan");
    socket.on("locationDriver", (data) => {
      console.log(data, "Sockettt");
      dispatch(
        setDestination({
          location: data,
          description: "sembarang dulu",
        })
      );
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  useEffect(() => {
    if (!origin || !destination) return;
    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 50, right: 50, left: 50, bottom: 50 },
    });
  }, [origin, destination]);
  return (
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
      {/* <View className="bg-white mt-[120%] flex flex-row mx-1 p-5 items-center border-2 border-green-600 rounded-sm ">
        <View className="border-r h-[40] justify-center mr-1 pr-2">
          <MaterialIcons name="delivery-dining" size={24} color="black" />
        </View>
        <View className="ml-2">
          <Text className="text-xl font-medium text-black">
            Delivering to your door
          </Text>
          <Text className="text-black">arrived in 20 menit</Text>
        </View>
      </View> */}
      <View className="bg-white mt-[16%] flex flex-row mx-20 p-2 items-center shadow-lg rounded-3xl">
        <View className="border-r h-[30] justify-center mr-1 pr-2">
          <MaterialIcons name="delivery-dining" size={24} color="black" />
        </View>
        <View className="ml-2">
          <Text className="font-medium text-black">
            Delivering to your door
          </Text>
          <Text className="text-gray-700 text-xs">arrived in 20 mins</Text>
        </View>
      </View>
      {origin && destination && (
        <>
          <MapViewDirections
            origin={{
              latitude: origin.location.lat,
              longitude: origin.location.lng,
            }}
            destination={{
              latitude: destination?.location.lat,
              longitude: destination?.location.lng,
            }}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={5}
            optimizeWaypoints={true}
            strokeColor="hotpink"
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
          image={require("../../assets/images/greenMarker.png")}
        />
      )}
      {destination && (
        <Marker
          coordinate={{
            latitude: destination?.location.lat,
            longitude: destination?.location.lng,
          }}
          title="Destination"
          description={destination.description}
          identifier="destination"
          image={require("../../assets/images/bike2.png")}
        />
      )}
    </MapView>
  );
};

export default TrackScreen;
