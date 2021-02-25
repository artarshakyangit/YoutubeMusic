import React, {useEffect} from "react";
import {View, Text, FlatList} from 'react-native';
import {useRoute} from '@react-navigation/native';
import albumDetails from "../data/albumDetails";
import AlbumHeader from "../components/AlbumHeader";
import SongListItem from "../components/SongListItem";
import albums from '../data/albumCategories'
import MiniCard from "../components/MiniCard";

const AlbumScreen = (props) => {

  const route = useRoute();

  useEffect(() => {
    console.log(route);
  }, [])
  return (
    <View>
      <FlatList
        data={albumDetails.song}
        renderItem={({item}) => <MiniCard song={item} />}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => <AlbumHeader album={props.route.params.album} />}
      />

    </View>
  )
}

export default AlbumScreen;

