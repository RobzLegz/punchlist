import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react"
import AddProjectScreen from "../screens/AddProjectScreen";
import HomeScreen from "../screens/HomeScreen";
import ProjectScreen from "../screens/ProjectScreen";

const Stack = createNativeStackNavigator();

const Navigator: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{headerShown: false}}
                />

                <Stack.Screen
                    name="Project"
                    component={ProjectScreen}
                    options={{headerShown: false}}
                />

                <Stack.Screen
                    name="AddProject"
                    component={AddProjectScreen}
                    options={{headerShown: false}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigator;