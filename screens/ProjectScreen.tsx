import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react"
import { View, Text } from "react-native"
import styled from "styled-components/native";
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

export default function ProjectScreen() {
    const {params} = useRoute<any>();

    const navigation: any = useNavigation();

    const [projectInfo] = useState<Project | null | undefined>(params?.data);
    const [showPinDescription, setShowPinDescription] = useState(false);
    const [pinDescription, setPinDescription] = useState("");
    const [activePinId, setActivePinId] = useState<number | null>(null);
    const [activeImageId, setActiveImageId] = useState<number | null>(null);
    const [projectImages, setProjectImages] = useState<ProjectImage[]>([]);
    const [pining, setPining] = useState(false);

    if(!projectInfo){
        return null;
    }

    const seePinDescription = (description: string, pinId: number | null, imageId: number | null) => {
        setPinDescription(description);
        setShowPinDescription(!showPinDescription);
        
        setActivePinId(pinId);
        setActiveImageId(imageId);
    }

    return (
        <CreateScreenBody>
            <AddProjectHeader>
                <HeaderBackIcon name="arrowleft" onPress={() => navigation.goBack()} />
                <AddProjectHeaderText>{projectInfo.name}</AddProjectHeaderText>
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
                    projectInfo.pictures.map((projectImage, i) => {
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
                                                onPress={() => seePinDescription("", null, null)} 
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
                                                onPress={() => seePinDescription(pin.description, pin.id, projectImage.id)}
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
                <ProjectDescriptionText>{projectInfo.description}</ProjectDescriptionText>
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
