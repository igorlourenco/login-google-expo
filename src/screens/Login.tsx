import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import * as Google from 'expo-google-app-auth';
import {GoogleLogInConfig} from "expo-google-app-auth";
import * as Updates from "expo-updates"
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
    const [user, setUser] = useState<any | null>(null)
    const [accessToken, setAccessToken] = useState<string | null>(null)
    const [e, setE] = useState<string | null>(null)

    useEffect(() => {
        async function updateApp() {
            const { isAvailable } = await Updates.checkForUpdateAsync();
            if (isAvailable) {
                await Updates.fetchUpdateAsync();
                await Updates.reloadAsync(); // depende da sua estratégia
            }
        }

        async function getData() {
            try {
                const accessToken = await AsyncStorage.getItem('@accessToken')
                const user = await AsyncStorage.getItem('@user')
                if(accessToken !== null) {
                    setAccessToken(accessToken)
                }
                if(user !== null) {
                    setUser(JSON.parse(user))
                }
            } catch(e) {
                // error reading value
            }
        }

        getData()
        updateApp()
    }, [])

    const config: GoogleLogInConfig = {
        // config
    }

    async function handleSignIn() {
        try {
            // @ts-ignore
            const {type, user, accessToken} = await Google.logInAsync(config);

            if (type === 'success') {
                setUser(user)
                setAccessToken(accessToken)
                await AsyncStorage.setItem('@accessToken', accessToken)
                await AsyncStorage.setItem('@user', JSON.stringify(user))
                return accessToken
            } else {
                return {cancelled: true}
            }
        }catch (e) {
            setE(e.toString())
            return { error: true }
        }
    }

    async function handleSignOut() {
        try {
            // @ts-ignore
            await Google.logOutAsync({ accessToken, ...config })
            setAccessToken(null)
            await AsyncStorage.removeItem('@accessToken')
            await AsyncStorage.removeItem('@user')
        }catch (e) {
            console.log(e)
            return { error: true }
        }
    }


    if (user && accessToken)
        return (
            <View style={styles.container}>
                <Text>{user.name}</Text>
                <Button onPress={handleSignOut} title="LOG OUT"/>
            </View>
        )
    else
        return (
            <View style={styles.container}>
                <Text>{e}</Text>
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
