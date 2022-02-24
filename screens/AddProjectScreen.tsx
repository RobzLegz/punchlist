import React, { useState } from "react"
import styled from "styled-components/native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import * as ImagePicker from "expo-image-picker";
import { Dimensions, GestureResponderEvent } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectProject } from "../redux/slices/projectSlice";
import { saveProject } from "../logic/projectOptions";

const windowWidth = Math.floor(Dimensions.get("window").width);

interface Pin{
    x: number;
    y: number;
    id: number;
    description: string;
    image: string;
    parent: number;
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

export default function AddProjectScreen() {
    const projectInfo: ProjectInfo = useSelector(selectProject);

    const navigation: any = useNavigation();
    const dispatch = useDispatch();

    const [projectName, setProjectName] = useState("");
    const [pinImage, setPinImage] = useState<null | string>("");
    const [projectDescription, setProjectDescription] = useState("");
    const [pinDescription, setPinDescription] = useState("");
    const [activeImageId, setActiveImageId] = useState<number | null>(null);
    const [projectImages, setProjectImages] = useState<ProjectImage[]>([]);
    const [pining, setPining] = useState(false);
    const [checkingPin, setCheckingPin] = useState<null | Pin>(null);

    const [pinX, setPinX] = useState(10);
    const [pinY, setPinY] = useState(10);


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
                id: projectImages.length + 1,
                source: imageUri,
                pins: []
            }

