import React, {Component, useContext} from 'react';
import {
  Text, Image, View, TouchableOpacity,
  PanResponder,
  Dimensions,
  Animated,
  Modal, Button, StyleSheet, SafeAreaView
} from 'react-native';
import styles from './styles';
import {Song} from "../../types";
import {AntDesign, FontAwesome} from "@expo/vector-icons";
import {useEffect} from 'react';
import {Audio} from "expo-av";
import {useState} from 'react';
import {Sound} from 'expo-av/build/Audio';
import {AppContext} from "../../AppContext";
import {AVPlaybackStatus} from "expo-av/build/AV";
import {LinearGradient} from "expo-linear-gradient";
import {RectButton} from "react-native-gesture-handler";
import {Feather as Icon} from "@expo/vector-icons";
import ytdl from 'react-native-ytdl';
import Slider from "@react-native-community/slider";
import RNTrackPlayer, {seekTo} from "react-native-track-player";




const PlayerWidget = () => {
  const [showModal, setShowModal] = useState(false);
  const [sound, setSound] = useState<Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number | null>(null);
  const [position, setPosition] = useState<number | null>(null);

  const {songId} = useContext(AppContext);
  const {title} = useContext(AppContext);
  useEffect(() => {

    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      playThroughEarpieceAndroid: false
    });
  }, {})
  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {

    setDuration(status.durationMillis);
    setPosition(status.positionMillis);
  }
  const playCurrentSong = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
    }
    let info = await ytdl.getInfo(songId);

    let audioFormats = ytdl.filterFormats(info.formats, 'audioonly');

    const {sound: newSound} = await Audio.Sound.createAsync(
      {uri: audioFormats[0].url},
      {shouldPlay: isPlaying},
      onPlaybackStatusUpdate
    )
    newSound.playAsync();

    setSound(newSound)
  }
  useEffect(() => {
    if (songId){
      playCurrentSong();
    }
  }, [songId])

  const onPlayPausePress = async () => {
    if (!sound) {
      return;
    }
    if (isPlaying) {
      setIsPlaying(false)
      sound.pauseAsync();
    } else {
      setIsPlaying(true)
      sound.playAsync();
    }
  }


  const getProgress = () => {
    if (sound === null || duration === null || position === null) {
      return 0;
    }
    return (position / duration) * 100;

  }
  const formatTime = (secs: number | null) => {
    let minutes = Math.floor(secs / 60);
    let seconds = Math.ceil(secs - minutes * 60);

    if (seconds < 100) seconds = `0${seconds}`;

    return `${minutes}:${seconds}`;
  };

  const player = StyleSheet.create({
    container: {
      margin: 16
    },

    button: {
      padding: 16
    },
    title: {
      color: "white",
      padding: 16,
      textAlign: "center"
    },
    cover: {
      marginVertical: 16,
      width: 360,
      height: 405,
      borderRadius: 20
    },
    metadata: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    },
    song: {
      fontSize: 32,
      fontWeight: "bold",
      color: "white"
    },
    artist: {
      color: "red"
    },
    slider: {
      backgroundColor: "rgba(255, 255, 255, 0.5)",

      borderRadius: 2,
      height: 4,
      marginVertical: 16
    },

    progress: {
      height: 15,
      backgroundColor: '#ffffff'

    },
    controls: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center"
    },
    timerContainer:{
      flexDirection: "row",
      justifyContent: "space-between",

    },
    timer:{
      color: "#fff",
      fontSize: 16,
    }
  });

  if (!songId){
    return null
  }
  const song = {
    id: '1',
    uri: 'https://download.xn--41a.wiki/cache/3/359/474499210_456343951.mp3?filename=Daddy%20Yankee%20feat.%20Snow-Con%20Calma.mp3',
    imageUri: `https://i.ytimg.com/vi/${songId}/maxresdefault.jpg`,
    title: '',
    artist: '',

  }

  return (

    <Animated.View style={styles.container}>
      <Animated.View style={[styles.progress, {width: `${getProgress()}%`}]} />
      <Animated.View style={styles.row}>
        <Image source={{uri: song.imageUri}} style={styles.image} />
        <Animated.View style={styles.rightContainer}>
        </Animated.View>
        <Animated.View style={styles.nameContainer}>
          <Text style={styles.title}>{song.title}</Text>
          <Text style={styles.artist}>{}</Text>
        </Animated.View>

        <Modal
          animationType={'slide'}
          transparent={false}
          visible={showModal}
          onRequestClose={() => {

          }}>


          <LinearGradient
            colors={["#000000", "#a12626"]}
            style={StyleSheet.absoluteFill}
          />
          <View style={player.container}>

            <View>

              <RectButton>
                <Icon name="chevron-down" color="white" size={24} onPress={() => {
                  setShowModal(!showModal);
                }} />
              </RectButton>
              <Text style={player.title}>{song.artist}</Text>

            </View>
            <Image source={{uri: song.imageUri}} style={player.cover} />
            <View style={player.metadata}>
              <View>
                <Text style={player.song}>{song.artist}</Text>
                <Text style={player.artist}>{}</Text>
              </View>

            </View>
            <View>
            <Slider style={{width: 360, height: 40}}
                    minimumValue={0}
                    value={position}
                    maximumValue={duration}
                    minimumTrackTintColor="#ffffff"
                    maximumTrackTintColor="rgba(255, 255, 255, .5)"

                    />
            </View>
                    <View style={player.timerContainer}>
                      <Text style={player.timer}>{formatTime(position)}</Text>
                      <Text style={player.timer}>{formatTime(duration)}</Text>
                    </View>
            </View>

            <View style={player.controls}>

              <TouchableOpacity>
                <Icon name="shuffle" color="rgba(255, 255, 255, 0.5)" size={24} />
              </TouchableOpacity>
              <TouchableOpacity>
                <AntDesign name="stepbackward" color="white" size={32} />
              </TouchableOpacity>
              <TouchableOpacity onPress={onPlayPausePress}>
                <FontAwesome name={isPlaying ? 'pause' : 'play'} color="white" size={48} />
              </TouchableOpacity>
              <TouchableOpacity>
                <AntDesign name="stepforward" color="white" size={32} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name="repeat" color="rgba(255, 255, 255, 0.5)" size={24} />
              </TouchableOpacity>
            </View>


        </Modal>


        <Animated.View style={styles.iconsContainer}>
          <TouchableOpacity onPress={() => {
            setShowModal(!showModal);
          }}>
            <AntDesign name='up' size={24} color={'#fff'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPlayPausePress}>
            <FontAwesome name={isPlaying ? 'pause' : 'play'} size={24} color={'#fff'} />
          </TouchableOpacity>

        </Animated.View>
      </Animated.View>
    </Animated.View>

  )
}

export default PlayerWidget;
