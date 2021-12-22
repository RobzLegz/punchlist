import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../logic/projectOptions";
import { selectProject } from "../redux/slices/projectSlice";
import AddProjectScreen from "../screens/AddProjectScreen";
import HomeScreen from "../screens/HomeScreen";
import ProjectScreen from "../screens/ProjectScreen";

interface Pin{
    x: number;
    y: number;
    id: number;
    description: string;
}

interface ProjectImage{
    id: number;
    source: string;
    pins: Pin[];
}

interface Project{
    id: number;
    name: string;
    description: string;
    pictures: ProjectImage[];
}

interface ProjectInfo{
    projects: Project[] | null;
}

const Stack = createNativeStackNavigator();

const Navigator: React.FC = () => {
    const dispatch = useDispatch();

    const projectInfo: ProjectInfo = useSelector(selectProject);

    useEffect(() => {
        if(!projectInfo.projects){
            getProjects(dispatch);
        }
    }, [projectInfo.projects]);

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