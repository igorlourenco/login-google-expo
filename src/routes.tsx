import React from "react";

import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import Login from "./screens/Login";
import Home from "./screens/Home";

const {Navigator, Screen} = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{headerShown: false, cardStyle: { backgroundColor: "#F2F3F5" }}}>
                <Screen
                    name="Login"
                    component={Login}
                />
                <Screen
                    name="Home"
                    component={Home}
                />
            </Navigator>
        </NavigationContainer>
    )
}