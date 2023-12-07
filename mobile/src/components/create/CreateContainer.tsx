import { View, ScrollView } from "react-native";
import React from "react";
import { AppInfo, selectApp } from "../../redux/slices/appSlice";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const HomeContainer = () => {
  const navigation = useNavigation<any>();

  const appInfo: AppInfo = useSelector(selectApp);

  return (
    <View style={{ flex: 1, width: "100%", position: "relative" }}>
      <ScrollView style={{ flex: 1, width: "100%" }}></ScrollView>
    </View>
  );
};

export default HomeContainer;
