import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { AppInfo, selectApp } from "../../redux/slices/appSlice";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const HomeContainer = () => {
  const navigation = useNavigation<any>();

  const appInfo: AppInfo = useSelector(selectApp);

  return (
    <View style={{ flex: 1, width: "100%", position: "relative" }}>
      <View style={{ flex: 1, width: "100%" }}>
        {appInfo.projects.length > 0 ? (
          <ScrollView></ScrollView>
        ) : (
          <View
            style={{
              width: "100%",
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 20,
            }}
          >
            <Text style={{ color: "gray", fontSize: 18 }}>
              Pagaidåm nav neviena projekta
            </Text>
          </View>
        )}
      </View>

      <View
        style={{ width: "100%", padding: 15, position: "absolute", bottom: 0 }}
      >
        <TouchableOpacity
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            height: 60,
            backgroundColor: "#000",
            borderRadius: 10,
            zIndex: 10
          }}
          onPress={() => navigation.navigate("Create")}
        >
          <Text style={{ color: "#fff", fontSize: 16 }}>Jauns Projekts</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeContainer;
