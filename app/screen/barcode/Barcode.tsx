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
import React, { useCallback, useState } from "react";
import {
  Text,
  Layout,
  Button,
  Modal,
  Card,
  styled,
} from "@ui-kitten/components";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addBarcode } from "../../redux/features/barcodeSlice";
import { Camera, CameraType, CameraScreen } from "react-native-camera-kit";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { ALERT_TYPE, Dialog, Toast } from "react-native-alert-notification";

type Props = {};

const Barcode = (props: Props) => {
  const [opneScanner, setOpneScanner] = useState(false);

  const dispatch = useAppDispatch();

  const { barcodeList } = useAppSelector((state) => state.barcode);

  const onBarcodeScan = useCallback((barcodeValue: string) => {
    dispatch(addBarcode(barcodeValue));
    setOpneScanner(false);
  }, []);

  async function requestCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setOpneScanner(true);
      } else {
        Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: "ERROR",
          textBody: "You Dont Have Camera Access Permission",
          button: "ok",
          closeOnOverlayTap: true,
        });
      }
    } catch (err) {
      {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: "ERROR",
          textBody: "Something Wrong",
          button: "ok",
          closeOnOverlayTap: true,
        });
      }
    }
  }

  async function requestCameraPermissionIos() {
    try {
      const isCameraAuthorized =
        await Camera.checkDeviceCameraAuthorizationStatus();
      const isUserAuthorizedCamera =
        await Camera.requestDeviceCameraAuthorization();

      if (isCameraAuthorized === true && isUserAuthorizedCamera === true) {
        setOpneScanner(true);
      } else {
        console.log("CAMERA permission denied");
      }
    } catch (error) {
      console.log("CAMERA permission denied");
    }
  }

  const onOpneScanner = useCallback(async () => {
    // To Start Scanning
    if (Platform.OS === "android") {
      // Calling the camera permission function
      requestCameraPermission();
    } else if (Platform.OS === "ios") {
      requestCameraPermissionIos();
    }
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <Layout style={styles.layoutContainer}>
        {!opneScanner && (
          <View style={styles.container}>
            <Text style={styles.titleText} category="h3">
              Please Use This Button for scan a Barcode
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
          <View style={styles.barcodeListContainer}>
            <Text category="h4" style={styles.barcodeListTitle}>
              Your Barcode List
            </Text>
            <ScrollView>
              {barcodeList.length > 0 ? (
                barcodeList.map((barcodeItem, index) => (
                  <Card
                    style={styles.barcodeListItemContainer}
                    key={`barcodeListItem-${index}`}
                  >
                    <View style={styles.barcodeListItem}>
                      <Text>
                        {index + 1} - <Text>{barcodeItem}</Text>
                      </Text>

                      <Ionicons
                        style={styles.icon}
                        name={"barcode-outline"}
                        size={25}
                      />
                    </View>
                  </Card>
                ))
              ) : (
                <View style={styles.emptyList}>
                  <AntDesign
                    name="infocirlceo"
                    size={20}
                    color="orange"
                    style={styles.icon}
                  />
                  <Text>Dont have any barcode</Text>
                </View>
              )}
            </ScrollView>
          </View>
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
                  codeStringValue: string;
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
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    padding: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  titleText: {
    textAlign: "center",
  },
  barcodeListContainer: {
    flex: 3,
    padding: 5,
  },
  barcodeListTitle: {
    alignSelf: "center",
    marginVertical: 5,
  },
  barcodeListItemContainer: {
    margin: 5,
  },
  barcodeListItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  icon: {
    marginRight: 10,
  },
  emptyList: {
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "center",
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
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
