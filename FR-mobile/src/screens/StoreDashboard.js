import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import React, { useState } from "react";

const StoreDashboard = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <SafeAreaView className="bg-gray-100 flex-1">
      <View className="flex-row bg-yellow-200">
        <View className=" justify-center">
          <View className="h-[80] w-[80] rounded-full border-4 border-red-400">
            {/* ISI IMAGE DI SINI */}
          </View>
        </View>
        <View className="">
          <Text className="text-2xl font-semibold">Makan ikan</Text>
          <Text className="mt-1">Jalan subomo</Text>
          <Text className="mt-1">082267580929</Text>
        </View>
      </View>
      <ScrollView showsHorizontalScrollIndicator="false" className="mt-5">
        {[1, 2, 3, 4, 4].map((el) => {
          return (
            <View className="shadow-lg bg-white border-gray-200 mx-5 my-2 rounded-md">
              <TouchableOpacity
                className="p-10"
                onPress={() => setModalVisible(true)}
              >
                <Text className="self-center text-xs font-semibold text-center">
                  {el}
                </Text>
                <Text>makan ikan</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View className="h-100 w-100">
          <View>
            <Text>Hello World!</Text>
            <Image
              className="h-100"
              source={require("../../assets/images/driver.png")}
            />
            <Pressable onPress={() => setModalVisible(!modalVisible)}>
              <Text>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
export default StoreDashboard;
