import React, {useState} from "react";
import {View, Text, TouchableOpacity, Image, TextInput, ActivityIndicator, FlatList} from 'react-native';
import {Album} from "../../types";
import styles from "./styles";
import MiniCard from "../MiniCard";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import Constant from "expo-constants";


export type AlbumHeaderProps = {
    album: Album;
}

const SearchScreen = (props: AlbumHeaderProps) => {
    const { album } = props;
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
        fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${album.artistsHeadline}&type=audio&key=AIzaSyCsrdvrzooSayO0yc5OjzKuDgMEO8avSyQ`)
            .then(res => res.json())
            .then(data => {
                setLoading(false)
                dispatch({type: "add", payload: data.items})
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
                <View style={styles.container}>
                    <Image source={{uri: album.imageUri }} style={styles.image} />
                    <Text style={styles.artistHeadline}>{album.artistsHeadline}</Text>
                    <View style={styles.creatorContainer}>
                        <Text style={styles.creator}> {album.by}</Text>
                    </View>
                    <TouchableOpacity onPress={() => fetchData()}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>SEARCH</Text>
                        </View>
                    </TouchableOpacity>
                </View>



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



