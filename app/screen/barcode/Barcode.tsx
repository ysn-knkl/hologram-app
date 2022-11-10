import {
  Linking,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableHighlight,
  View,
} from "react-native";
import React, { useState } from "react";
import { Text, Layout, Input, Button } from "@ui-kitten/components";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addBarcode } from "../../redux/features/barcodeSlice";
import { Camera, CameraType } from "react-native-camera-kit";
import CameraKitCameraScreen from 'react-native-camera-kit';

type Props = {};

const Barcode = (props: Props) => {
  const [value, setValue] = useState("");
  const [qrvalue, setQrvalue] = useState("");
  const [opneScanner, setOpneScanner] = useState(false);

  const dispatch = useAppDispatch();
  const { barcodeList } = useAppSelector((state) => state.barcode);

  const onOpenlink = () => {
    // If scanned then function to open URL in Browser
    Linking.openURL(qrvalue);
  };

  const onBarcodeScan = (qrvalue: React.SetStateAction<string>) => {
    // Called after te successful scanning of QRCode/Barcode
    setQrvalue(qrvalue);
    setOpneScanner(false);
  };

  const handleSend = () => {
    dispatch(addBarcode(Number(value)));
    setValue("");
  };

  const onOpneScanner = () => {
    // To Start Scanning
    if (Platform.OS === "android") {
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // If CAMERA Permission is granted
            setQrvalue("");
            setOpneScanner(true);
          } else {
            console.log("CAMERA permission denied");
          }
        } catch (err) {
          console.log("Camera permission err", err);
          console.warn(err);
        }
      }
      // Calling the camera permission function
      requestCameraPermission();
    } else if (Platform.OS === "ios") {
      console.log(1111);
      async function requestCameraPermissionIos() {
        try {
          const isCameraAuthorized =
            await Camera.checkDeviceCameraAuthorizationStatus();
          const isUserAuthorizedCamera =
            await Camera.requestDeviceCameraAuthorization();

          if (isCameraAuthorized === true && isUserAuthorizedCamera === true) {
            setQrvalue("");
            setOpneScanner(true);
          } else {
            console.log("CAMERA permission denied11");
          }
        } catch (error) {
          console.log("CAMERA permission denied11");
        }
      }
      requestCameraPermissionIos();
    }
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
      {opneScanner ? (
        <View style={{ flex: 1 }}>
          <CameraKitCameraScreen
            showFrame={false}
            // Show/hide scan frame
            scanBarcode={true}
            // Can restrict for the QR Code only
            laserColor={"blue"}
            // Color can be of your choice
            frameColor={"yellow"}
            // If frame is visible then frame color
            colorForScannerFrame={"black"}
            // Scanner Frame color
            onReadCode={(event: { nativeEvent: { codeStringValue: React.SetStateAction<string>; }; }) =>
              onBarcodeScan(event.nativeEvent.codeStringValue)
            }
          />
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.titleText}>
            Barcode and QR Code Scanner using Camera in React Native
          </Text>
          <Text style={styles.textStyle}>
            {qrvalue ? "Scanned Result: " + qrvalue : ""}
          </Text>
          {qrvalue.includes("https://") ||
          qrvalue.includes("http://") ||
          qrvalue.includes("geo:") ? (
            <TouchableHighlight onPress={onOpenlink}>
              <Text style={styles.textLinkStyle}>
                {qrvalue.includes("geo:") ? "Open in Map" : "Open Link"}
              </Text>
            </TouchableHighlight>
          ) : null}
          <TouchableHighlight
            onPress={onOpneScanner}
            style={styles.buttonStyle}
          >
            <Text style={styles.buttonTextStyle}>Open QR Scanner</Text>
          </TouchableHighlight>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Barcode;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },

  inputContainer: {
    flex: 1,
    width: "90%",
    flexDirection: "column",
    justifyContent: "center",
  },
  input: {
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    alignItems: "center",
  },
  titleText: {
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
  },
  textStyle: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
    padding: 10,
    marginTop: 16,
  },
  buttonStyle: {
    fontSize: 16,
    color: "white",
    backgroundColor: "green",
    padding: 5,
    minWidth: 250,
  },
  buttonTextStyle: {
    padding: 5,
    color: "white",
    textAlign: "center",
  },
  textLinkStyle: {
    color: "blue",
    paddingVertical: 20,
  },
});
