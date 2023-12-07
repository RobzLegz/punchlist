import { registerRootComponent } from "expo";
import AppModule from "./src/modules/AppModule";
import "expo-dev-client";

registerRootComponent(AppModule);

export default AppModule;
