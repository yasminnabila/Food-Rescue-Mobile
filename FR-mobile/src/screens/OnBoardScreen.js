import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StatusBar, Animated, Text, Image, View, StyleSheet, Dimensions } from 'react-native';
import { FlatList, TouchableOpacity, } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('screen');

// https://www.flaticon.com/packs/retro-wave
// inspiration: https://dribbble.com/shots/11164698-Onboarding-screens-animation
// https://twitter.com/mironcatalin/status/1321180191935373312

const bgs = ['#A5BBFF', '#DDBEFE', '#FF63ED', '#B98EFF'];
const DATA = [
  {
    "key": "3571572",
    "title": "Multi-lateral intermediate moratorium",
    "description": "I'll back up the multi-byte XSS matrix, that should feed the SCSI application!",
    "image": "https://cdn-icons-png.flaticon.com/512/3571/3571572.png"
  },
  {
    "key": "3571747",
    "title": "Automated radical data-warehouse",
    "description": "Use the optical SAS system, then you can navigate the auxiliary alarm!",
    "image": "https://cdn-icons-png.flaticon.com/512/3571/3571572.png"
  },
  {
    "key": "3571680",
    "title": "Inverse attitude-oriented system engine",
    "description": "The ADP array is down, compress the online sensor so we can input the HTTP panel!",
    "image": "https://cdn-icons-png.flaticon.com/512/3571/3571572.png"
  },
  {
    "key": "3571603",
    "title": "Monitored global data-warehouse",
    "description": "We need to program the open-source IB interface!",
    "image": "https://cdn-icons-png.flaticon.com/512/3571/3571572.png"
  }
]

const Indicator = ({ scrollx }) => {

  return (
    <View style={{ position: "absolute", bottom: 100, flexDirection: "row" }}>
      {DATA.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width]

        const scale = scrollx.interpolate({
          inputRange,
          outputRange: [0.6, 1.1, 0.6],
          extrapolate: "clamp"
        })
        return (
          <Animated.View
            key={`indicator-${i}`}
            style={{
              height: 10,
              width: 10,
              borderRadius: 5,
              backgroundColor: `#fff`,
              margin: 10,
              transform: [
                {
                  scale
                }
              ]
            }}
          >
          </Animated.View>
        )
      })}
    </View>
  )
}

const Backdrop = ({ scrollx }) => {

  const backgroundColor = scrollx.interpolate({
    inputRange: bgs.map((_, i) => i * width),
    outputRange: bgs.map((bg) => bg)
  })
  return (
    <Animated.View
      style={[StyleSheet.absoluteFillObject, {
        backgroundColor
      }]}
    />
  )
}

const Square = ({ scrollx }) => {
  const YOLO = Animated.modulo(Animated.divide(
    Animated.modulo(scrollx, width),
    new Animated.Value(width)
  ), 1)

  const rotate = YOLO.interpolate({
    inputRange: [0, .5, 1],
    outputRange: ['35deg', '0deg', '35deg']
  })
  const translateX = YOLO.interpolate({
    inputRange: [0, .5, 1],
    outputRange: [10, -height, 10]
  })
  return (
    <Animated.View
      style={{
        width: height,
        height: height,
        backgroundColor: "#fff",
        borderRadius: 86,
        position: "absolute",
        top: -height * 0.6,
        left: -height * 0.3,
        transform: [
          {
            rotate,
          },
          {
            translateX
          }
        ]
      }}
    />
  )
}

export default function OnBoardScreen() {

  const navigation = useNavigation()

  const scrollx = React.useRef(new Animated.Value(0))?.current
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Backdrop scrollx={scrollx} />
      <Square scrollx={scrollx} />
      <Animated.FlatList
        data={DATA}
        contentContainerStyle={{ paddingBottom: 100 }}
        horizontal
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollx } } }]
        )}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        ListFooterComponent={
          <View style={{ width: width, alignItems: "center", padding: 20, }}>
            <View style={{
              flex: 0.7,
              justifyContent: "start",
              top: 34
            }}>
              <Image
                source={{ uri: "https://cdn-icons-png.flaticon.com/512/3571/3571572.png" }}
                style={{
                  width: width / 2,
                  height: height / 2,
                  resizeMode: "contain"
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("LOGIN REGIS")}
              className='bg-red-300 h-[300] mt-[400] '>
              <Text
                style={{ color: "#fff", fontWeight: "800", fontSize: 28, marginBottom: 10 }}
              >
                TESTjahsbdjahsdbashd
              </Text>
              <Text
                style={{ color: "#fff", fontWeight: "300" }}
              >
                TEST
              </Text>
            </TouchableOpacity>
          </View>
        }
        renderItem={({ item }) => {
          return (
            <View style={{ width: width, alignItems: "center", padding: 20 }}>
              <View style={{
                flex: 0.7,
                justifyContent: "center"
              }}>
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: width / 2,
                    height: height / 2,
                    resizeMode: "contain"
                  }}
                />
              </View>
              <View style={{ flex: 0.3 }}>
                <Text
                  style={{ color: "#fff", fontWeight: "800", fontSize: 28, marginBottom: 10 }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{ color: "#fff", fontWeight: "300" }}
                >{item.description}</Text>
              </View>
            </View>
          )
        }}
      />
      <Indicator scrollx={scrollx} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});