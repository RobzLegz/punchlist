import { useNavigation } from "@react-navigation/native";
import React from "react"
import { Animated, PanResponder } from "react-native";
import { useSelector } from "react-redux";
import styled from "styled-components/native";
import Project from "../components/Project";
import { selectProject } from "../redux/slices/projectSlice";

interface Pin{
    
}

interface Project{
    id: string;
    name: string;
    description: string;
    pictures: string[];
    pins: Pin[];
}

interface ProjectInfo{
    projects: Project[] | null;
}

export default function HomeScreen() {
    const projectInfo: ProjectInfo = useSelector(selectProject);

    const navigation: any = useNavigation();

    return (
        <StyledHome>
            <StyledAddProjectButton onPress={() => navigation.navigate("AddProject")}>
                <StyledAddProjectButtonText>Add project</StyledAddProjectButtonText>
            </StyledAddProjectButton>

            <StyledProjectList
                data={projectInfo.projects}
                renderItem={Project}
                keyExtractor={item => "" + item}
            >

            </StyledProjectList>
        </StyledHome>
    )
}

const StyledHome = styled.View`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 20px;
`;

const StyledProjectList = styled.FlatList`
    width: 100%;
`;

const StyledAddProjectButton = styled.TouchableOpacity`
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #000;
    border-radius: 10px;
`;

const StyledAddProjectButtonText = styled.Text`
    color: #fafafa;
    font-size: 18px;
`;