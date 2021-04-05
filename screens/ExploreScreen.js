import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import MyHeader from "../components/MyHeader";
import Constant from "expo-constants";
import Card from "../components/Card";

export default class ExploreScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      chosenCard: "Trending",
      chosenCardData: [],
    };
  }

  fetchData = () => {
    fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${this.state.chosenCard}&type=video&key=AIzaSyCeZFv98nXM5Uv1cu52r5SnfyeRP3XzmIc`
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          chosenCardData: data.items,
        });
      });
  };

  fetchVideos = () => {
    this.fetchData();
  };

  componentDidMount() {
    this.fetchData();
  }

  componentWillUnmount() {
    this.fetchData();
    this.fetchVideos();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyHeader title={"Videonest"} navigation={this.props.navigation} />
        <ScrollView>
          <View>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-around",
              }}
            >
              <View style={styles.mainView}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ chosenCard: "Trending" }),
                      this.fetchVideos();
                  }}
                >
                  <Text style={styles.textStyle}>Trending</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.mainView}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ chosenCard: "Gaming" }), this.fetchVideos();
                  }}
                >
                  <Text style={styles.textStyle}>Gaming</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.mainView}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ chosenCard: "Music" }), this.fetchVideos();
                  }}
                >
                  <Text style={styles.textStyle}>Music</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.mainView}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ chosenCard: "News" }), this.fetchVideos();
                  }}
                >
                  <Text style={styles.textStyle}>News</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.mainView}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ chosenCard: "Movies" }), this.fetchVideos();
                  }}
                >
                  <Text style={styles.textStyle}>Movies</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.mainView}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ chosenCard: "Fashion" });
                  }}
                >
                  <Text style={styles.textStyle}>Fashion</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.searchButtonView}>
            <TouchableOpacity
              onPress={() => {
                this.fetchVideos();
              }}
            >
              <Text style={styles.textStyle}>Search</Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              margin: 8,
              fontSize: 22,
              borderBottomWidth: 2,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {this.state.chosenCard} Videos
          </Text>
          <FlatList
            data={this.state.chosenCardData}
            renderItem={({ item }) => {
              return (
                <Card
                  videoId={item.id.videoId}
                  title={item.snippet.title}
                  channel={item.snippet.channelTitle}
                />
              );
            }}
            keyExtractor={(item) => item.id.videoId}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    height: 50,
    width: 160,
    borderRadius: 4,
    marginTop: 10,
    backgroundColor: "red",
    elevation: 9,
  },
  textStyle: {
    textAlign: "center",
    color: "white",
    fontSize: 22,
    marginTop: 7.5,
  },
  searchButtonView: {
    height: 50,
    width: 160,
    borderRadius: 4,
    marginTop: 5,
    backgroundColor: "green",
    elevation: 9,
    alignSelf: "center",
  },
});
