import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "react-native-vector-icons";
import Constant from "expo-constants";
import MiniCard from "../components/MiniCard";
import db from "../config";
import firebase from "firebase";

export default class SearchScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      userID: firebase.auth().currentUser.email,
      searchValue: "",
      miniCardData: [],
      loading: false,
    };
  }

  fetchData = () => {
    this.setState({
      loading: true,
    });
    fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${this.state.searchValue}&type=video&key=AIzaSyChMX8mnglwrIg6r-TsLEo4ToBwgBIQs60`
    )
      .then((res) => res.json())
      .then((data) => {
        this.addSearch(this.state.searchValue);
        this.setState({
          miniCardData: data.items,
          loading: false,
        });
      });
  };

  addSearch = (searchValue) => {
    var userID = this.state.userID;
    db.collection("users")
      .where("emailID", "==", userID)
      .get()
      .then((Snapshot) => {
        Snapshot.forEach((doc) => {
          db.collection("users")
            .doc(doc.id)
            .update({ recentSearch: searchValue });
        });
      });
  };

  render() {
    return (
      <View style={{ flex: 1, marginTop: Constant.statusBarHeight }}>
        <View
          style={{
            padding: 5,
            flexDirection: "row",
            justifyContent: "space-around",
            elevation: 9,
            backgroundColor: "#1D97F7",
          }}
        >
          <Ionicons
            name="md-arrow-back"
            size={32}
            onPress={() => {
              this.props.navigation.goBack();
            }}
            color="white"
          />
          <TextInput
            onChangeText={(text) => {
              this.setState({ searchValue: text });
            }}
            value={this.state.searchValue}
            style={styles.searchBar}
          />
          <Ionicons
            name="md-send"
            size={32}
            color="white"
            onPress={() => {
              this.fetchData();
            }}
          />
        </View>
        {this.state.loading ? (
          <ActivityIndicator
            style={{ marginTop: 10 }}
            size="large"
            color="red"
          />
        ) : null}

        <FlatList
          data={this.state.miniCardData}
          renderItem={({ item }) => {
            return (
              <MiniCard
                videoId={item.id.videoId}
                title={item.snippet.title}
                channel={item.snippet.channelTitle}
              />
            );
          }}
          keyExtractor={(item) => item.id.videoId}
        />
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
