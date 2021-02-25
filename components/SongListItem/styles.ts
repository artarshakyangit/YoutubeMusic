import {StyleSheet} from "react-native";

const styles=StyleSheet.create({

    container:{
        flexDirection: 'row',
        margin: 15,
    },
    rightContainer:{
        justifyContent: "space-around",
        marginLeft: 15,
    },
    image:{
        width: 75,
        height: 75,
    },
 title: {
     color: '#f51414',
     fontSize: 24,
 },
 artist: {
     color: 'lightgray',
     fontSize: 18,
 }
})

export default styles;
