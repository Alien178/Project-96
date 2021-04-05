import React from "react";
import { StyleSheet } from "react-native";
import WelcomeScreen from "./screens/WelcomeScreen";
import { AppTabNavigator } from "./components/AppTabNavigator";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import AvatarSelectionScreen from "./screens/AvatarSelectionScreen";

export default function App() {
  return <AppContainer />;
}

const SwitchNavigator2 = createSwitchNavigator({
  WelcomeScreen: { screen: WelcomeScreen },
  AvatarSelectionScreen: { screen: AvatarSelectionScreen },
});

const SwitchNavigator = createSwitchNavigator({
  StartScreen: { screen: SwitchNavigator2 },
  BottomTab: { screen: AppTabNavigator },
});

const AppContainer = createAppContainer(SwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
