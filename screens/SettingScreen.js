import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions
} from "react-native";
import MyHeader from "../components/MyHeader";
import { Avatar } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import db from "../config";
import firebase from "firebase";
import { RFValue } from "react-native-responsive-fontsize";
import { Icon } from "react-native-elements";

export default class SettingScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      emailID: "",
      docID: "",
      userID: firebase.auth().currentUser.email,
      image: "#",
      name: "",
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

  getUserDetails = () => {
    var email = firebase.auth().currentUser.email;
    db.collection("users")
      .where("emailID", "==", email)
      .get()
      .then((Snapshot) => {
        Snapshot.forEach((doc) => {
          var data = doc.data();
          this.setState({
            emailID: data.emailID,
            firstName: data.firstName,
            lastName: data.lastName,
            name: doc.data().firstName + " " + doc.data().lastName,
            image: doc.data().image,
            docID: doc.id,
          });
        });
      });
  };

  updateUserDetails = () => {
    db.collection("users").doc(this.state.docID).update({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
    });
  };

  componentDidMount() {
    this.getUserDetails();
    this.fetchImage(this.state.userID);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.12 }}>
          <MyHeader title="Settings" navigation={this.props.navigation} />
        </View>
        <Avatar
          rounded
          source={{ uri: this.state.image }}
          size={400}
          onPress={() => {
            this.selectPicture();
          }}
          containerStyle={{
            flex: 0.35,
            width: "50%",
            height: "50%",
            borderRadius: 200,
            borderWidth: 6,
            borderColor: "#fff",
            backgroundColor: "#8E9999",
            justifyContent: "center",
            alignSelf: "center",
            marginTop: 25,
          }}
        />
        <View style={styles.formContainer}>
          <View
            style={{
              flex: 0.66,
              padding: RFValue(10),
            }}
          >
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.formTextInput}
              placeholder={"First Name"}
              maxLength={12}
              onChangeText={(text) => {
                this.setState({ firstName: text });
              }}
              value={this.state.firstName}
            />
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.formTextInput}
              placeholder={"Last Name"}
              maxLength={12}
              onChangeText={(text) => {
                this.setState({ lastName: text });
              }}
              value={this.state.lastName}
            />
          </View>
          <View style={styles.buttonView}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.updateUserDetails();
              }}
            >
              <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.logOutButton}
              onPress={() => {
                this.props.navigation.navigate("WelcomeScreen");
                firebase.auth().signOut();
              }}
            >
              <Icon
                name="logout"
                type="antdesign"
                size={RFValue(20)}
                iconStyle={{
                  paddingLeft: RFValue(10),
                  fontSize: RFValue(23),
                  color: "#fff",
                  marginRight: 10,
                }}
              />

              <Text style={styles.buttonText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 0.88,
    justifyContent: "center",
  },
  label: {
    fontSize: RFValue(18),
    color: "#717D7E",
    fontWeight: "bold",

    marginLeft: RFValue(20),
  },
  formTextInput: {
    width: Dimensions.get("screen").width - 60,
    height: RFValue(50),
    padding: RFValue(10),
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "grey",
    marginBottom: RFValue(20),
    marginLeft: RFValue(20),
  },
  button: {
    width: Dimensions.get("screen").width - 100,
    height: RFValue(60),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(50),
    backgroundColor: "#32867d",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: 10,
  },
  buttonView: {
    alignItems: "center",
    marginTop: RFValue(1),
  },
  buttonText: {
    fontSize: RFValue(23),
    fontWeight: "bold",
    color: "#fff",
  },
  logOutButton: {
    width: Dimensions.get("screen").width - 100,
    height: RFValue(60),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(50),
    backgroundColor: "#BF0426",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: 10,
    flexDirection: "row",
  },
});
