import * as React from "react";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import VideoPlayerScreen from "../screens/VideoPlayerScreen";

export const AppStackNavigator = createStackNavigator(
  {
    StackedHome: {
      screen: HomeScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    SearchScreen: {
      screen: SearchScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    VideoPlayerScreen: {
      screen: VideoPlayerScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: "StackedHome",
  }
);
