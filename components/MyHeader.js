import * as React from "react";
import { Header, Icon, Badge } from "react-native-elements";
import { Ionicons } from "react-native-vector-icons";
import { Text, View } from "react-native";

export default class MyHeader extends React.Component {
  render() {
    return (
      <Header
        backgroundColor={"#1D97F7"}
        centerComponent={{
          text: this.props.title,
          style: { color: "white", fontSize: 25, fontWeight: "bold" },
        }}
        rightComponent={
          <Ionicons
            name="md-search"
            size={32}
            color="white"
            onPress={() => this.props.navigation.navigate("SearchScreen")}
          />
        }
      />
    );
  }
}
