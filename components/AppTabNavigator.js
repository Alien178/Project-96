import * as React from "react";
import { Icon } from "react-native-elements";
import ExploreScreen from "../screens/ExploreScreen";
import SettingScreen from "../screens/SettingScreen";
import { AppStackNavigator } from "./AppStackNavigator";
import { createBottomTabNavigator } from "react-navigation-tabs";

export const AppTabNavigator = createBottomTabNavigator({
  HomeScreen: {
    screen: AppStackNavigator,
    navigationOptions: {
      tabBarIcon: <Icon name="home" type="ionicon" />,
      tabBarLabel: "Home",
    },
  },
  ExploreScreen: {
    screen: ExploreScreen,
    navigationOptions: {
      tabBarIcon: <Icon name="compass" type="ionicon" />,
      tabBarLabel: "Explore",
    },
  },
  SettingScreen: {
    screen: SettingScreen,
    navigationOptions: {
      tabBarIcon: <Icon name="settings" type="ionicon" />,
      tabBarLabel: "Settings",
    },
  },
});
