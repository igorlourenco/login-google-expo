import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import * as Google from 'expo-google-app-auth';
import {GoogleLogInConfig} from "expo-google-app-auth";
import * as Updates from "expo-updates"
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useFocusEffect} from "@react-navigation/native"

export default function Login() {
    const navigation = useNavigation();

    useFocusEffect( () => {
        async function getData(){
            try {
                const storedAccessToken = await AsyncStorage.getItem('@accessToken')
                const storedUser = await AsyncStorage.getItem('@user')
                if(storedAccessToken !== null && storedUser !== null) {

                    navigation.navigate('Home');
                }
            } catch(e) {
                // error reading value
            }
        }

        getData()
    })

    const config: GoogleLogInConfig = {
        androidClientId: "441242396389-k3omnhfhllm0r5tkttu5779dicjjil7p.apps.googleusercontent.com", // expo
        androidStandaloneAppClientId: "441242396389-j1mq4np4ampuv2eb1ph1u16ofejf9una.apps.googleusercontent.com", // production
        // redirectUrl: "com.notoriousigor.lettura:/oauth2redirect/google",
        scopes: ["profile", "email"]
    }

    async function handleSignIn() {
        try {
            // @ts-ignore
            const {type, user, accessToken} = await Google.logInAsync(config);

            if (type === 'success') {
                await AsyncStorage.setItem('@accessToken', accessToken)
                await AsyncStorage.setItem('@user', JSON.stringify(user))
                navigation.navigate('Home')
                return accessToken
            } else {
                return {cancelled: true}
            }
        }catch (e) {
            return { error: true }
        }
    }

        return (
            <View style={styles.container}>
                <Button onPress={handleSignIn} title="LOG IN"/>
            </View>
        )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
