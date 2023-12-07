import { View, Text, ScrollView } from "react-native";
import React from "react";
import { AppInfo, selectApp } from "../../redux/slices/appSlice";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

const HomeContainer = () => {
  const navigation = useNavigation<any>();

  const appInfo: AppInfo = useSelector(selectApp);

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <View style={{ width: "100%", flex: 1 }}>
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
            <Text style={{ color: "gray", fontSize: 16 }}>
              Pagaidåm nav neviena projekta
            </Text>
          </View>
        )}
      </View>

      <View
        style={{
          width: "100%",
          padding: 15,
        }}
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
