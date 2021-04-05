import * as React from "react";
import { Text, View, Image, Dimensions, StyleSheet } from "react-native";

export default class MiniCard extends React.Component {
  render() {
    return (
      <View style={styles.mainView}>
        <Image
          source={{
            uri: `https://i.ytimg.com/vi/${this.props.videoId}/hqdefault.jpg`,
          }}
          style={styles.cardImage}
        />
        <View style={{ paddingLeft: 7 }}>
          <Text
            style={{
              fontSize: 16.5,
              width: Dimensions.get("screen").width / 2,
            }}
            numberOfLines={4}
          >
            {this.props.title}
          </Text>
          <Text style={{ fontSize: 13.5, color: "gray" }}>
            {this.props.channel}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    flexDirection: "row",
    margin: 10,
    elevation: 4,
    marginBottom: 0,
    backgroundColor: "white",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5,
    borderRadius: 10,
  },
  cardImage: {
    width: "45%",
    height: 100,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
});
