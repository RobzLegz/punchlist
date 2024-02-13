import React, { useState, useRef } from "react";
import {
  Dimensions,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Camera } from "expo-camera";
import { MaterialIcons, Octicons, Entypo } from "@expo/vector-icons";
import { manipulateAsync, FlipType } from "expo-image-manipulator";
import IonIcon from "react-native-vector-icons/Ionicons";

export const { height, width } = Dimensions.get("window");

export const cameraHeight = Math.round((width * 16) / 9);

const CameraScreenContainer: React.FC<{
  setImage: (img: string | null) => void;
  image: string | null;
  close: () => void;
}> = ({ setImage, image, close }) => {
  const [type, setType] = useState("back");
  const [flash, setFlash] = useState("off");
  const cameraRef = useRef<Camera>(null);

  if (image) {
    return (
      <View style={styles.container}>
        <TopControls
          delete={() => setImage(null)}
          close={() => close && close()}
        />

        <Image
          style={{ width: "100%", height: "100%", resizeMode: "cover" }}
          source={{ uri: image }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TopControls close={close} />

      <View style={styles.cameraContainer}>
        <Camera
          type={type as any}
          ref={cameraRef}
          flashMode={flash as any}
          ratio="16:9"
          style={styles.camera}
          autoFocus={"on" as any}
        />
      </View>

      <BottomControls
        flash={flash}
        setFlash={setFlash}
        type={type}
        setType={setType}
        cameraRef={cameraRef}
        setImage={setImage}
      />
    </View>
  );
};

export default CameraScreenContainer;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000000",
    position: "relative",
  },
  cameraContainer: {
    width: "100%",
    height: cameraHeight,
    borderRadius: 25,
    overflow: "hidden",
  },
  camera: {
    width: "100%",
    height: "100%",
  },
  topControls: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 5,
    padding: 10,
  },
  bottomControls: {
    width: "100%",
    height: 68,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  cameraButtonContainer: {
    width: "100%",
    position: "absolute",
    bottom: 30,
    left: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export const cameraContainerStyle = styles.container;

export const TopControls: React.FC<{
  delete?: () => void;
  close: () => void;
}> = ({ close, delete: del }) => {
  return (
    <View style={styles.topControls}>
      {del ? (
        <>
          <TouchableOpacity onPress={close}>
            <IonIcon name="arrow-back" size={30} color="#fff" />
          </TouchableOpacity>

          <View style={{ flex: 1, height: 50 }} />

          <TouchableOpacity onPress={del}>
            <IonIcon name="trash" size={30} color="#fff" />
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity onPress={close}>
          <MaterialIcons name="close" size={30} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const BottomControls: React.FC<{
  flash: string;
  type: string;
  setFlash: React.Dispatch<React.SetStateAction<string>>;
  setType: React.Dispatch<React.SetStateAction<string>>;
  cameraRef: React.RefObject<Camera>;
  setImage: (img: string | null) => void;
}> = ({ flash, setFlash, setType, type, cameraRef, setImage }) => {
  const changeFlash = () => {
    setFlash(flash === "torch" ? "off" : "torch");
  };

  const chageType = () => {
    setType(type === "front" ? "back" : "front");
  };

  return (
    <View style={styles.bottomControls}>
      <TouchableOpacity onPress={changeFlash} style={{ zIndex: 4 }}>
        <MaterialIcons
          name={flash === "torch" ? "flash-off" : "flash-on"}
          size={30}
          color="#fff"
        />
      </TouchableOpacity>

      <CameraScreenButton
        cameraRef={cameraRef}
        setImage={setImage}
        type={type}
      />

      <TouchableOpacity onPress={chageType} style={{ zIndex: 4 }}>
        <Octicons name="arrow-switch" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const CameraScreenButton: React.FC<{
  cameraRef: React.RefObject<Camera>;
  type: string;
  setImage: (img: string | null) => void;
}> = ({ cameraRef, setImage, type }) => {
  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const data = await cameraRef.current.takePictureAsync();

        if (type === "front") {
          const manipResult = await manipulateAsync(data.uri, [
            { flip: FlipType.Horizontal },
          ]);
          setImage(manipResult.uri);
          return;
        }

        setImage(data.uri);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.cameraButtonContainer}>
      <TouchableOpacity
        style={{
          width: 90,
          height: 90,
          backgroundColor: "#fff",
          borderRadius: 50,
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 4,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 4.65,
          elevation: 8,
        }}
        onPress={takePicture}
      >
        <Entypo name="circular-graph" color="#000" size={26} />
      </TouchableOpacity>
    </View>
  );
};
