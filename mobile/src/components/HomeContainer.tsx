import { View, Text, ScrollView } from "react-native";
import React from "react";
import { AppInfo, selectApp } from "../redux/slices/appSlice";
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
          <ScrollView
            style={{ padding: 20 }}
            showsVerticalScrollIndicator={false}
          >
            {appInfo.projects.map((project, i) => (
              <TouchableOpacity
                style={{
                  width: "100%",
                  padding: 10,
                  marginBottom: 12,
                  borderWidth: 0.5,
                  borderRadius: 10,
                  borderColor: "gray",
                }}
                onPress={() => navigation.navigate("Create", { ...project })}
                key={i}
              >
                <Text style={{ fontSize: 20, color: "#000000" }}>
                  {project.title}
                </Text>

                <Text
                  style={{
                    fontSize: 18,
                    color: "red",
                    marginTop: 4,
                    textDecorationLine: "underline",
                  }}
                >
                  {project.blueprints.flatMap((bl) => bl.points).length} defekti
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
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
              Pagaidām nav neviena projekta
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
          <Text style={{ color: "#fff", fontSize: 16 }}>Jauns projekts</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeContainer;
