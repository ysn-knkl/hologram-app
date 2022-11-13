import { SafeAreaView, StyleSheet, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Toggle,
  Text,
  Layout,
  Input,
  Avatar,
} from "@ui-kitten/components";
import { ThemeContext } from "../../context/theme-context";
import {
  AuthContext,
  AppContextInterface,
} from "../../navigation/AuthProvider";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { updateProfile } from "../../redux/features/profileSlice";
import { IProfile } from "../../redux/models/modals";
AntDesign.loadFont();

const Profile = () => {
  const themeContext = useContext(ThemeContext);
  const { logout, user } = useContext(AuthContext) as AppContextInterface;
  const { profile } = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();
  const [isEdit, setIsEdit] = useState(true);
  const [profileInformation, setProfileInformation] = useState<IProfile>({
    name: "",
    surname: "",
  });

  useEffect(() => {
    return setProfileInformation(profile);
  }, [profile]);

  const handleButton = () => {
    if (isEdit) {
      setIsEdit(false);
    } else {
      setIsEdit(true);
      dispatch(updateProfile(profileInformation));
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <Layout style={styles.container}>
        <View style={styles.inputContainer}>
          <Avatar
            style={styles.avatar}
            size="giant"
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/168/168882.png",
            }}
          />
          <View>
            <Text>Name</Text>
            <Input
              style={styles.input}
              disabled={isEdit}
              value={profileInformation.name}
              placeholder="Name"
              onChangeText={(nextValue) =>
                setProfileInformation({
                  ...profileInformation,
                  name: nextValue,
                })
              }
            />
          </View>
          <View>
            <Text>Surname</Text>
            <Input
              style={styles.input}
              disabled={isEdit}
              value={profileInformation.surname}
              placeholder="Surname"
              onChangeText={(nextValue) =>
                setProfileInformation({
                  ...profileInformation,
                  surname: nextValue,
                })
              }
            />
          </View>
          <Button onPress={() => handleButton()}>
            {isEdit ? "Edit" : "Save"}
          </Button>
        </View>
        <View style={styles.spaceContainer} />
        <View style={styles.buttomContainer}>
          <Text>{user?.email ? user?.email : ""}</Text>
          <Button onPress={() => logout()}>Log out</Button>
          <Toggle
            checked={themeContext.theme === "dark"}
            onChange={() => themeContext.toggleTheme()}
          >
            {`Theme: ${themeContext.theme}`}
          </Toggle>
        </View>
      </Layout>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  inputContainer: {
    flex: 2,
    marginTop: 20,
    justifyContent: "space-evenly",
  },
  spaceContainer: {
    flex: 1,
    justifyContent: "space-evenly",
  },

  input: {
    marginTop: 10,
  },
  avatar: {
    borderWidth: 1,
    borderTopWidth: 10,
    alignSelf: "center",
  },
  buttomContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
