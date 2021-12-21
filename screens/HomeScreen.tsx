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

    return (
        <StyledHome>
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
`;

const StyledProjectList = styled.FlatList`
    width: 100%;
`;