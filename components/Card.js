import * as React from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { MaterialIcons } from "react-native-vector-icons";
import db from "../config";
import firebase from "firebase";

export default class Card extends React.Component {
  constructor() {
    super();
    this.state = {
      userID: firebase.auth().currentUser.email,
      currentlyWatching: "",
      currentlyWatchingTitle: "",
    };
  }

  updateWatching = () => {
    db.collection("users")
      .where("emailID", "==", this.state.userID)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          db.collection("users").doc(doc.id).update({
            watchingVideo: this.state.currentlyWatching,
            watchingVideoTitle: this.state.currentlyWatchingTitle,
          });
        });
      });
  };

  travel = async () => {
    this.updateWatching();
    this.props.navigation.navigate("VideoPlayerScreen");
  };

  componentDidMount() {
    this.setState({
      currentlyWatching: this.props.videoId,
      currentlyWatchingTitle: this.props.title,
    });
  }

  componentWillUnmount() {
    this.updateWatching();
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this.travel()}>
        <View style={styles.mainView}>
          <Image
            source={{
              uri: `https://i.ytimg.com/vi/${this.props.videoId}/hqdefault.jpg`,
            }}
            style={styles.cardImage}
          />
          <View style={{ flexDirection: "row", margin: 5 }}>
            <MaterialIcons name="account-circle" size={40} color="#212121" />

            <View style={{ marginLeft: 10 }}>
              <Text
                style={{
                  fontSize: 20,
                  width: Dimensions.get("screen").width - 75,
                  color: "#212121",
                }}
                numberOfLines={2}
              >
                {this.props.title}
              </Text>
              <Text style={{ color: "#212121" }}>{this.props.channel}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    margin: 10,
    elevation: 4,
    backgroundColor: "white",
    shadowColor: "#212121",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5,
    borderRadius: 10,
  },
  cardImage: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
