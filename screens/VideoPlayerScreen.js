import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import MyHeader from "../components/MyHeader";
import Constant from "expo-constants";
import { Ionicons } from "react-native-vector-icons";
import { WebView } from "react-native-webview";
import db from "../config";
import firebase from "firebase";

export default class VideoPlayerScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      userID: firebase.auth().currentUser.email,
      currentlyWatching: "",
      currentlyWatchingTitle: "",
      lastWatchedVideo: "",
      lastWatchedVideoTitle: "",
      userDocID: "",
    };
  }

  fetchData = () => {
    db.collection("users")
      .where("emailID", "==", this.state.userID)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            currentlyWatching: doc.data().watchingVideo,
            currentlyWatchingTitle: doc.data().watchingVideoTitle,
            lastWatchedVideo: doc.data().lastWatchedVideo,
            lastWatchedVideoTitle: doc.data().lastWatchedVideoTitle,
            userDocID: doc.id,
          });
        });
      });
  };

  updateData = () => {
    db.collection("users")
      .where("emailID", "==", this.state.userID)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          db.collection("users").doc(doc.id).update({
            lastWatchedVideo: this.state.currentlyWatching,
            lastWatchedVideoTitle: this.state.currentlyWatchingTitle,
            watchingVideo: null,
            watchingVideoTitle: null,
          });
        });
      });
    this.props.navigation.goBack();
  };

  componentDidMount() {
    this.fetchData();
  }
  componentWillUnmount() {
    this.fetchData();
  }

  render() {
    return (
      <View style={{ flex: 1, marginTop: Constant.statusBarHeight }}>
        <View
          style={{
            padding: 5,
            flexDirection: "row",
            elevation: 9,
            backgroundColor: "#1D97F7",
            justifyContent: "space-around",
          }}
        >
          <Ionicons
            name="md-arrow-back"
            size={32}
            onPress={() => {
              this.updateData();
            }}
            color="white"
          />
          <Text
            style={{
              color: "white",
              fontSize: 25,
              fontWeight: "bold",
            }}
          >
            Videonest
          </Text>
          <Ionicons
            name="md-reload"
            size={32}
            onPress={() => {
              this.fetchData();
            }}
            color="white"
          />
        </View>

        <View style={{ width: "100%", height: 200 }}>
          <WebView
            source={{
              uri: `https://www.youtube.com/embed/${this.state.currentlyWatching}`,
            }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            allowsFullscreenVideo={true}
          />
        </View>
        <Text
          style={{
            fontSize: 20,
            width: Dimensions.get("screen").width - 50,
            margin: 9,
          }}
          numberOfLines={2}
        >
          {this.state.currentlyWatchingTitle}
        </Text>
        <View style={{ borderBottonWidth: 1 }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchBar: {
    width: "70%",
    backgroundColor: "#2668AB",
    paddingHorizontal: 5,
    borderRadius: 5,
    fontWeight: "bold",
    color: "white",
  },
});
