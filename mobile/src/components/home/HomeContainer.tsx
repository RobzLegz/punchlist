import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { AppInfo, selectApp } from "../../redux/slices/appSlice";
import { useSelector } from "react-redux";

const HomeContainer = () => {
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
              paddingHorizontal: 20
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
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16 }}>Jauns Projekts</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeContainer;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    paddingTop: 30,
  },
  categoriesContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 25,
  },
});
