import * as React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  Text,
  TextInput,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import db from "../config";
import firebase from "firebase";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default class WelcomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      emailID: "",
      password: "",
      firstName: "",
      lastName: "",
      recentSearch: null,
      confirmPassword: "",
      isLoginModalVisible: false,
      isSignUpModalVisible: false,
    };
  }


  userSignUp = (emailID, password, confirmPassword) => {
    if (password !== confirmPassword) {
      return alert("password doesn't match\nCheck your password.");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(emailID, password)
        .then(() => {
          db.collection("users").add({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            emailID: this.state.emailID,
            recentSearch: this.state.recentSearch,
            lastWatchedVideo: "a6dH8dLt30Y",
            lastWatchedVideoTitle: "The Last video I watched",
            watchingVideo: null,
            watchingVideoTitle: null,
          });
          return alert("User Added Successfully", "", [
            {
              text: "OK",
              onPress: this.props.navigation.navigate("AvatarSelectionScreen"),
            },
          ]);
        })
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          return alert(errorMessage);
        });
    }
  };

  userLogin = (emailID, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(emailID, password)
      .then(() => {
        this.props.navigation.navigate("HomeScreen");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage);
      });
  };

  showLoginModal = () => {
    return (
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={this.state.isLoginModalVisible}
      >
        <View style={styles.loginModalContainer}>
          <ScrollView style={{ width: "100%" }}>
            <Text style={styles.loginText}>Login</Text>
            <Text style={styles.label}>Email ID</Text>
            <TextInput
              placeholder={"Email ID"}
              style={styles.formTextInput}
              keyboardType={"email-address"}
              onChangeText={(text) => {
                this.setState({
                  emailID: text,
                });
              }}
            ></TextInput>
            <Text style={styles.label}>Password</Text>
            <TextInput
              placeholder={"Password"}
              style={styles.formTextInput}
              secureTextEntry={true}
              onChangeText={(text) => {
                this.setState({
                  password: text,
                });
              }}
            ></TextInput>
            <View>
              <TouchableOpacity
                style={styles.modalLoginButton}
                onPress={() => {
                  this.userLogin(this.state.emailID, this.state.password);
                }}
              >
                <Text style={styles.modalLoginButtonText}>Login</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={styles.modalLoginButton}
                onPress={() => {
                  this.setState({ isLoginModalVisible: false });
                }}
              >
                <Text style={styles.modalLoginButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
    );
  };

  showSignUpModal = () => {
    return (
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={this.state.isSignUpModalVisible}
      >
        <View style={styles.signUpModalContainer}>
          <ScrollView style={{ width: "100%" }}>
            <Text style={styles.signUpText}>Sign Up</Text>
            <TextInput
              placeholder={"First Name"}
              style={styles.formTextInput}
              onChangeText={(text) => {
                this.setState({
                  firstName: text,
                });
              }}
            ></TextInput>
            <TextInput
              placeholder={"Last Name"}
              style={styles.formTextInput}
              onChangeText={(text) => {
                this.setState({
                  lastName: text,
                });
              }}
            ></TextInput>
            <TextInput
              placeholder={"Email ID"}
              style={styles.formTextInput}
              keyboardType={"email-address"}
              onChangeText={(text) => {
                this.setState({
                  emailID: text,
                });
              }}
            ></TextInput>
            <TextInput
              placeholder={"Password"}
              style={styles.formTextInput}
              secureTextEntry={true}
              onChangeText={(text) => {
                this.setState({
                  password: text,
                });
              }}
            ></TextInput>
            <TextInput
              placeholder={"Confirm Password"}
              style={styles.formTextInput}
              secureTextEntry={true}
              onChangeText={(text) => {
                this.setState({
                  confirmPassword: text,
                });
              }}
            ></TextInput>
            <View>
              <TouchableOpacity
                style={styles.modalSignUpButton}
                onPress={() =>
                  this.userSignUp(
                    this.state.emailID,
                    this.state.password,
                    this.state.confirmPassword
                  )
                }
              >
                <Text style={styles.modalSignUpButtonText}>Register</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={styles.modalLoginButton}
                onPress={() => {
                  this.setState({ isSignUpModalVisible: false });
                }}
              >
                <Text style={styles.modalLoginButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/welcomeScreenBG.png")}
          style={styles.backgroundImage}
        >
          {this.showLoginModal()}
          {this.showSignUpModal()}
          <View>
            <Image source={require("../assets/icon.png")} style={styles.logo} />
            <Text style={styles.appName}>Videonest</Text>
          </View>
          <View style={{ flex: 0.5, alignItems: "center" }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.setState({ isLoginModalVisible: true })}
            >
              <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.setState({ isSignUpModalVisible: true })}
            >
              <Text style={styles.buttonText}>SIGN UP</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    width: RFValue(220),
    height: RFValue(220),
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  scrollview: {
    backgroundColor: "#fff",
  },
  loginView: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    justifyContent: "center",
    alignSelf: "center",
    fontSize: 30,
    color: "#348FEB",
    marginLeft: 35,
    marginRight: 35,
    marginBottom: 20,
    marginTop: 15,
    fontWeight: "bold",
  },
  label: {
    fontSize: RFValue(13),
    color: "black",
    fontWeight: "bold",
    marginLeft: RFValue(15),
  },
  formTextInput: {
    width: "90%",
    height: RFValue(45),
    padding: RFValue(10),
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "grey",
    paddingBottom: RFValue(10),
    marginLeft: RFValue(15),
    marginBottom: RFValue(14),
  },
  modalLoginButtonText: {
    fontSize: RFValue(23),
    fontWeight: "bold",
    color: "#fff",
  },
  modalLoginButton: {
    width: "75%",
    height: RFValue(50),
    marginTop: RFValue(20),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(3),
    backgroundColor: "#2668AB",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: RFValue(10),
    marginLeft: RFValue(35),
  },
  button: {
    width: "80%",
    marginTop: 15,
    height: RFValue(50),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(25),
    backgroundColor: "#ffff",
    shadowColor: "#000",
    marginBottom: RFValue(10),
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16,
  },
  buttonText: {
    color: "#3697F7",
    fontWeight: "bold",
    fontSize: RFValue(20),
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  loginModalContainer: {
    flex: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffff",
    marginRight: 30,
    marginLeft: 30,
    marginTop: 80,
    marginBottom: 80,
  },
  modalSignUpButtonText: {
    fontSize: RFValue(23),
    fontWeight: "bold",
    color: "#fff",
  },
  modalSignUpButton: {
    width: "75%",
    height: RFValue(50),
    marginTop: RFValue(20),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(3),
    backgroundColor: "#2668AB",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: RFValue(10),
    marginLeft: RFValue(35),
  },
  signUpModalContainer: {
    flex: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffff",
    marginRight: 30,
    marginLeft: 30,
    marginTop: 80,
    marginBottom: 80,
  },
  signUpText: {
    justifyContent: "center",
    alignSelf: "center",
    fontSize: 30,
    color: "#348FEB",
    marginLeft: 35,
    marginRight: 35,
    marginBottom: 20,
    marginTop: 15,
    fontWeight: "bold",
  },
  appName: {
    color: "white",
    fontSize: 50,
    fontWeight: "bold",
    alignSelf: "center",
    paddingBottom: RFValue(200),
  },
});
