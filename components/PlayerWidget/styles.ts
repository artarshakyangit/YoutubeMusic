    import {StyleSheet} from "react-native";

    const styles=StyleSheet.create({

        container:{
            position: "absolute",
            bottom: 43,
            backgroundColor: '#100f0f',
            width: '100%',
            borderWidth: 1,
            borderColor: "#000",

        },
        rightContainer:{
         flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
        },
        nameContainer:{
    flexDirection:"row",
            alignItems: "center",

        },
        iconsContainer:{
    flexDirection:"row",
            alignItems: "center",
            width: 100,
            justifyContent: "space-around",

        },
       progress:{
          height: 5,
           backgroundColor: '#ff0000'
       },


        row:{
            flexDirection: 'row',
        },
        image:{
            width: 85,
            height: 45,
            marginRight: 5,
            borderRadius: 10
        },
     title: {
         color: '#f51414',
         fontSize: 18,
         fontWeight: "bold",
         margin: 10,
     },
     artist: {
         color: '#ffffff',
         fontSize: 14,
     },


    })

    export default styles;
