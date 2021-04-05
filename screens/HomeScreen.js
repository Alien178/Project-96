import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  RefreshControl,
} from "react-native";
import MyHeader from "../components/MyHeader";
import Card from "../components/Card";
import db from "../config";
import firebase from "firebase";

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      userID: firebase.auth().currentUser.email,
      recentSearch: "",
      cardData: [],
      refreshing: false,
    };
  }

  fetchData = () => {
    fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${this.state.recentSearch}&type=video&key=AIzaSyB3Kn8qFaIrOTRMtSKQI0-5mV1Gkgg52sY`
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          cardData: data.items,
        });
      });
  };

  getRecentSearch = () => {
    var userID = this.state.userID;
    db.collection("users")
      .where("emailID", "==", userID)
      .get()
      .then((Snapshot) => {
        Snapshot.forEach((doc) => {
          this.setState({ recentSearch: doc.data().recentSearch });
        });
      });
  };

  relaodRecentSearch = () => {
    var userID = this.state.userID;
    db.collection("users")
      .where("emailID", "==", userID)
      .get()
      .then((Snapshot) => {
        Snapshot.forEach((doc) => {
          this.fetchData();
          this.setState({
            recentSearch: doc.data().recentSearch,
            refreshing: false,
          });
        });
      });
  };

  componentDidMount() {
    this.getRecentSearch();
    this.fetchData();
  }

  componentWillUnmount() {
    this.getRecentSearch();
    this.fetchData();
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.relaodRecentSearch();
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyHeader title={"Videonest"} navigation={this.props.navigation} />
        <FlatList
          data={this.state.cardData}
          renderItem={({ item }) => {
            return (
              <Card
                videoId={item.id.videoId}
                title={item.snippet.title}
                channel={item.snippet.channelTitle}
                navigation={this.props.navigation}
              />
            );
          }}
          keyExtractor={(item) => item.id.videoId}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        />
      </View>
    );
  }
}
