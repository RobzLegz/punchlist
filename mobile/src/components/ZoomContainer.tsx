import React, { useState } from "react";
import {
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";
import ImageZoom from "react-native-image-pan-zoom";
import { Plan, Point } from "../types/project";
import { PIN_SIZE } from "../constants";
import { Pin } from "./CreateContainer";
import Entypo from "react-native-vector-icons/Entypo";
import CameraScreenContainer from "./CameraScreenContainer";
import { Camera } from "expo-camera";

const { width, height } = Dimensions.get("window");

const Zoomer: any = ImageZoom;

const ZoomContainer: React.FC<{
  newBluePrint: Plan;
  setNewBluePrint: React.Dispatch<React.SetStateAction<Plan>>;
  close?: () => void;
}> = ({ newBluePrint, setNewBluePrint, close }) => {
  const [newPin, setNewPin] = useState<Point | null>(null);
  const [addImage, setAddImage] = useState<boolean>(false);

  const handleClick = (e: any) => {
    if (newPin) {
      setNewPin({
        geo: newPin.geo,
        coords: {
          x: e.locationX - PIN_SIZE / 2,
          y: e.locationY - PIN_SIZE / 2,
        },
        description: newPin.description,
        irl_image: newPin.irl_image,
      });

      return;
    }

    setNewPin({
      geo: null,
      coords: {
        x: e.locationX - PIN_SIZE / 2,
        y: e.locationY - PIN_SIZE / 2,
      },
      description: "",
      irl_image: null,
    });

    setAddImage(false);
  };

  const handleSavePin = () => {
    if (!newPin) {
      return;
    }

    setNewBluePrint({
      ...newBluePrint,
      points: [...newBluePrint.points, newPin],
    });

    setNewPin(null);

    setAddImage(false);
  };

  if (addImage && newPin) {
    return (
      <CameraScreenContainer
        setImage={(img) => {
          if (newPin) {
            setNewPin({
              ...newPin,
              irl_image: img,
            });
          }
        }}
        image={newPin.irl_image}
        close={() => setAddImage(false)}
      />
    );
  }

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 20,
        width: "100%",
        height: "100%",
      }}
    >
      <View style={{ width: "100%", flex: 1, position: "relative" }}>
        <Zoomer
          style={{
            width: "100%",
            flex: 1,
          }}
          cropHeight={height}
          cropWidth={width}
          imageHeight={360}
          imageWidth={width}
          minScale={0.5}
          onLongPress={handleClick}
        >
          <View
            style={{
              width: "100%",
              height: 360,
              position: "relative",
            }}
          >
            <Image
              style={{ width: "100%", height: "100%" }}
              source={{
                uri: newBluePrint.image,
              }}
              resizeMode="contain"
            />

            {newPin ? (
              <Pin
                disabled
                opacity={1}
                x={newPin.coords.x}
                y={newPin.coords.y}
              />
            ) : null}

            {newBluePrint.points.map((p, i) => (
              <Pin
                key={i}
                opacity={newPin ? 0.4 : 1}
                x={p.coords.x}
                y={p.coords.y}
                onPress={() => {
                  let newBp = newBluePrint;

                  if (newPin) {
                    newBp = {
                      ...newBp,
                      points: [...newBp.points, newPin],
                    };
                  }

                  newBp = {
                    ...newBp,
                    points: newBp.points.filter((_, j) => j !== i),
                  };
                  setNewBluePrint(newBp);
                  setNewPin(p);
                }}
              />
            ))}
          </View>
        </Zoomer>
      </View>

      {newPin ? (
        <View style={{ width: "100%", backgroundColor: "white", padding: 20 }}>
          <Text style={{ color: "gray" }}>Defekta apraksts</Text>

          <TextInput
            multiline
            numberOfLines={3}
            onChangeText={(text) => setNewPin({ ...newPin, description: text })}
            value={newPin.description}
            placeholder="Apraksts"
            style={{
              width: "100%",
              borderColor: "gray",
              borderWidth: 0.5,
              marginTop: 8,
              borderRadius: 5,
              padding: 10,
              fontSize: 16,
              color: "gray",
              textAlignVertical: "top",
            }}
          />

          <View style={{ width: "100%", flexDirection: "row" }}>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "#000",
                height: 50,
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 12,
                marginRight: 4,
              }}
              onPress={handleSavePin}
            >
              <Text style={{ color: "#fff", fontSize: 18 }}>Saglabāt</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: "#fff",
                width: 100,
                height: 50,
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 12,
                marginLeft: 4,
                borderColor: "red",
                borderWidth: 2,
              }}
              onPress={() => setNewPin(null)}
            >
              <Text style={{ color: "red", fontSize: 18 }}>Dzest</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: "#fff",
                width: 100,
                height: 50,
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 12,
                marginLeft: 4,
                borderColor: "#000",
                borderWidth: 2,
                position: "relative",
              }}
              onPress={async () => {
                const cameraStatus =
                  await Camera.requestCameraPermissionsAsync();

                if (cameraStatus.status === "granted") {
                  setAddImage(true);
                }
              }}
            >
              {newPin.irl_image ? (
                <>
                  <Image
                    source={{ uri: newPin.irl_image }}
                    style={{
                      width: "100%",
                      height: "100%",
                      resizeMode: "cover",
                    }}
                  />

                  <View
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 5,
                      backgroundColor: "rgba(0, 0, 0, 0.4)"
                    }}
                  >
                    <Entypo name="camera" size={20} color="#fff" />
                  </View>
                </>
              ) : (
                <Entypo name="camera" size={20} color="#000" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={{ padding: 20 }}>
          <TouchableOpacity
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              height: 60,
              backgroundColor: "#000",
              borderRadius: 10,
            }}
            onPress={() => close && close()}
          >
            <Text style={{ color: "#fff", fontSize: 16 }}>Saglabāt</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ZoomContainer;
