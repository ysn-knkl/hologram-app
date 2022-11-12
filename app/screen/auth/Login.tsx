import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { Button, Text, Input } from "@ui-kitten/components";
import {
  AppContextInterface,
  AuthContext,
} from "../../navigation/AuthProvider";
import { ScreenProps } from "../../redux/models/modals";

export default function Login(Props: ScreenProps) {
  const { navigation } = Props;

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { login } = useContext(AuthContext) as AppContextInterface;

  const onSignInPressed = () => {
    login(email, password);
  };

  return (
    <View style={style.root}>
      <View style={style.headerContainer}>
        <Text style={style.title}>Welcome Hologram App</Text>
        <Text style={style.subTitle}>Enjoy the App</Text>
      </View>
      <View style={style.inputContainer}>
        <Input
          placeholder="Email"
          value={email}
          onChangeText={(nextValue) => setEmail(nextValue)}
        />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={(nextValue) => setPassword(nextValue)}
        />

        {/* <CustomInput
          placeholder={"Email"}
          label="E-mail"
          value={name}
          setValue={setName}
          icon="mail"
        />
        <CustomInput
          placeholder={"Password"}
          label="Password"
          value={password}
          setValue={setPassword}
          icon="lock1"
          hide={true}
        /> */}
        <Button onPress={() => onSignInPressed()}>Sign In</Button>
      </View>
      <View style={style.footerContainer}>
        <Text style={style.labelPrivacy}>
          By signing up, you agree to the
          <Text style={{ fontWeight: "bold" }}> Term of Service</Text> and
          <Text style={{ fontWeight: "bold" }}> Privacy Policy</Text>
        </Text>
        <TouchableOpacity
          style={style.loginButton}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={style.loginButtonText}>
            Don't have an account? Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#ccc",
    paddingHorizontal: 20,
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
});
