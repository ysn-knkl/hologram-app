import { SafeAreaView, StyleSheet, View } from "react-native";
import React from "react";
import { Text, Layout } from "@ui-kitten/components";

type Props = {};

const Barcode = (props: Props) => {
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <Layout style={styles.container}>
        <Text>Barcode</Text>
      </Layout>
    </SafeAreaView>
  );
};

export default Barcode;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});
