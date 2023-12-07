import { AppRegistry } from "react-native";
import AppModule from "./src/modules/AppModule";
import "expo-dev-client";
import { registerRootComponent } from "expo";

AppRegistry.registerComponent('X', () => AppModule);

export default AppModule;

registerRootComponent(AppModule)