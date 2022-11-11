import MapView, { Marker } from "react-native-maps";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectOrigin, setOrigin } from "../store/slices/userSlice";
import Geocoder from "react-native-geocoding";

const AddressMap = () => {
  const origin = useSelector(selectOrigin);
  const [pin, setPin] = useState({
    latitude: origin.location.lat,
    longitude: origin.location.lng,
  });
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  const [latLong, setLatLong] = useState({})
  console.log(latLong, "MAKANKANKAKKKAKAKA");
  useEffect(() => {
    if (!origin) return;
    mapRef.current.fitToSuppliedMarkers(["origin"], {
      edgePadding: { top: 50, right: 50, left: 50, bottom: 50 },
    });
  }, [origin]);
  useEffect(() => {
    (async () => {
      Geocoder.init("AIzaSyAw99RzBxkw-upCWfK5gVURlEMRzTn3pOI", {
        language: "id",
      });
      Geocoder.from(latLong.lat, latLong.lng)
        .then((json) => {
          let address = json.results[0];
          dispatch(
            setOrigin({
              location: latLong,
              description: address.formatted_address,
            })
          );
        })
        .catch((error) => console.warn(error));
    })();
  }, [latLong]);

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
      {origin?.location && (
        <Marker
          draggable={true}
          coordinate={pin}
          title="Origin"
          description={origin.description}
          identifier="origin"
          onDragStart={(e) => {
            console.log("drag start", e.nativeEvent.coordinate);
          }}
          onDragEnd={(e) => {
            console.log("drag end", e.nativeEvent.coordinate);
            setLatLong({
              lat: e.nativeEvent.coordinate.latitude,
              lng: e.nativeEvent.coordinate.longitude,
            })
          }}
          image={require("../../assets/images/greenMarker.png")}
        />
      )}
    </MapView>
  );
};

export default AddressMap;
