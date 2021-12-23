import React, { useState } from "react"
import { View, Text } from "react-native"
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
    if(typeof(data) !== "object" || !data){
        return null;
    }

    const [projectData] = useState<Project>(data);

    return (
        <StyledProject>
            <Text>{projectData.name}</Text>
        </StyledProject>
    )
}

const StyledProject = styled.View`
    width: 100%;
    height: 300px;
    background-color: #f2f2f2;
    border-radius: 20px;
`;

export default Project;