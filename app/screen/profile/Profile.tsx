import { SafeAreaView, StyleSheet, View } from "react-native";
import React from "react";
import { Toggle, Text, Layout } from "@ui-kitten/components";
import { ThemeContext } from "../../context/theme-context";

type Props = {};

const Profile = (props: Props) => {
  const themeContext = React.useContext(ThemeContext);
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
