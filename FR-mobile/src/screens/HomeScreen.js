import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import * as Animatable from "react-native-animatable";
import { getUserData, selectUser, selectUserLocation, setUser } from "../store/slices/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import FoodCard from "../components/FoodCard";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import Geocoder from "react-native-geocoding";
import { useDispatch, useSelector } from "react-redux";
import { setOrigin, setDestination, setUserLocation } from "../store/slices/userSlice";

const HomeScreen = () => {
  const [location, setLocation] = useState("Waiting...");
  const userLocation = useSelector(selectUserLocation)
  const [errorMsg, setErrorMsg] = useState("");
  const [latlong, setLatlong] = useState("waiting....");
  const stickyHeaderShown = useRef(false);
  const mainHeaderRef = useRef();
  const stickyHeaderRef = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let { coords } = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = coords;
      Geocoder.init("AIzaSyAw99RzBxkw-upCWfK5gVURlEMRzTn3pOI", {
        language: "id",
      });
      Geocoder.from(latitude, longitude)
        .then((json) => {
          let address = json.results[0];
          dispatch(
            setUserLocation({
              location: { lat: latitude, lng: longitude },
              description: address.formatted_address,
            })
            );
          setLocation(userLocation.description.slice(0, 50) + "...");
          dispatch(setDestination(null));
        })
        .catch((error) => console.warn(error));
    })();
  }, []);
  const navigation = useNavigation();

  const user = useSelector(selectUser);

  const [scrollY, setSrollY] = useState(0);

  const [showStickyHead, setShowStickyHead] = useState(false);
  const [mainAnimation, setMainAnimation] = useState("slideInDown");
  const [secondAnimation, setSecondAnimation] = useState("slideInDown");

  const [categories, setCategories] = useState();

  console.log("=========================");
  // {
  //   categories.forEach((el) => {
  //     console.log(el.name)
  //   })
  // }
  console.log("=========================");

  const foodList = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
  ];

  useEffect(() => {
    fetch("https://savvie.herokuapp.com/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  useEffect(() => {
    dispatch(getUserData());
  }, []);

  console.log("=========================");
  // {
  //   categories.forEach((el) => {
  //     console.log(el.name)
  //   })
  // }
  console.log(user.access_token, "<<<<<<<<<<<<<");
  console.log("=========================");
  return (
    <>
      <View className="flex-1 ">
        <ScrollView
          stickyHeaderIndices={showStickyHead && [0]}
          scrollEventThrottle={16}
          onScroll={(evt) => {
            // console.log(evt.nativeEvent.contentOffset)
            const { y } = evt.nativeEvent.contentOffset;
            if (y >= 105 && !stickyHeaderShown.current) {
              stickyHeaderShown.current = true;
              // mainHeaderRef.current.transitionTo({ opacity: 0 })
              // stickyHeaderRef.current.transitionTo({ opacity: 1 })

              setShowStickyHead(true);
              setMainAnimation("slideOutUp");
              setSecondAnimation("slideInDown");
            } else if (y <= 105 && stickyHeaderShown.current) {
              stickyHeaderShown.current = false;
              setShowStickyHead(false);
              setMainAnimation("slideInDown");
              setSecondAnimation("slideOutUp");

              // mainHeaderRef.current.transitionTo({ opacity: 1 })
              // stickyHeaderRef.current.transitionTo({ opacity: 0 })
            }
          }}
        >
          {/* HEADERS */}

          {!showStickyHead && (
            <Animatable.View
              animation={mainAnimation}
              className="bg-red-200 h-[170] rounded-b-3xl"
            >
              <View className="h-[70] mt-[40] mr-2 flex-row justify-between items-center">
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("LocationSrceen");
                  }}
                >
                  <View className="gap-y-1">
                    <View className="ml-1 flex-row items-center">
                      <Entypo name="location-pin" size={17} color="black" />
                      <Text className="text-sm">Your Location</Text>
                    </View>
                    <Text className="ml-2">{location}</Text>
                  </View>
                </TouchableOpacity>
                <AntDesign name="heart" size={24} color="red" />
              </View>

              <Text className="text-xl self-center absolute bottom-7">
                Hi (name user)!
              </Text>

              <Pressable
                className="bg-gray-100 border border-gray-400 h-[50] absolute top-[143] w-[85%] self-center rounded-3xl items-start justify-center"
                onPress={() => navigation.navigate("Search")}
              >
                <Text className="text-lg ml-4 text-gray-600">
                  What would you like to eat?
                </Text>
              </Pressable>
            </Animatable.View>
          )}

          {/* END HEADERS */}

          {showStickyHead && (
            <Animatable.View
              animation={secondAnimation}
              duration={1000}
              className="h-[130] bg-green-200 mb-[10] "
            >
              <Text>Bounce me!</Text>
            </Animatable.View>
          )}

          {/* CAROUSEL */}
          <View className="bg-blue-200 h-[200] mt-[50]">
            <Text className="text-2xl m-auto">
              CAROUSEL {showStickyHead ? "muncul" : "tidak"}
            </Text>
          </View>
          {/* END CAROUSEL */}

          {/* CATEGORY */}
          <View className="bg-green-300 h-[200] mt-4 py-2">
            <View className="flex-row justify-between">
              <Text className="bg-red-300 text-2xl mt-1 ml-5">CATEGORY</Text>
              <Text className="bg-red-300 text-lg mt-1 mr-2">View all</Text>
            </View>

            <ScrollView
              className="bg-yellow-200"
              horizontal
              showsHorizontalScrollIndicator="false"
            >
              {categories?.map((el) => {
                return (
                  <Pressable
                    className="bg-gray-200 w-[80] h-[80] mt-[20] mx-3 rounded-3xl"
                    onPress={() =>
                      navigation.navigate("Category", {
                        id: el.id,
                      })
                    }
                  >
                    <Image
                      source={{
                        uri: el.imageUrl,
                      }}
                      className="h-full w-full rounded-2xl"
                      resizeMode="cover"
                    />
                    <Text className="self-center mt-3 text-xs font-semibold text-center">
                      {el.name}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
          {/* END CATEGORY */}

          {/* NEAR ME */}
          <View className="h-[300] bg-green-300 mt-4 ">
            {/* TITLE */}
            <Text className="bg-red-300 text-2xl mt-1 ml-5">NEAR ME</Text>
            {/* END TITLE */}

            <FlatList
              data={foodList}
              renderItem={({ item }) => {
                return <FoodCard food={item} />;
              }}
              keyExtractor={(item) => item.id}
              className="bg-slate-300"
              horizontal
              showsHorizontalScrollIndicator="false"
            />

            {/* <ScrollView className='bg-slate-300' horizontal showsHorizontalScrollIndicator='false'>
     
                <View className='bg-red-200 w-[150] h-[220] ml-3 rounded-2xl self-center'>
     
                  <View className='bg-white h-[50%] rounded-t-2xl'>
     
     
     
                    <View className='bg-black w-[40] h-[20]'>
     
     
                    </View>
     
                  </View>
     
                  <View className='bg-green-200 w-[45] h-[45] rounded-full top-[-20] left-1'>
     
     
                  </View>
     
     
                </View>
     
     
              </ScrollView> */}
          </View>
          {/* END NEARME */}

          {/* Resto terdekat */}
          <View className="bg-green-300 h-[200] mt-4 py-2">
            <Text className="bg-red-300 text-2xl mt-1 ml-5">
              Resto terdekat
            </Text>

            <ScrollView
              className="bg-yellow-200 "
              horizontal
              showsHorizontalScrollIndicator="false"
            >
              <View className="items-center justify-center bg-blue-400 ml-5">
                <View className="bg-gray-200 w-[100] h-[100] rounded-full"></View>
                <Text className="mt-2">Pak gembus</Text>
              </View>

              <View className="items-center justify-center bg-blue-400 ml-5">
                <View className="bg-gray-200 w-[100] h-[100] rounded-full"></View>
                <Text>NAMA RESTO</Text>
              </View>

              <View className="items-center justify-center bg-blue-400 ml-5">
                <View className="bg-gray-200 w-[100] h-[100] rounded-full"></View>
                <Text>NAMA RESTO</Text>
              </View>

              <View className="items-center justify-center bg-blue-400 ml-5">
                <View className="bg-gray-200 w-[100] h-[100] rounded-full"></View>
                <Text>NAMA RESTO</Text>
              </View>

              <View className="items-center justify-center bg-blue-400 ml-5">
                <View className="bg-gray-200 w-[100] h-[100] rounded-full"></View>
                <Text>NAMA RESTO</Text>
              </View>
            </ScrollView>
          </View>
          {/* END CATEGORY */}

          {/* BANNER */}
          <View className="bg-blue-200 h-[200] mt-4">
            <Text className="text-2xl m-auto">BANNER</Text>
          </View>
          {/* END BANNER */}

          {/* Popular Foods */}
          <View className="h-[300] bg-green-300 mt-4 ">
            {/* TITLE */}
            <Text className="bg-red-300 text-2xl mt-1 ml-5">Popular Foods</Text>
            {/* END TITLE */}

            <FlatList
              data={foodList}
              renderItem={({ item }) => {
                return <FoodCard food={item} />;
              }}
              keyExtractor={(item) => item.id}
              className="bg-slate-300"
              horizontal
              showsHorizontalScrollIndicator="false"
            />
          </View>
          {/* END Popular Foods */}

          {/* Makanan Hemat */}
          <View className="h-[300] bg-green-300 mt-4 ">
            {/* TITLE */}
            <Text className="bg-red-300 text-2xl mt-1 ml-5">
              Makanan Hemat 20Rb
            </Text>
            {/* END TITLE */}

            <FlatList
              data={foodList}
              renderItem={({ item }) => {
                return <FoodCard food={item} />;
              }}
              keyExtractor={(item) => item.id}
              className="bg-slate-300"
              horizontal
              showsHorizontalScrollIndicator="false"
            />
          </View>
          {/* END Makanan Hemat */}

          {/* Kamu melewatkan ini */}
          <View className="h-[300] bg-green-300 mt-4 ">
            {/* TITLE */}
            <Text className="bg-red-300 text-2xl mt-1 ml-5">
              Kamu melewatkan ini
            </Text>
            {/* END TITLE */}

            <FlatList
              data={foodList}
              renderItem={({ item }) => {
                return <FoodCard food={item} />;
              }}
              keyExtractor={(item) => item.id}
              className="bg-slate-300"
              horizontal
              showsHorizontalScrollIndicator="false"
            />
          </View>
          {/* END Kamu melewatkan ini */}
        </ScrollView>
      </View>
      <StatusBar style="auto" />
    </>
  );
};

export default HomeScreen;
