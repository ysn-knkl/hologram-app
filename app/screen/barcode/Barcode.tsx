import { SafeAreaView, StyleSheet, View } from "react-native";
import React from "react";
import { Text, Layout, Input, Button } from "@ui-kitten/components";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addBarcode } from "../../redux/features/barcodeSlice";

type Props = {};

const Barcode = (props: Props) => {
  const [value, setValue] = React.useState("");
  const dispatch = useAppDispatch();
  const { barcodeList } = useAppSelector((state) => state.barcode);
  
  const handleSend = () => {
    dispatch(addBarcode(Number(value)));
    setValue("");
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <Layout style={styles.container}>
        <View style={styles.inputContainer}>
          <Input
            style={styles.input}
            value={value}
            placeholder="Barcode"
            keyboardType="numeric"
            status="primary"
            onChangeText={(nextValue) => setValue(nextValue)}
          />
          <Button onPress={handleSend}>Send</Button>
        </View>

        {barcodeList &&
          barcodeList.map((item, i) => {
            return <Text key={i}>{item}</Text>;
          })}
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
    width: "100%",
    alignItems:"center"
  },
  inputContainer: {
    flex:1,
    width: "90%",
    flexDirection: "column",
    justifyContent:"center",
  },
  input: {
    marginBottom: 10,
  },
});
