import React, { Fragment } from "react";
import { basicScreen } from "../styles/screens";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar, StatusBarStyle } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const ScreenModule: React.FC<{
  children?: React.ReactNode;
  statusBgColor?: string;
  barStyle?: StatusBarStyle;
  bgColor?: string;
}> = ({ children, statusBgColor = "#000000", barStyle = "light" }) => {
  return (
    <Fragment>
      <StatusBar backgroundColor={statusBgColor} style={barStyle} />
      <View style={{ flex: 0, backgroundColor: statusBgColor, height: 0 }} />
      <SafeAreaView
        style={{
          flex: 1,
          height: 0,
          backgroundColor: statusBgColor,
          position: "relative",
        }}
      >
        <GestureHandlerRootView>
          <View style={basicScreen}>{children}</View>
        </GestureHandlerRootView>
      </SafeAreaView>
    </Fragment>
  );
};

export default ScreenModule;
