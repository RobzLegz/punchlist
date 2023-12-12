import { View, ScrollView, TouchableOpacity, Text, Image } from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Plan, Point, Project } from "../types/project";
import IonIcon from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { pinStyle } from "./CreateContainer";

const HomeContainer = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const project: Project = route.params as Project;

  if (!project) {
    return null;
  }

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        position: "relative",
        overflow: "hidden",
        zIndex: 20,
      }}
    >
      <View
        style={{
          width: "100%",
          height: 48,
          borderBottomWidth: 0.5,
          borderBottomColor: "gray",
          justifyContent: "flex-start",
          paddingHorizontal: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IonIcon name="arrow-back" size={28} color="gray" />
        </TouchableOpacity>

        <Text style={{ color: "gray", fontSize: 20, marginLeft: 6 }}>
          {project.title}
        </Text>
      </View>

      <ScrollView style={{ padding: 12 }} showsVerticalScrollIndicator={false}>
        {project.blueprints.map((plan: Plan, i: number) => (
          <BP {...plan} key={i} />
        ))}

        <View style={{ height: 80 }} />
      </ScrollView>
    </View>
  );
};

export default HomeContainer;

const BP: React.FC<Plan> = ({ ...props }) => {
  const [activePoint, setActivePoint] = useState<Point | null>(null);

  return (
    <View
      style={{
        width: "100%",
        height: "auto",
        position: "relative",
        borderWidth: 0.5,
        borderColor: "gray",
        borderRadius: 10,
        marginBottom: 12,
      }}
    >
      <View
        style={{
          width: "100%",
          padding: 10,
          borderBottomWidth: 0.5,
          borderBottomColor: "gray",
        }}
      >
        <Text style={{ fontSize: 18 }}>{props.title}</Text>
      </View>

      <View style={{ width: "100%", height: 360, position: "relative" }}>
        <Image
          style={{ width: "100%", height: "100%", resizeMode: "contain" }}
          source={{ uri: props.image }}
        />

        {props.points.map((p, j) => (
          <TouchableOpacity
            style={{
              ...pinStyle,
              top: p.coords.y,
              left: p.coords.x,

              opacity:
                activePoint &&
                activePoint.coords.y !== p.coords.y &&
                activePoint.coords.x !== p.coords.x
                  ? 0.6
                  : 1,
            }}
            key={j}
            onPress={() => setActivePoint(p)}
          >
            <Text style={{ color: "white", fontSize: 28 }}>!</Text>
          </TouchableOpacity>
        ))}
      </View>

      {activePoint ? (
        <View
          style={{
            width: "100%",
            padding: 10,
            borderTopWidth: 0.5,
            borderTopColor: "gray",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <FontAwesome name="exclamation" size={20} color="red" />

          <Text style={{ fontSize: 18, color: "red", marginLeft: 4 }}>
            {activePoint.description}
          </Text>
        </View>
      ) : null}
    </View>
  );
};
