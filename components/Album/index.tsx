import React from 'react';
import {View, Image, Text, TouchableWithoutFeedback, TouchableOpacity,} from 'react-native'
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import {Album} from '../../types';


export type AlbumProps = {
  album: Album,
}

const AlbumComponent = (props: AlbumProps) => {

  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('AlbumScreen', {album: props.album})
  }

  return (

    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Image source={{uri: props.album.imageUri}} style={styles.image} />
        <Image source={{uri: props.album.imageUri}} style={styles.image2} />
        <Text style={styles.artistHeadline}>{props.album.artistsHeadline}</Text>
      </View>
    </TouchableOpacity>

  )
}

export default AlbumComponent;
