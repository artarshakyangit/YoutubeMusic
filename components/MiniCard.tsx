import React, {useContext, useState,} from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native"
import {AppContext} from "../AppContext";
import {Song} from "../types";
import {FontAwesome, Ionicons} from "@expo/vector-icons";

export type MiniCardProps = {
  song : Song
    title : Image

}

const MiniCard = (props: MiniCardProps)=>{
  const { song } = props



const { setSongId } = useContext(AppContext);

const onPlay = () => {
 setSongId( props.videoId);

}


  return (


      <TouchableOpacity
          onPress={onPlay}>
    <View style={{flexDirection: "row", margin: 0,marginBottom: 0, }}>

      <Image
          source={{uri:`https://i.ytimg.com/vi/${props.videoId}/sddefault.jpg`}}
        style={{
          width: 80,
          height: 80,
          borderRadius: 50
        }} />

      <View style={{paddingLeft: 5,top: 15}}>

        <Text style={{
          fontSize: 20, color: "red",
          width: Dimensions.get("screen").width / 2
        }}
              ellipsizeMode="tail"
              numberOfLines={1}
        >{props.title}</Text>

        <Text style={{fontSize: 14, color: "white"}}>{props.channel}</Text>


      </View>
    </View>
      </TouchableOpacity>
  )

}

export default MiniCard;
