import React, { useState } from "react"
import styled from "styled-components/native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import * as ImagePicker from "expo-image-picker";
import { Dimensions } from "react-native";
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import { useAnimatedGestureHandler, useSharedValue } from "react-native-reanimated";

const windowWidth = Math.floor(Dimensions.get("window").width);

interface Pin{
    x: number;
    y: number;
    id: number;
    description: string;
}

interface ProjectImage{
    source: string,
    pins: Pin[]
}

export default function AddProjectScreen() {
    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [projectImages, setProjectImages] = useState<ProjectImage[]>([]);
    const [pining, setPining] = useState(false);
    const [pinX, setPinX] = useState<number>(10);
    const [pinY, setPinY] = useState<number>(10);

    const translateX = useSharedValue(0);

    const selectImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if(status === "granted"){
            const response = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
            });

            if(response.cancelled) {
                return;  
            }

            let imageWidth = response.width;
            let imageHeight = response.height;
            let imageSize = imageWidth * imageHeight;
            let imageUri = response.uri;
            let imageName = `${new Date()}_profile`;
            let imageType = "image/png";

            let newImage = {
                name: imageName,
                uri: imageUri,
                type: imageType,
                size: imageSize
            }

            let newProjectImage = {
                source: imageUri,
                pins: []
            }

            setProjectImages([newProjectImage, ...projectImages])
        }
    };

    const removeImage = () => {

    }

    const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
        onStart: (event) => {

        },
        onActive: (event) => {
            console.log(event)
        },
        onEnd: (event) => {

        }
    })

    return (
        <CreateScreenBody>
            <AddProjectHeader>
                <HeaderBackIcon name="arrowleft" />
                <AddProjectHeaderText>Add project</AddProjectHeaderText>
            </AddProjectHeader>

            <DescriptionInput  
                placeholder="Enter project name"
                defaultValue={projectName}
                onChangeText={(projectName) => setProjectName(projectName)}
            />

            <DescriptionInput  
                placeholder="Enter project description"
                defaultValue={projectDescription}
                onChangeText={(projectDescription) => setProjectDescription(projectDescription)}
                numberOfLines={4}
                textAlignVertical="top"
            />

            <AddProjectImageOption onPress={selectImage}>
                <ImageOptionIcon name="image" />
                <AddProjectImageText>Add image</AddProjectImageText>
            </AddProjectImageOption>

            {
                projectImages.length > 0 ? (
                    <CreateScreenImageCarousel
                        horizontal={true}
                        decelerationRate={0}
                        snapToInterval={windowWidth}
                        snapToAlignment={"center"}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                    >
                        {
                            projectImages.map((projectImage, i) => {
                                return (
                                    <ProjectPinHolder 
                                        key={i}
                                    >
                                        <ProjectImagePreviewContainer>
                                            <RemoveIcon name="close" />

                                            <ProjectImage 
                                                source={{uri: projectImage.source}}
                                                style={{
                                                    resizeMode: "cover"
                                                }}
                                            />

                                            {
                                                pining ? (
                                                    <PinDraggableIcon 
                                                        name="push-pin" 
                                                        style={{
                                                            top: pinY,
                                                            left: pinX,
                                                        }}
                                                    />
                                                ) : (
                                                    <PinIcon name="push-pin" onPress={() => setPining(true)} />
                                                )
                                            }
                                        </ProjectImagePreviewContainer>
                                    </ProjectPinHolder>
                                )
                            })
                        }
                    </CreateScreenImageCarousel>
                ) : (null)
            }
        </CreateScreenBody>
    )
}

const CreateScreenBody = styled.ScrollView`
    width: 100%;
    background-color: #f2f2f2;
`;

const DescriptionInput = styled.TextInput`
    padding: 10px;
    background-color: #ffffff;
    margin: 0 0 2px 0;
`;

const CreateScreenImageCarousel = styled.ScrollView`
    height: 300px;
`;

const ProjectPinHolder = styled(PanGestureHandler)`
    width: ${`${windowWidth}px`};
    height: 300px;
    background-color: red;
`;

const ProjectImagePreviewContainer = styled.View`
    position: relative;
    width: 100%;
    height: 100%;
    background-color: red;
`;

const ProjectImage = styled.Image`
    width: 100%;
    height: 100%;
`;

const AddProjectHeader = styled.View`
    height: 50px;
    width: 100%;
    margin: 0 0 2px 0;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    background-color: #ffffff;
`;

const ImageOptionIcon = styled(MaterialIcon)`
    font-size: 35px;
    color: #000000;
`;

const RemoveIcon = styled(MaterialIcon)`
    font-size: 40px;
    position: absolute;
    top: 5px;
    right: 5px;
    z-index: 10;
    color: #000000;
`;

const PinIcon = styled(MaterialIcon)`
    font-size: 35px;
    position: absolute;
    top: 9px;
    right: 40px;
    z-index: 10;
    color: #000000;
`;

const PinDraggableIcon = styled(MaterialIcon)`
    font-size: 35px;
    position: absolute;
    z-index: 10;
    color: #000000;
`;

const HeaderBackIcon = styled(AntDesign)`
    font-size: 30px;
`;

const AddProjectHeaderText = styled.Text`
    color: #000000;
    font-size: 18px;
    margin: 0 0 0 10px;
`;

const AddProjectImageText = styled.Text`
    color: #000000;
    font-size: 16px;
    margin: 0 0 0 5px;
`;

const AddProjectImageOption = styled.TouchableOpacity`
    height: 50px;
    width: 100%;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    background-color: #ffffff;
`;

export {
    HeaderBackIcon,
    AddProjectHeaderText,
    AddProjectHeader
}