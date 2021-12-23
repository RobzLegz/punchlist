import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react"
import styled from "styled-components/native";

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
    date: Date;
    pictures: ProjectImage[];
}

interface Props{
    data: Project | unknown;
}

const Project: React.FC<Props> = ({data}) => {
    if(!data){
        return null;
    }

    const navigation: any = useNavigation();

    const [projectData] = useState<any>(data);

    return (
        <StyledProject 
            onPress={() => navigation.navigate({
                name: "Project", 
                params: {
                    data: projectData
                }
            })}
        >
            <StyledProjectName>{projectData.name}</StyledProjectName>

            <StyledProjectDate>{projectData.date}</StyledProjectDate>
        </StyledProject>
    )
}

const StyledProject = styled.TouchableOpacity`
    width: 100%;
    height: 100px;
    background-color: #ffffff;
    border-radius: 10px;
    padding: 10px;
    justify-content: space-between;
    margin: 10px 0;
`;

const StyledProjectName = styled.Text`
    font-size: 20px;
    color: #000000;
`;

const StyledProjectDate = styled.Text`
    font-size: 18px;
    color: #000000;
`;


export default Project;