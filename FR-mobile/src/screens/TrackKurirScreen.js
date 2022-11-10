import MapViewDirections from "react-native-maps-directions";
import MapView, { Marker } from "react-native-maps";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../config/socket";
import {
  selectDestination,
  selectOrigin,
  selectUserLocation,
} from "../store/slices/userSlice";
import { GOOGLE_MAPS_APIKEY } from "@env";
import * as Location from "expo-location";

const TrackKurirScreen = () => {
  const userLocation = useSelector(selectUserLocation);
  const origin = useSelector(selectOrigin);
  console.log(userLocation, "VVVVVVVVV", origin);
  const destination = useSelector(selectDestination);
  const dispatch = useDispatch();
  const mapRef = useRef(null);
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
    if (origin) {
      console.log(origin);
      let interval = setInterval(() => {
        _getLocationAsync();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, []);
  useEffect(() => {
    if (!userLocation || !origin) return;
    mapRef.current.fitToSuppliedMarkers(["userLocation", "destination"], {
      edgePadding: { top: 50, right: 50, left: 50, bottom: 50 },
    });
  }, [userLocation, origin]);
  // useEffect(() => {
  //   if (!origin || !destination) return;
  //   const getTravelTime = async () => {
  //     fetch(
  //       `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`
  //     )
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data, "<-------DATA KANG");
  //         dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
  //       });
  //   };
  //   getTravelTime();
  // }, [origin, destination, GOOGLE_MAPS_APIKEY]);

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
      {userLocation && origin && (
        <>
          {/* <View className="bg-white mt-[16%] flex flex-row mx-7 p-3 items-center border-2 border-green-600 rounded-sm">
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
          <MapViewDirections
            origin={{
              latitude: origin?.location.lat,
              longitude: origin?.location.lng,
            }}
            destination={{
              latitude: "-6.2608206",
              longitude: "106.7770521",
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
          image={require("../../assets/images/bike.png")}
        />
      )}
      {userLocation && (
        <Marker
          coordinate={{
            latitude: "-6.2608206",
            longitude: "106.7770521",
          }}
          title="Destination"
          description={userLocation.description}
          identifier="destination"
          image={require("../../assets/images/greenMarker.png")}
        />
      )}
    </MapView>
  );
};

export default TrackKurirScreen;
