import React from "react";
import { View } from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import CarouselCardItem from "./CarouselCardItem";
import data from "../data";

const CarouselCard = () => {
  const isCarousel = React.useRef(null);

  return (
    <View>
      <SwiperFlatList
        className='rounded-lg'
        autoplay
        autoplayDelay={3}
        autoplayLoop
        index={0}
        data={data}
        renderItem={CarouselCardItem}
      />
    </View>
  );
};

export default CarouselCard;