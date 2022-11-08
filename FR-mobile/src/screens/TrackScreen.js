import { View, Text } from "react-native";
import MapViewDirections from "react-native-maps-directions";
import MapView, { Marker } from "react-native-maps";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import {
  selectDestination,
  selectOrigin,
  setDestination,
  setTravelTimeInformation,
} from "../store/slices/userSlice";
import { GOOGLE_MAPS_APIKEY } from "@env";
import * as Location from "expo-location";

const TrackScreen = () => {
  const socket = io("http://localhost:3000/");
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  // const [pin, setPin] = useState({
  //   latitude: origin?.location.lat,
  //   longitude: origin?.location.lng,
  // });
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);
  useEffect(() => {
    socket.on("location:received:raven", (data) => {
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
  });
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  useEffect(() => {
    const _getLocationAsync = async () => {
      await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 5000,
          distanceInterval: 1,
        },
        (loc) => {
          socket.emit("location", {
            lat: loc.coords.latitude,
            lng: loc.coords.longitude,
          });
        }
      );
    };
    if (destination) {
      let interval = setInterval(() => {
        _getLocationAsync();
      }, 5000);
      return () => clearInterval(interval);
    }
  });
  useEffect(() => {
    if (!origin || !destination) return;
    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 50, right: 50, left: 50, bottom: 50 },
    });
  }, [origin, destination]);
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
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       setErrorMsg("Permission to access location was denied");
  //       return;
  //     }
  //     let { coords } = await Location.getCurrentPositionAsync({});
  //     console.log(coords, "ZZZZZZZZZ");
  //     setPin({
  //       latitude: coords.latitude,
  //       longitude: coords.longitude,
  //     });
  //   })();
  // }, []);

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
      {origin && destination && (
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
