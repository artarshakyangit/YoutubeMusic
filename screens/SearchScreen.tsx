import React, {useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Keyboard,
  ScrollView,
  ActivityIndicator
} from "react-native";
import Constant from "expo-constants";
import {Ionicons} from '@expo/vector-icons'
import MiniCard from '../components/MiniCard'
import {AppContext} from '../AppContext'
import {red} from "react-native-redash/lib/typescript/v1";
import HomeScreen from "./HomeScreen";
import {useNavigation} from "@react-navigation/native";
import {useSelector, useDispatch} from "react-redux";
//https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=songs&type=audio&key=[AIzaSyCsrdvrzooSayO0yc5OjzKuDgMEO8avSyQ] HTTP/1.1

const SearchScreen = () => {
  const [value, setValue] = useState("")
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate('AlbumScreen')
  }
  // const [miniCardData, setMiniCard] = useState([])
  const dispatch = useDispatch()
  const miniCardData = useSelector(state => {
    return state
  })
  const [loading, setLoading] = useState(false)
  const fetchData = () => {
    setLoading(true)
    fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${value}&type=audio&key=AIzaSyCsrdvrzooSayO0yc5OjzKuDgMEO8avSyQ`)
      .then(res => res.json())
      .then(data => {
        setLoading(false)
        dispatch({type: "add", payload: data.items})
        //setMiniCard(data.items)
        console.log(data)
      })
  }
  return (
    <View style={{
      flex: 1,
      marginTop: Constant.StatusBarHeight,
    }}>
      <View style={{
        padding: 5,
        flexDirection: "row",
        justifyContent: "space-around",
        elevation: 5,
        backgroundColor: "#000000"
      }}>

        <Ionicons name="arrow-back" size={38} color={"red"}
                  onPress={() => navigation.goBack()}
        />
        <TextInput style={{
          width: "80%",
          height: 40,
          backgroundColor: '#ffffff'
        }}
                   value={value}
                   onChangeText={(text) => setValue(text)} />
        <Ionicons name="play" size={38} color={"red"} onPress={() => fetchData()} />
      </View>

      {loading ? <ActivityIndicator style={{marginTop: 10}} size="large" color="red" /> : null}
      <FlatList
        data={miniCardData}
        renderItem={({item}) => {
          return <MiniCard
            videoId={item.id.videoId}
            title={item.snippet.title}
            channel={item.snippet.channelTitle}
            thumbnail={item.snippet.thumbnails.default.url}

          />
        }}
        keyExtractor={item => item.id.videoId}
      />
    </View>
  )
}
export default SearchScreen;
