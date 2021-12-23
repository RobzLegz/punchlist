import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import { deleteProject } from "../logic/projectOptions";
import { selectProject } from "../redux/slices/projectSlice";
import { AddProjectHeader, AddProjectHeaderText, CreateScreenBody, CreateScreenImageCarousel, HeaderBackIcon, PinDescription, PinDraggableIcon, PinHolder, ProjectImagePreviewContainer, RemoveIcon, windowWidth } from "./AddProjectScreen";

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
    date: string;
    pictures: ProjectImage[];
}

interface ProjectInfo{
    projects: Project[] | null;
}

export default function ProjectScreen() {
    const projectInfo: ProjectInfo = useSelector(selectProject);

    const {params} = useRoute<any>();

    const dispatch = useDispatch();
    const navigation: any = useNavigation();

    const [projectData] = useState<Project | null | undefined>(params?.data);
    const [showPinDescription, setShowPinDescription] = useState(false);
    const [pinDescription, setPinDescription] = useState("");

    if(!projectData){
        return null;
    }

    const seePinDescription = (description: string) => {
        setPinDescription(description);
        setShowPinDescription(!showPinDescription);
    }

    return (
        <CreateScreenBody>
            <AddProjectHeader>
                <HeaderBackIcon name="arrowleft" onPress={() => navigation.goBack()} />

                <AddProjectHeaderText>{projectData.name}</AddProjectHeaderText>

                <RemoveIcon name="delete" onPress={() => deleteProject(projectData.id, projectInfo.projects, dispatch, navigation)} />
            </AddProjectHeader>

            <CreateScreenImageCarousel
                horizontal={true}
                decelerationRate={0}
                snapToInterval={windowWidth}
                snapToAlignment={"center"}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                {
                    projectData.pictures.map((projectImage, i) => {
                        return (
                            <ProjectImagePreviewContainer key={i}>
                                <ProjectImage 
                                    source={{uri: projectImage.source}}
                                    style={{
                                        resizeMode: "cover"
                                    }}
                                />

                                {
                                    showPinDescription ? (
                                        <PinDescription>
                                            <PinDescriptionContainer>
                                                <PinDescriptionContainerH>
                                                    <PinDescriptionText>{pinDescription}</PinDescriptionText>
                                                </PinDescriptionContainerH>
                                            </PinDescriptionContainer>
                                            
                                            <RemoveIcon 
                                                name="close" 
                                                onPress={() => seePinDescription("")} 
                                                style={{
                                                    color: "#ffffff"
                                                }}
                                            />
                                        </PinDescription>
                                    ) : (null)
                                }

                                {
                                    projectImage.pins.map((pin, i) => {
                                        return (
                                            <PinHolder 
                                                key={i}
                                                style={{
                                                    top: pin.y,
                                                    left: pin.x
                                                }}
                                                onPress={() => seePinDescription(pin.description)}
                                            >
                                                <PinDraggableIcon name="push-pin" />
                                            </PinHolder>
                                        )
                                    })      
                                }
                            </ProjectImagePreviewContainer>
                        )
                    })
                }
            </CreateScreenImageCarousel>

            <ProjectDescriptionContainer>
                <ProjectDescriptionText>{projectData.description}</ProjectDescriptionText>
            </ProjectDescriptionContainer>
        </CreateScreenBody>
    )
}

const ProjectImage = styled.Image`
    width: 100%;
    height: 100%;
`;

const PinDescriptionContainer = styled.View`
    width: 100%;
    height: 100%;
    padding: 50px 30px;
`;

const PinDescriptionContainerH = styled.View`
    width: 100%;
    height: 100%;
    background-color: #f2f2f2;
    padding: 5px;
    border-radius: 10px;
`;

const PinDescriptionText = styled.Text`
    font-size: 16px;
`;

const ProjectDescriptionContainer = styled.View`
    width: 100%;
    padding: 10px;
    background-color: #ffffff;
`;

const ProjectDescriptionText = styled.Text`
    font-size: 18px;
`;
