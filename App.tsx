import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import * as Google from 'expo-google-app-auth';
import {GoogleLogInConfig} from "expo-google-app-auth";

export default function App() {


    async function handleSignIn() {

        const config: GoogleLogInConfig = {
            androidClientId: "INFORME AQUI O ANDROID CLIENT ID",
        }

        const { type, user } = await Google.logInAsync(config);

        if (type === 'success') {
            console.log(`Logado como: ${user.name}`);
        }
    }


    return (
        <View style={styles.container}>
            <Button onPress={handleSignIn} title="LOGIN"/>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
