import { View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import tw from "twrnc";
import AddressMap from "../components/AddressMap";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectOrigin } from "../store/slices/userSlice";
import Geocoder from "react-native-geocoding";
import { useState, useEffect } from "react";

const AddressScreen = () => {
  const origin = useSelector(selectOrigin);
  const [address, setAddress] = useState({
    name: "",
    street: "",
  });
  const [location, setLocation] = useState("Waiting...");
  useEffect(() => {
    Geocoder.init("AIzaSyAw99RzBxkw-upCWfK5gVURlEMRzTn3pOI", {
      language: "id",
    });
    Geocoder.from(origin.location.lat, origin.location.lng)
      .then((json) => {
        let address = json.results[0];
        console.log(address, "XXXX");
        setLocation(address.formatted_address);
        setAddress({
          name: address.address_components[1].short_name,
          street: address.address_components[0].short_name,
        });
      })
      .catch((error) => console.warn(error));
  }, []);
  const navigation = useNavigation();
  return (
    <View>
      <View style={tw`h-full`}>
        <AddressMap />
        <View className="mr-2">
          <View style={tw`flex flex-row h-[20] justify-between m-4`}>
            <View>
              <Text style={tw`text-xl mb-3 font-medium`}>
                {address.name}, {address.street}
              </Text>
              <Text style={tw`opacity-60 text-xs`}>{location}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Test1");
              }}
            >
              <AntDesign name="close" size={24} color="gray" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Test1");
            }}
          >
            <View style={tw`mb-4 mt-2 bg-black p-4 rounded-3xl mx-5`}>
              <Text style={tw`text-white font-bold text-center`}>
                Confirmation
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AddressScreen;
