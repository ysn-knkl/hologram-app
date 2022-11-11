import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { Modal, Button, Text, Card } from "@ui-kitten/components";
import AntDesign from "react-native-vector-icons/AntDesign";

type Props = {
  visibleAlert: string;
  setVisibleAlert: (value: string) => void;
};

const CustomAlert = (props: Props) => {
  const { visibleAlert, setVisibleAlert } = props;
  return (
    <Modal
      style={styles.container}
      visible={!!visibleAlert}
      backdropStyle={styles.backdrop}
      onBackdropPress={() => setVisibleAlert("")}
    >
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={{ alignSelf: "flex-end" }}
          onPress={() => setVisibleAlert("")}
        >
          <AntDesign name="close" size={18} />
        </TouchableOpacity>
        <Text>{visibleAlert}</Text>
      </View>
    </Modal>
  );
};

export default CustomAlert;

const styles = StyleSheet.create({
  container: {},
  buttonContainer: {
    backgroundColor: "white",
    paddingBottom: 20,
    paddingTop: 5,
    paddingHorizontal: 25,
    borderRadius: 12,
    flex: 1,
    justifyContent: "space-evenly",
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
