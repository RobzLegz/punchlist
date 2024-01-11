import React, { useState } from "react";
import { View, Image, Dimensions, TouchableOpacity, Text } from "react-native";
import ImageZoom from "react-native-image-pan-zoom";
import { Plan, Point } from "../types/project";
import { PIN_SIZE } from "../constants";
import { Pin } from "./CreateContainer";

const { width, height } = Dimensions.get("window");

const Zoomer: any = ImageZoom;

const ZoomView: React.FC<{
  bluePrint: Plan;
  close?: () => void;
}> = ({ bluePrint, close }) => {
  const [currentPin, setCurrentPin] = useState<Point | null>(null);

  const handleClick = (e: any) => {
    setCurrentPin({
      geo: null,
      coords: {
        x: e.locationX - PIN_SIZE / 2,
        y: e.locationY - PIN_SIZE / 2,
      },
      description: "",
      irl_image: null,
    });
  };

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
      {currentPin && currentPin.description ? (
        <View
          style={{
            width: "100%",
            backgroundColor: "white",
            padding: 10,
            borderTopWidth: 0.5,
            borderBottomWidth: 0.5,
          }}
        >
          <Text style={{ marginBottom: 4, fontWeight: "500", color: "red" }}>
            Defekta apraksts
          </Text>
          <Text style={{ color: "gray" }}>{currentPin.description}</Text>
        </View>
      ) : null}

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
                uri: bluePrint.image,
              }}
              resizeMode="contain"
            />

            {currentPin ? (
              <Pin
                disabled
                opacity={1}
                x={currentPin.coords.x}
                y={currentPin.coords.y}
              />
            ) : null}

            {bluePrint.points.map((p, i) => (
              <Pin
                key={i}
                opacity={currentPin ? 0.4 : 1}
                x={p.coords.x}
                y={p.coords.y}
                onPress={() => {
                  setCurrentPin(p);
                }}
              />
            ))}
          </View>
        </Zoomer>
      </View>

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
          <Text style={{ color: "#fff", fontSize: 16 }}>Aizvert</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ZoomView;
