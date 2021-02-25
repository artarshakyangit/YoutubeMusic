import { StyleSheet} from "react-native";

const styles = StyleSheet.create({
 container: {
 alignItems: "center",
     padding: 10,
 },
 image:{
     width: 250,
     height: 280,
     margin: 20,
     borderRadius: 10
 },
    artistHeadline: {
     color: 'red',
        fontSize: 30,
        fontWeight: "bold",
    },
    creator:{
     color: 'white',
        margin: 5,
        fontSize: 18,
    },
    button:{
 backgroundColor: 'red',
        width: 150,
        height: 50,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText:{
     color: 'white',
        fontWeight: "bold",
        fontSize: 24,
    }
});

export default styles;
