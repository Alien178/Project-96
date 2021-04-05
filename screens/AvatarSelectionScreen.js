import * as React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  Alert,
} from "react-native";
import { Avatar } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import db from "../config";
import firebase from "firebase";
import { RFValue } from "react-native-responsive-fontsize";

export default class AvatarSelectionScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      userID: firebase.auth().currentUser.email,
      image: "#",
      name: "",
      docID: "",
    };
  }
  selectPicture = async () => {
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!cancelled) {
      this.uploadImage(uri, this.state.userID);
    }
  };

  uploadImage = async (uri, imageName) => {
    var response = await fetch(uri);
    var blob = await response.blob();
    var ref = firebase
      .storage()
      .ref()
      .child("userProfiles/" + imageName);
    return ref.put(blob).then((response) => {
      this.fetchImage(imageName);
    });
  };

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
      .onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
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
      <ImageBackground
        source={require("../assets/avatarSelectionScreenBG.jpg")}
        style={styles.backgroundImage}
      >
        <Text style={styles.directionsText}>Choose an Profile Image</Text>
        <Text style={styles.subtitleText}>Click the Gray Circle below.</Text>
        <Text style={styles.subtitleTextTwo}>
          You can also Click on next if you want to skip this step.
        </Text>
        <Avatar
          rounded
          source={{ uri: this.state.image }}
          size={400}
          onPress={() => {
            this.selectPicture();
          }}
          containerStyle={{
            width: "60%",
            height: "30%",
            borderRadius: 200,
            borderWidth: 4,
            borderColor: "#fff",
            backgroundColor: "#8E9999",
          }}
        />
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            paddingTop: 10,
            color: "#fff",
            marginBottom: 15,
          }}
        >
          {this.state.name}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.props.navigation.navigate("HomeScreen");
          }}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    resizeMode: "cover",
  },
  directionsText: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
  subtitleText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitleTextTwo: {
    color: "white",
    fontSize: 12.5,
    fontWeight: "bold",
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#348FEB",
    width: RFValue(200),
    height: RFValue(50),
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: RFValue(30),
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
    justifyContent: "center",
  },
});
