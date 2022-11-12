import { View, StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";

import { AuthContext } from "../../navigation/AuthProvider";
import { Input, Button, Text } from "@ui-kitten/components";

export default function SignUp({ navigation }: any) {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");

  const { register } = useContext(AuthContext);

  const onSignUpPressed = () => {
    if (password.toLocaleLowerCase() === passwordConfirm.toLocaleLowerCase()) {
      register(email, password);
    }
  };

  return (
    <View style={style.root}>
      <View style={style.headerContainer}>
        <Text style={style.title}>Welcome Yasin's App</Text>
        <Text style={style.subTitle}>Create an account</Text>
      </View>
      <View style={style.inputContainer}>
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
        />
        <Input
          placeholder={"Confirm Password"}
          label="Confirm Password"
          value={passwordConfirm}
          onChangeText={(nextValue) => setPasswordConfirm(nextValue)}
        />
        <Button onPress={onSignUpPressed}>Sign Up</Button>
      </View>
      <View style={style.footerContainer}>
        <Text style={style.labelPrivacy}>
          By registering, you confirm that you accept our
          <Text style={style.textBold}> Term of Service</Text> and{" "}
          <Text style={style.textBold}>Privacy Policy</Text>
        </Text>
        <TouchableOpacity
          style={style.loginButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={style.loginButtonText}>Have an account? Sign In</Text>
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
