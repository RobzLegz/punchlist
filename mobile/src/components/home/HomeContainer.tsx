import { StyleSheet, View, ScrollView } from "react-native";
import React from "react";
import { AppInfo, selectApp } from "../../redux/slices/appSlice";
import { useSelector } from "react-redux";
import CameraButton from "../camera/CameraButton";

const HomeContainer = () => {
  const appInfo: AppInfo = useSelector(selectApp);

  return (
    <View style={{ flex: 1, width: "100%" }}>
      

      <View
        style={{
          position: "absolute",
          bottom: 30,
          left: 0,
          width: "100%",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <CameraButton />
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
