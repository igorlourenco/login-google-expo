import React, {useEffect} from 'react';
import {Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold} from "@expo-google-fonts/nunito";

import {useFonts} from "expo-font";
import Routes from "./src/routes";
import * as Updates from "expo-updates";

export default function App() {
    useEffect(() => {
            async function updateApp() {
                const {isAvailable} = await Updates.checkForUpdateAsync();
                if (isAvailable) {
                    await Updates.fetchUpdateAsync();
                    await Updates.reloadAsync(); // depende da sua estratégia
                }
            }
        }, [])

    const [fontsLoaded] = useFonts({
        nunito600: Nunito_600SemiBold,
        nunito700: Nunito_700Bold,
        nunito800: Nunito_800ExtraBold
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <Routes/>
    );
}