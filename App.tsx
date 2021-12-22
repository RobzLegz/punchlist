import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import styled from "styled-components/native";
import Navigator from "./navigator/Navigator";
import store from "./redux/app/store";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StyledSafeAreaView>
          <Navigator />
        </StyledSafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
}

const StyledSafeAreaView = styled(SafeAreaView)`
  width: 100%;
  height: 100%;
  position: relative;
`;