            setProjectImages([newProjectImage, ...projectImages])
        }
    };

    const selectPinImage = async () => {
        if(!checkingPin){
            return;
        }

        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if(status === "granted"){
            const response = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
            });

            if(response.cancelled) {
                return;  
            }

            const imageUri = response.uri;

            const pinImage = projectImages.find(img => img.id === checkingPin.parent);
            if(!pinImage){
                return;
            }

            const activePin = pinImage.pins.find(p => p.id === checkingPin.id);
            if(!activePin){
                return;
            }

            activePin.image = imageUri;
            setPinImage(imageUri);
            setCheckingPin(activePin);
        }
    };

    console.log(checkingPin)

    const removeImage = (imageId: number) => {
        let restProjectImages = projectImages.filter((img) => img.id !== imageId);
        
        setProjectImages(restProjectImages);
    }

    const getPinPosition = (event: GestureResponderEvent) => {
        setPinX(event.nativeEvent.locationX)
        setPinY(event.nativeEvent.locationY)
    }

    const savePin = (imageId: number) => {
        let pinImage = projectImages.find(img => img.id === imageId);
        if(!pinImage){
            return;
        }

        let newPin: Pin = {
            id: pinImage.pins.length + 1,
            x: pinX,
            y: pinY,
            description: "",
            image: "",
            parent: imageId
        }

        pinImage.pins = [...pinImage.pins, newPin];

        setPining(false);
        setPinX(10);
        setPinY(10);
    }
    
    const savePinDescription = () => {
        if(!checkingPin){
            return;
        }

        const activePinImage = projectImages.find(img => img.id === checkingPin.parent);
        if(!activePinImage){
            return;
        }

        const activePin = activePinImage.pins.find(pin => pin.id === checkingPin.id);
        if(!activePin){
            return;
        }

        activePin.description = pinDescription;

        setCheckingPin(null);
    }

    if(!projectInfo.projects){
        return null;
    }

    return (
        <CreateScreenBody>
            <AddProjectHeader>
                <HeaderBackIcon name="arrowleft" onPress={() => navigation.goBack()} />

                <AddProjectHeaderText>Add project</AddProjectHeaderText>

                <RemoveIcon name="check" onPress={() => saveProject(projectName, projectDescription, projectImages, projectInfo.projects, dispatch, navigation)} />
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
                        scrollEnabled={!pining}
                    >
                        {
                            projectImages.map((projectImage, i) => {
                                return (
                                    <ProjectImagePreviewContainer key={i}>
                                        <ProjectImage 
                                            source={{uri: projectImage.source}}
                                            style={{
                                                resizeMode: "cover"
                                            }}
                                        />

                                        {
                                            checkingPin ? (
                                                <PinDescription>
                                                    <PinDescriptionContainer
                                                        contentContainerStyle={{
                                                            alignItems: "center",
                                                            justifyContent: "flex-start"
                                                        }}
                                                    >
                                                        <PinDescriptionInput 
                                                            numberOfLines={8}
                                                            placeholder="Punch description"
                                                            textAlignVertical="top"
                                                            defaultValue={pinDescription}
                                                            onChangeText={(pinDescription) => setPinDescription(pinDescription)}
                                                        />

                                                        {
                                                            checkingPin.image ? (
                                                                <PinImage 
                                                                    source={{uri: checkingPin.image}}
                                                                    style={{
                                                                        resizeMode: "cover",
                                                                    }}
                                                                />
                                                            ) : (null)
                                                        }
                                                        
                                                    </PinDescriptionContainer>
                                                    
                                                    <RemoveIcon 
                                                        name="close" 
                                                        onPress={() => setCheckingPin(null)} 
                                                    />

                                                    <PinIcon 
                                                        name="check" 
                                                        onPress={savePinDescription}
                                                    />

                                                    <PinIcon 
                                                        style={{
                                                            right: 80
                                                        }}
                                                        name="camera" 
                                                        onPress={selectPinImage}
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
                                                        onPress={() => setCheckingPin(pin)}
                                                    >
                                                        <PinDraggableIcon name="push-pin" />
                                                    </PinHolder>
                                                )
                                            })      
                                        }

                                        {
                                            pining ? (
                                                <ProjectPinHolder onPress={getPinPosition}>
                                                    {
                                                        pinX && pinY ? (
                                                            <PinHolder 
                                                                style={{
                                                                    top: pinY,
                                                                    left: pinX
                                                                }}
                                                            >
                                                                <PinDraggableIcon name="push-pin" />
                                                            </PinHolder>
                                                        ) : (null)
                                                    }

                                                    <RemoveIcon name="check" onPress={() => savePin(projectImage.id)} />
                                                </ProjectPinHolder>
                                            ) : (
                                                <>
                                                    <RemoveIcon
                                                        name="close" 
                                                        onPress={() => removeImage(projectImage.id)} 
                                                    />
                                                    <PinIcon
                                                        name="push-pin" 
                                                        onPress={() => setPining(true)} 
                                                    />
                                                </>
                                            )
                                        }
                                    </ProjectImagePreviewContainer>
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

const ProjectPinHolder = styled.TouchableOpacity`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
`;

const ProjectImagePreviewContainer = styled.View`
    position: relative;
    width: ${`${windowWidth}px`};
    height: 300px;
`;

const PinDescription = styled.View`
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 11;
    top: 0;
    left: 0;
    background: #ffffff;
`;

const PinImage = styled.Image`
    width: 100%;
    height: 100%;
    margin: 300px 0 0 0;
`;

const PinDescriptionContainer = styled.ScrollView`
    width: 100%;
    display: flex;
    margin-top: 50px;
`;

const PinDescriptionInput = styled.TextInput`
    padding: 10px;
    background-color: #ffffff;
    margin: 0 0 2px 0;
    border: 2px solid #979393;
    width: 100%;
    height: 150px;
`;

const ProjectImage = styled.Image`
    width: 100%;
    height: 100%;
    position: absolute;
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

const PinHolder = styled.TouchableOpacity`
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100px;
    background-color: red;
    position: absolute;
    border: 3px solid #000000;
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
    margin: 0 0 2px 0;
`;

export {
    HeaderBackIcon,
    AddProjectHeaderText,
    AddProjectHeader,
    CreateScreenBody,
    CreateScreenImageCarousel,
    ProjectPinHolder,
    ProjectImagePreviewContainer,
    PinDescription,
    PinDescriptionContainer,
    PinDraggableIcon,
    RemoveIcon,
    PinHolder,
    windowWidth
}