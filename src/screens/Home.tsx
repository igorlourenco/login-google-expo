import React, {useEffect, useState} from "react";
import {Button, Dimensions, StyleSheet, Text, View} from "react-native";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-google-app-auth";
import {GoogleLogInConfig} from "expo-google-app-auth";
import api from "../services/api";

export default function Home() {
    const navigation = useNavigation();

    const [user, setUser] = useState<any | null>()
    const [accessToken, setAccessToken] = useState<string | null>()

    const config: GoogleLogInConfig = {
        androidClientId: "441242396389-k3omnhfhllm0r5tkttu5779dicjjil7p.apps.googleusercontent.com", // expo
        androidStandaloneAppClientId: "441242396389-j1mq4np4ampuv2eb1ph1u16ofejf9una.apps.googleusercontent.com", // production
        // redirectUrl: ":/oauth2redirect/google",
        scopes: ["profile", "email"]
    }

    useEffect(() => {
        async function getData() {
            try {
                const storedAccessToken = await AsyncStorage.getItem('@accessToken')
                const storedUser = await AsyncStorage.getItem('@user')

                if (storedAccessToken!==null && storedUser!==null){
                    const parsedStoredUser = JSON.parse(storedUser)

                    const response = await api.get(`user/${parsedStoredUser.id}`)

                    if (!response.data.id) {
                        await api.post(`users`, {
                            user_id: parsedStoredUser.id,
                            name: parsedStoredUser.name,
                            given_name: parsedStoredUser.givenName,
                            family_name: parsedStoredUser.familyName,
                            email: parsedStoredUser.email,
                            photo_url: parsedStoredUser.photoUrl
                        }).then(response => setUser(response.data))
                        setAccessToken(storedAccessToken)
                    } else {
                        setAccessToken(storedAccessToken)
                        setUser(response.data)
                    }
                }

            } catch (e) {
                // error reading value
            }
        }

        getData()
    }, [accessToken])

    async function handleSignOut() {
        try {
            // @ts-ignore
            await Google.logOutAsync({accessToken, ...config})
            setAccessToken(null)
            setUser(null)
            await AsyncStorage.removeItem('@accessToken')
            await AsyncStorage.removeItem('@user')
            navigation.navigate('Login')
        } catch (e) {
            console.log(e)
            return {error: true}
        }
    }

    return (
        (user && accessToken) ?
            <View style={styles.container}>
                <Text style={styles.text}>{user.name}</Text>
                <Button onPress={handleSignOut} title="LOG OUT"/>
            </View>
            :
            <View style={styles.container}><Button onPress={handleSignOut} title="LOG OUT"/></View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center"
    },
    text: {
        color: '#f00'
    }
})