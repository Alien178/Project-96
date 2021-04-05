import * as React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
} from "react-native";
import { Avatar } from "react-native-elements";
import * as Permissions from "expo-permissions";
import { DrawerItems } from "react-navigation-drawer";
import db from "../config";
import firebase from "firebase";
import { Icon } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";

export default class CustomSideBarMenu extends React.Component {
  constructor() {
    super();
    this.state = {
      userID: firebase.auth().currentUser.email,
      image: "#",
      name: "",
      docID: "",
    };
  }

  fetchImage = (imageName) => {
    var ref = firebase
      .storage()
      .ref()
      .child("userProfiles/" + imageName);
    ref
      .getDownloadURL()
      .then((url) => {
        this.setState({
          image: url,
        });
      })
      .catch((error) => {
        this.setState({
          image: "#",
        });
      });
  };

  getUserProfile() {
    db.collection("users")
      .where("emailID", "==", this.state.userID)
      .onSnapshot((Snapshot) => {
        Snapshot.forEach((doc) => {
          this.setState({
            name: doc.data().firstName + " " + doc.data().lastName,
            docID: doc.id,
            image: doc.data().image,
          });
        });
      });
  }

  componentDidMount() {
    this.fetchImage(this.state.userID);
    this.getUserProfile();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 0.5,
            alignItems: "center",
            backgroundColor: "#32867d",
          }}
        >
          <Avatar
            rounded
            source={{ uri: this.state.image }}
            size={"xlarge"}
            containerStyle={{
              flex: 0.75,
              width: "40%",
              height: "20%",
              marginLeft: 0,
              marginTop: 40,
              borderRadius: 80,
              borderWidth: 2,
            }}
          />
          <Text style={{ fontWeight: "bold", fontSize: 20, paddingTop: 10 }}>
            {this.state.name}
          </Text>
        </View>
        <View style={{ flex: 0.6, marginTop: 10 }}>
          <DrawerItems {...this.props}></DrawerItems>
        </View>
        <View
          style={{
            flex: 0.4,
            justifyContent: "flex-end",
            paddingBottom: 50,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              width: "100%",
              height: "100%",
            }}
            onPress={() => {
              this.props.navigation.navigate("WelcomeScreen");
              firebase.auth().signOut();
            }}
          >
            <Icon
              name="logout"
              type="antdesign"
              size={RFValue(20)}
              iconStyle={{ paddingLeft: RFValue(10) }}
            />

            <Text
              style={{
                fontSize: RFValue(15),
                fontWeight: "bold",
                marginLeft: RFValue(30),
              }}
            >
              Log Out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
