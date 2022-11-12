import { SafeAreaView, StyleSheet, View } from "react-native";
import React, { useContext } from "react";
import { Button, Toggle, Text, Layout } from "@ui-kitten/components";
import { ThemeContext } from "../../context/theme-context";
import { AuthContext, AppContextInterface} from "../../navigation/AuthProvider";

type Props = {};

const Profile = (props: Props) => {
  const themeContext = useContext(ThemeContext);
  const { logout, user } = useContext(AuthContext) as AppContextInterface;

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <Layout style={styles.container}>
        <Text>Profile</Text>
        <Toggle
          checked={themeContext.theme === "dark"}
          onChange={() => themeContext.toggleTheme()}
        >
          {`Theme: ${themeContext.theme}`}
        </Toggle>
        <Button onPress={() => logout()}>Log out</Button>
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
  },
});
