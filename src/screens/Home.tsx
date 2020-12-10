import React, {useEffect, useState} from "react";
import {Button, Dimensions, StyleSheet, Text, View} from "react-native";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-google-app-auth";
import {GoogleLogInConfig} from "expo-google-app-auth";


export default function Home() {
    const navigation = useNavigation();

    const [user, setUser] = useState<any | null>()
    const [accessToken, setAccessToken] = useState<string | null>()

    const config: GoogleLogInConfig = {
        androidClientId: "441242396389-k3omnhfhllm0r5tkttu5779dicjjil7p.apps.googleusercontent.com", // expo
        androidStandaloneAppClientId: "441242396389-j1mq4np4ampuv2eb1ph1u16ofejf9una.apps.googleusercontent.com", // production
        // redirectUrl: "com.notoriousigor.lettura:/oauth2redirect/google",
        scopes: ["profile", "email"]
    }

    useFocusEffect(() => {
        async function getData() {
            try {
                const storedAccessToken = await AsyncStorage.getItem('@accessToken')
                const storedUser = await AsyncStorage.getItem('@user')

                if (storedAccessToken !== null && storedUser !== null) {
                    setAccessToken(storedAccessToken)
                    setUser(JSON.parse(storedUser))
                } else {
                    navigation.navigate("Login")
                }
            } catch (e) {
                // error reading value
            }
        }

        getData()
    })

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
            <View/>
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