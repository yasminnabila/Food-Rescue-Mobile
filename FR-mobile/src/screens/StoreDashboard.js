import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  Image,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUserLocation } from "../store/slices/userSlice";
import { AntDesign } from "@expo/vector-icons";

const StoreDashboard = () => {
  let count = [];
  const { access_token } = useSelector(selectUser);
  const [orders, setOrders] = useState([]);
  const [resto, setResto] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    fetch("https://testing-savvie.herokuapp.com/resto/order/food", {
      headers: {
        access_token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setResto(data.resto);
        data = data.order.filter((el) => el);
        setOrders(data);
      });
  }, []);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  console.log(orders, "??????????>>>><<<<<");
  return (
    <View className="flex-1">
      <View className="bg-[#77aa97] rounded-b-3xl">
        <View className="flex-row  mt-16 mb-3 ">
          <View className="ml-1 justify-center">
            <View className="">
              <Image
                source={{ uri: resto?.logoUrl }}
                className="h-[80] w-[80] rounded-full"
              />
            </View>
          </View>
          <View className="ml-3 py-3">
            <Text className="text-2xl font-semibold">{resto?.name}</Text>
            <Text className="mt-1">{resto?.type}</Text>
            <Text className="mt-1">
              {resto?.open_time.slice(0, 5)}-{resto?.close_time.slice(0, 5)}
            </Text>
          </View>
        </View>
      </View>
      <FlatList
        data={orders}
        renderItem={({ item }) => {
          return (
            <View>
              {
                item.status === "Delivered" ? <TouchableOpacity
                  className="flex-row opacity-50 shadow-lg bg-white border-gray-200 mx-5 my-2 rounded-md justify-between"
                  onPress={() => setModalVisible(true)}
                >
                  <View>
                    <View className="bg-blue-100 justify-center items-center w-24 rounded-sm px-3 py-1 mt-3 ml-3 ">
                      <Text className="text-[#1976d2]">{item.is_delivery}</Text>
                    </View>
                    <Text className="text-base my-2 ml-3 opacity-60">{`SAVVIE-${new Date(
                      item.createdAt
                    ).getTime()}`}</Text>
                    <Text className="text-base font-semibold ml-3 mb-3">
                      {item.User.fullName}
                    </Text>
                  </View>
                  <View className="justify-between my-2" >
                    {item.status === "Paid" ? <View className="bg-[#fff0c2] justify-center items-center  rounded-sm px-3 h-7 mr-3">
                      <Text className="text-[#a68b00]">New Order</Text>
                    </View> : ""}
                    <View className="bg-emerald-100 justify-center items-center  rounded-sm px-3 py-1 mt-[56%] h-7 mr-3 ">
                      <Text className="text-emerald-600">{item.status}</Text>
                    </View>
                  </View>
                </TouchableOpacity> : <TouchableOpacity
                  className="flex-row shadow-lg bg-white border-gray-200 mx-5 my-2 rounded-md justify-between"
                  onPress={() => setModalVisible(true)}
                >
                  <View>
                    <View className="bg-blue-100 justify-center items-center w-24 rounded-sm px-3 py-1 mt-3 ml-3 ">
                      <Text className="text-[#1976d2]">{item.is_delivery}</Text>
                    </View>
                    <Text className="text-base my-2 ml-3 opacity-60">{`SAVVIE-${new Date(
                      item.createdAt
                    ).getTime()}`}</Text>
                    <Text className="text-base font-semibold ml-3 mb-3">
                      {item.User.fullName}
                    </Text>
                  </View>
                  <View className="justify-between my-2" >
                    {item.status === "Paid" ? <View className="bg-[#fff0c2] justify-center items-center  rounded-sm px-3 h-7 mr-3">
                      <Text className="text-[#a68b00]">New Order</Text>
                    </View> : ""}
                    <View className="bg-emerald-100 justify-center items-center  rounded-sm px-3 py-1 mt-[56%] h-7 mr-3 ">
                      <Text className="text-emerald-600">{item.status}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              }
              <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                  setModalVisible(!modalVisible);
                }}
              >
                <View className="flex-1 items-center justify-center">
                  <View className="bg-white rounded-md shadow-lg">
                    <View className="ml-[72%]">
                      <TouchableOpacity
                        onPress={() => {
                          setModalVisible(!modalVisible);
                        }}
                      >
                        <AntDesign name="close" size={24} color="gray" />
                      </TouchableOpacity>
                    </View>
                    <Image
                      className="h-80 w-80"
                      source={require("../../assets/images/driver.png")}
                    />
                    <Pressable
                      onPress={() => {
                        setModalVisible(!modalVisible);
                        dispatch(
                          setUserLocation({
                            location: { lat: item.User.location.coordinates[0], lng: item.User.location.coordinates[0] },
                            description: item.User.address,
                          })
                        );
                        navigation.navigate("Track Courier");
                      }}
                      className="justify-center items-center bg-emerald-600 mx-20 py-3 mb-3 rounded-md"
                    >
                      <Text className="font-bold text-white">Deliver It!</Text>
                    </Pressable>
                  </View>
                </View>
              </Modal>
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator="false"
        className="mt-3"
      />
    </View>
  );
};
export default StoreDashboard;
