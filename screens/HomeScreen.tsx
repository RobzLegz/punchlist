import { useNavigation } from "@react-navigation/native";
import React from "react"
import { useSelector } from "react-redux";
import styled from "styled-components/native";
import Project from "../components/Project";
import { selectProject } from "../redux/slices/projectSlice";

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

interface ProjectInterface{
    id: number;
    name: string;
    description: string;
    pictures: ProjectImage[];
}

interface ProjectInfo{
    projects: ProjectInterface[] | null;
}

export default function HomeScreen() {
    const projectInfo: ProjectInfo = useSelector(selectProject);

    const navigation: any = useNavigation();

    if(!projectInfo.projects){
        return null;
    }

    return (
        <StyledHome>
            <StyledAddProjectButton onPress={() => navigation.navigate("AddProject")}>
                <StyledAddProjectButtonText>Add project</StyledAddProjectButtonText>
            </StyledAddProjectButton>

            <StyledProjectList
                data={projectInfo.projects}
                renderItem={({item}) => {
                    return (
                        <Project     
                            data={item}
                        />
                    )
                }}
                keyExtractor={(item: any) => "" + item.id}
            />
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