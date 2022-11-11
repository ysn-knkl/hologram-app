import {
  Dimensions,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  Text,
  Layout,
  Input,
  Button,
  Modal,
  Card,
} from "@ui-kitten/components";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addBarcode } from "../../redux/features/barcodeSlice";
import { Camera, CameraType, CameraScreen } from "react-native-camera-kit";
import CustomAlert from "../../components/CustomAlert";

type Props = {};

const Barcode = (props: Props) => {
  const [qrvalue, setQrvalue] = useState("");
  const [opneScanner, setOpneScanner] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleAlert, setVisibleAlert] = useState("");

  const dispatch = useAppDispatch();

  const { barcodeList } = useAppSelector((state) => state.barcode);

  const onBarcodeScan = (qrvalue: React.SetStateAction<string>) => {
    // Called after te successful scanning of QRCode/Barcode
    setQrvalue(qrvalue);
    dispatch(addBarcode(Number(qrvalue)));
    setQrvalue("");
    setOpneScanner(false);
  };

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
        setVisibleAlert("CAMERA permission denied");
      }
    } catch (error) {
      setVisibleAlert("CAMERA permission denied");
    }
  }

  const onOpneScanner = async () => {
    setVisible(true);
    // To Start Scanning
    if (Platform.OS === "android") {
      // Calling the camera permission function
      requestCameraPermission();
    } else if (Platform.OS === "ios") {
      requestCameraPermissionIos();
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <Layout style={styles.layoutContainer}>
        <CustomAlert
          visibleAlert={visibleAlert}
          setVisibleAlert={setVisibleAlert}
        />
        <Button
          onPress={() => {
            setVisibleAlert("asd");
          }}
        >
          deneme
        </Button>

        {opneScanner ? (
          <></>
        ) : (
          <View style={styles.container}>
            <Text style={styles.titleText}>
              Barcode and QR Code Scanner using Camera in React Native
            </Text>
            <TouchableHighlight
              onPress={onOpneScanner}
              style={styles.buttonStyle}
            >
              <Text style={styles.buttonTextStyle}>Open Barcode Scanner</Text>
            </TouchableHighlight>
          </View>
        )}

        {!opneScanner && (
          <>
            <Text>Added Barcode</Text>
            {barcodeList &&
              barcodeList.map((i) => {
                return <Text> {i}</Text>;
              })}
          </>
        )}

        <Modal
          visible={opneScanner}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => setOpneScanner(false)}
        >
          <View
            style={{
              width: Dimensions.get("window").width,
              height: Dimensions.get("window").height,
            }}
          >
            <Button onPress={() => setOpneScanner(false)}>DISMISS</Button>
            <Camera
              style={{
                width: Dimensions.get("window").width,
                height: Dimensions.get("window").height,
              }}
              cameraType={CameraType.Back}
              scanBarcode={true}
              onReadCode={(event: {
                nativeEvent: {
                  codeStringValue: React.SetStateAction<string>;
                };
              }) => onBarcodeScan(event.nativeEvent.codeStringValue)}
              showFrame={true} // (default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner,that stoped when find any code. Frame always at center of the screen
              laserColor={"blue"} // (default red) optional, color of laser in scanner frame
              frameColor={"red"} // (default white) optional, color of border of scanner frame
              focusMode={"false"}
              cameraRatioOverlay={undefined}
              captureButtonImage={undefined}
              captureButtonImageStyle={{}}
              cameraFlipImage={undefined}
              cameraFlipImageStyle={{}}
              hideControls={undefined}
              torchOnImage={undefined}
              torchOffImage={undefined}
              torchImageStyle={{}}
              onBottomButtonPressed={function (event: any): void {
                throw new Error("Function not implemented.");
              }}
            />
          </View>
        </Modal>
      </Layout>
    </SafeAreaView>
  );
};

export default Barcode;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  layoutContainer: {
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
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
