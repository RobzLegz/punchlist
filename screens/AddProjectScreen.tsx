import React, { useState } from "react"
import styled from "styled-components/native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import * as ImagePicker from "expo-image-picker";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

export default function AddProjectScreen() {
    const [projectName, setProjectName] = useState("");
    const [projectImages, setProjectImages] = useState<string[]>([]);
    const [currentImage, setCurrentImage] = useState("");

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

            setProjectImages([imageUri, ...projectImages])
        }
    };


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
                defaultValue={projectName}
                onChangeText={(projectName) => setProjectName(projectName)}
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
                            projectImages.map((image, i) => {
                                return (
                                    <ProjectImagePreviewContainer key={i}>
                                        <ProjectImage 
                                            source={{uri: image}}
                                            style={{
                                                resizeMode: "cover"
                                            }}
                                        />
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

const ProjectImagePreviewContainer = styled.View`
    position: relative;
    width: ${windowWidth};
    height: 300px;
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

const CloseIcon = styled(MaterialIcon)`
    font-size: 40px;
    position: absolute;
    top: 5px;
    right: 5px;
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