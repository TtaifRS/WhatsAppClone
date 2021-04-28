import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        width: "100%",
        justifyContent: "space-between",
        padding: 10,
    },
    leftContainer:{
        flexDirection: 'row',

    },
    midContainer:{
        justifyContent: 'space-around'
    },
    avatar: {
        width: 60,
        height: 60,
        marginRight: 15,
        borderRadius: 50
    },
    userName: {
        color: "white",
        fontWeight: 'bold',
        fontSize: 16
    },
    lastMessage: {
        color: "grey",
        fontSize: 16,
       
    },
    time:{
        color: 'grey',
        fontSize: 14,
    }
})

export default styles