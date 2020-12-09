import React, {useEffect, useState} from 'react';
import {Alert, Button, StyleSheet, Text, View} from 'react-native';
import * as Google from 'expo-google-app-auth';
import {GoogleLogInConfig} from "expo-google-app-auth";
import * as Updates from "expo-updates"

export default function App() {

    useEffect(() => {
        async function updateApp() {
            const { isAvailable } = await Updates.checkForUpdateAsync();
            if (isAvailable) {
                await Updates.fetchUpdateAsync();
                await Updates.reloadAsync(); // depende da sua estratégia
            }
        }
        updateApp();
    }, [])

    const [user, setUser] = useState(null)
    const [accessToken, setAccessToken] = useState(null)
    const [e, setE] = useState(null)

    const config: GoogleLogInConfig = {
        androidClientId: "", // expo
        androidStandaloneAppClientId: "", // production
    }

    async function handleSignIn() {
        try {
            const {type, user, accessToken} = await Google.logInAsync(config);

            if (type === 'success') {
                setUser(user)
                setAccessToken(accessToken)
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
            await Google.logOutAsync({ accessToken, ...config })
            setAccessToken(null)
            console.log('deslogado')
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
        backgroundColor: '#aaa',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
