import { View, ScrollView, TouchableOpacity, Text, Image } from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Plan, Project } from "../types/project";
import IonIcon from "react-native-vector-icons/Ionicons";
import { Pin } from "./CreateContainer";
import ZoomContainer from "./ZoomContainer";
import { useDispatch } from "react-redux";
import { updateProject } from "../redux/slices/appSlice";

const HomeContainer = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const dispatch = useDispatch();

  const [project, setProject] = useState<Project>(route.params as Project)

  const [currentBluePrint, setCurrentBlueprint] = useState<
    (Plan & { index: number }) | null
  >(null);

  const handleSaveProject = () => {
    if (!currentBluePrint) {
      return;
    }

    const newProject = {
      ...project,
      blueprints: [
        ...project.blueprints.slice(0, currentBluePrint.index - 1),
        currentBluePrint,
        ...project.blueprints.slice(
          currentBluePrint.index + 1,
          project.blueprints.length
        ),
      ],
    };

    setProject(newProject);

    dispatch(updateProject(newProject));

    setCurrentBlueprint(null);
  };

  if (!project) {
    return null;
  }

  if (currentBluePrint) {
    return (
      <ZoomContainer
        newBluePrint={currentBluePrint}
        setNewBluePrint={setCurrentBlueprint}
        close={handleSaveProject}
      />
    );
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
          <BP
            {...plan}
            onPress={() => {
              setCurrentBlueprint({ ...plan, index: i });
            }}
            key={i}
          />
        ))}

        <View style={{ height: 80 }} />
      </ScrollView>
    </View>
  );
};

export default HomeContainer;

const BP: React.FC<
  Plan & {
    onPress?: () => void;
  }
> = ({ onPress, ...props }) => {
  return (
    <TouchableOpacity
      style={{
        width: "100%",
        height: "auto",
        position: "relative",
        borderColor: "gray",
        borderWidth: 0.5,
        borderRadius: 10,
        marginBottom: 12,
      }}
      activeOpacity={1}
      onPress={onPress}
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
          <Pin key={j} disabled opacity={1} x={p.coords.x} y={p.coords.y} />
        ))}
      </View>

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
        <View
          style={{
            width: "100%",
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            backgroundColor: "#000",
            borderRadius: 4,
          }}
        >
          <Text style={{ color: "#fff" }}>Apskatit</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
