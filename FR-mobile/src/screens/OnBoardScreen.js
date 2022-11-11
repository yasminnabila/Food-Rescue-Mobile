import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StatusBar, Animated, Text, Image, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { FlatList, } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('screen');

// https://www.flaticon.com/packs/retro-wave
// inspiration: https://dribbble.com/shots/11164698-Onboarding-screens-animation
// https://twitter.com/mironcatalin/status/1321180191935373312

const bgs = ['#77aa5c', '#77aa6c', '#77aa7c', '#77aa8c', '#77aa9c'];
const DATA = [

  {
    "key": "3571747",
    "title": "The more you eat, the more you save",
    "description": "Discover delicious surplus food at a great discount around you",
    "image": "https://media.discordapp.net/attachments/1037950269922754673/1039829986883936277/onboarding1.png"
  },
  {
    "key": "3571572",
    "title": "Choose your pick up method",
    "description": "You are free to choose any pick-up methods,whether self-pick-up or delivered to your place",
    "image": "https://cdn.discordapp.com/attachments/1037950269922754673/1039829987282386974/onboarding2.png"
  },
  {
    "key": "3571680",
    "title": "Easy payment",
    "description": "Purchase your desired meal easily using Savvie Pay!",
    "image": "https://cdn.discordapp.com/attachments/1037950269922754673/1039829987794108498/onboarding3.png"
  },
  {
    "key": "3571603",
    "title": "Enjoy a tasty meal that helps the planet",
    "description": "Doing good has never tasted as delicious as it is with Savvie!",
    "image": "https://cdn.discordapp.com/attachments/1037950269922754673/1039829988553261056/onboarding5.png"
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
          <>
            <View style={{ width: width, alignItems: "center", padding: 20, }}>
              <View style={{
                flex: 0.7,
                justifyContent: "start",
                top: 34
              }}>
                <Image
                  source={{ uri: "https://media.discordapp.net/attachments/1035762335383552128/1039816650825928704/icon.png?width=2160&height=691" }}
                  style={{
                    width: width / 0.5,
                    height: height / 2,
                    resizeMode: "contain"
                  }}
                />
              </View>
            </View>

            <View
              className=' h-[150] w-[300] absolute top-[480] self-center mt-[60]'
            >
              <Text
                className='text-white font-bold text-lg text-center'
              >
                Login to join us fighting against food waste!
              </Text>

              <TouchableOpacity
                onPress={() => navigation.navigate("LOGIN_REGIS")}
                className="h-[60] w-[200] bg-yellow-500 self-center mt-[18] rounded-2xl justify-center items-center">
                <Text className='text-lg font-semibold text-white'>
                  LOGIN
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              className='h-[80] w-[300] absolute top-[600] self-center justify-end mt-[120]'
              onPress={() => navigation.navigate("MainNavigation")}
            >
              <Text
                className='text-white font-bold text-[18px] text-center'
              >
                Just let me in to see offers
              </Text>
            </TouchableOpacity>

          </>
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
                    width: width / 0.5,
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
                  style={{ color: "#fff", fontWeight: "400", fontSize: "20" }}
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