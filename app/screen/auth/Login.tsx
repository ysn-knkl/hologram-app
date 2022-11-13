import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
} from "react-native";
import React, { useContext, useState } from "react";
import { Button, Text, Input, Layout } from "@ui-kitten/components";
import {
  AppContextInterface,
  AuthContext,
} from "../../navigation/AuthProvider";
import { ScreenProps } from "../../redux/models/modals";
import { Routes } from "../../constant/routes";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
import AntDesign from "react-native-vector-icons/AntDesign";
AntDesign.loadFont();

export default function Login(Props: ScreenProps) {
  const { navigation } = Props;

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [secureText, setSecureText] = useState(true);

  const { login } = useContext(AuthContext) as AppContextInterface;

  const onSignInPressed = () => {
    if (email.length === 0 || password.length === 0) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: "ERROR",
        textBody: "Please type the email and password",
        button: "ok",
        closeOnOverlayTap: true,
      });
    }
    login(email, password);
  };

  const SecureTextIcon = () => {
    return (
      <Pressable onPress={() => setSecureText((prev) => !prev)}>
        <AntDesign name={secureText ? "eyeo" : "eye"} size={15} />
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <Layout style={styles.container}>
        <View style={styles.root}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Welcome Hologram App</Text>
            <Text style={styles.subTitle}>Enjoy the App</Text>
          </View>
          <View style={styles.inputContainer}>
            <Input
              placeholder="E-mail"
              label="E-mail"
              value={email}
              onChangeText={(nextValue) => setEmail(nextValue)}
            />
            <Input
              placeholder="Password"
              label="Password"
              value={password}
              onChangeText={(nextValue) => setPassword(nextValue)}
              secureTextEntry={secureText}
              accessoryRight={SecureTextIcon}
            />
            <Button status="primary" onPress={() => onSignInPressed()}>
              Sign In
            </Button>
          </View>
          <View style={styles.footerContainer}>
            <Text style={styles.labelPrivacy}>
              By signing up, you agree to the
              <Text style={styles.bold}> Term of Service</Text> and
              <Text style={styles.bold}> Privacy Policy</Text>
            </Text>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => navigation.navigate(Routes.SIGNUP)}
            >
              <Text style={styles.loginButtonText}>
                Don't have an account? Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Layout>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#ccc",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#ccc",
  },
  root: {
    flex: 1,
  },
  headerContainer: {
    flex: 1.5,
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  title: {
    fontSize: 52,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 24,
  },
  inputContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  footerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  buttonSubmit: {
    paddingHorizontal: 50,
    width: "100%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: "#0000dd",
  },
  submitText: {
    color: "white",
    fontSize: 16,
  },
  labelPrivacy: {
    fontSize: 16,
    fontWeight: "400",
    alignSelf: "center",
    textAlign: "center",
  },
  loginButton: {
    alignSelf: "center",
  },
  loginButtonText: {
    color: "green",
  },
  bold: {
    fontWeight: "bold",
  },
});
