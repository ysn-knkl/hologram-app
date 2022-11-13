import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
} from "react-native";
import React, { useContext, useState } from "react";

import {
  AppContextInterface,
  AuthContext,
} from "../../navigation/AuthProvider";
import { Input, Button, Text, Layout } from "@ui-kitten/components";
import { ScreenProps } from "../../redux/models/modals";
import { Routes } from "../../constant/routes";
import AntDesign from "react-native-vector-icons/AntDesign";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
AntDesign.loadFont();

export default function SignUp(Props: ScreenProps) {
  const { navigation } = Props;
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [secureText, setSecureText] = useState(true);

  const { register } = useContext(AuthContext) as AppContextInterface;

  const onSignUpPressed = () => {
    if (password.toLocaleLowerCase() === passwordConfirm.toLocaleLowerCase()) {
      register(email, password);
    }else{
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: "ERROR",
        textBody: "Your Password don't match",
        button: "ok",
        closeOnOverlayTap: true,
      });
    }
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
            <Text style={styles.title}>Welcome Yasin's App</Text>
            <Text style={styles.subTitle}>Create an account</Text>
          </View>
          <View style={styles.inputContainer}>
            <Input
              placeholder={"E-mail"}
              label="E-mail"
              value={email}
              onChangeText={(nextValue) => setEmail(nextValue)}
            />
            <Input
              placeholder={"Password"}
              label="Password"
              value={password}
              onChangeText={(nextValue) => setPassword(nextValue)}
              secureTextEntry={secureText}
              accessoryRight={SecureTextIcon}
            />
            <Input
              placeholder={"Confirm Password"}
              label="Confirm Password"
              value={passwordConfirm}
              onChangeText={(nextValue) => setPasswordConfirm(nextValue)}
              secureTextEntry={secureText}
              accessoryRight={SecureTextIcon}
            />
            <Button onPress={onSignUpPressed}>Sign Up</Button>
          </View>
          <View style={styles.footerContainer}>
            <Text style={styles.labelPrivacy}>
              By registering, you confirm that you accept our
              <Text style={styles.textBold}> Term of Service</Text> and{" "}
              <Text style={styles.textBold}>Privacy Policy</Text>
            </Text>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => navigation.navigate(Routes.LOGIN)}
            >
              <Text style={styles.loginButtonText}>
                Have an account? Sign In
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
  textBold: {
    fontWeight: "bold",
  },
  footerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
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
});
