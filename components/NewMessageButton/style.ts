import {StyleSheet} from "react-native"
import Colors from "../../constants/Colors"

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light.tint,
        width: 70,
        height: 70,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 30,
        right: 30
    },
})

export default styles