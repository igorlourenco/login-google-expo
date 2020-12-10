import React from "react";

import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import Login from "./screens/Login";

const {Navigator, Screen} = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{headerShown: false, cardStyle: { backgroundColor: "#F2F3F5" }}}>
                <Screen
                    name="Login"
                    component={Login}
                />
            </Navigator>
        </NavigationContainer>
    )
}