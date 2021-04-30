import API, { graphqlOperation } from '@aws-amplify/api'
import Auth from '@aws-amplify/auth'
import { Entypo, FontAwesome5, Fontisto, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { createMessage } from '../../src/graphql/mutations'
import styles from './style'

const InputBox = (props) => {

    const {chatRoomID} = props

    const [message, setMessage] = useState("")
    const [myUserId, setMyUserId] = useState(null) 

    useEffect(()=>{
        const fetchUser = async () => {
            const userInfo = await Auth.currentAuthenticatedUser();
            setMyUserId(userInfo.attributes.sub)
        }
        fetchUser()
    },[])


    const onMicroPhonePress =()=>{
        console.warn("microphone")
    }
    const onSendPress = async () => {
        try{
            await API.graphql(
                graphqlOperation(
                    createMessage, {
                        input: {
                            content: message,
                            userID: myUserId,
                            chatRoomID
                        }
                    }
                )
            )
            setMessage('')
        }catch(e){

        }
    }
    const onPress = () =>{
        if (!message){
            onMicroPhonePress();
        }else{
            onSendPress();
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <FontAwesome5 name="laugh-beam" color='grey' size={24}/>
                <TextInput
                    placeholder="Type a message" 
                    style={styles.textInput} 
                    multiline value={message} 
                    onChangeText={setMessage}
                />
                <Entypo name="attachment" color="grey" size={24} style={styles.icon}/>
                {!message && <Fontisto name="camera" color="grey" size={24}style={styles.icon}/>}
            </View>
            <TouchableOpacity onPress={onPress}>
                <View style={styles.buttonContainer}>
                    {!message ?
                        <MaterialCommunityIcons name="microphone" size={28} color="white"/> 
                        :
                        <MaterialIcons name="send" size={28} color='white'/>    
                }
                    
                </View>
            </TouchableOpacity>
            
        </View>
        
    )
}

export default InputBox
