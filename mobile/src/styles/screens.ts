import { StyleSheet } from "react-native";
import { white } from "./colors";

const screenStyles = StyleSheet.create({
  basicScreen: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    position: "relative",
    backgroundColor: white,
  },
});

export const basicScreen = screenStyles.basicScreen;
