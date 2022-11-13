import {
  Dimensions,
  PermissionsAndroid,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import { Text, Layout, Button, Modal, Card } from "@ui-kitten/components";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addBarcode, deleteBarcode } from "../../redux/features/barcodeSlice";
import { Camera, CameraType } from "react-native-camera-kit";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
Ionicons.loadFont();
AntDesign.loadFont();

const Barcode = () => {
  const [opneScanner, setOpneScanner] = useState(false);

  const dispatch = useAppDispatch();

  const { barcodeList } = useAppSelector((state) => state.barcode);

  //Scan edilen barcode verilerinin redux'a setlenmesi
  const onBarcodeScan = useCallback((barcodeValue: string) => {
    if(!barcodeList.includes(barcodeValue)){
      barcodeList.includes(barcodeValue.toString())
      dispatch(addBarcode(barcodeValue));
    }else{
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: "ERROR",
        textBody: "This barcode already exist",
        button: "ok",
        closeOnOverlayTap: true,
      });
    }
    setOpneScanner(false);
  }, [barcodeList]);

  //Android cihaz'dan izin talebi
  const requestCameraPermission = useCallback(async () => {
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
  }, []);

  //Ios cihaz'dan izin talebi
  const requestCameraPermissionIos = useCallback(async () => {
    try {
      const isCameraAuthorized =
        await Camera.checkDeviceCameraAuthorizationStatus();
      const isUserAuthorizedCamera =
        await Camera.requestDeviceCameraAuthorization();

      if (isCameraAuthorized === true && isUserAuthorizedCamera === true) {
        setOpneScanner(true);
      } else {
        {
          Dialog.show({
            type: ALERT_TYPE.WARNING,
            title: "ERROR",
            textBody: "You Dont Have Camera Access Permission",
            button: "ok",
            closeOnOverlayTap: true,
          });
        }
      }
    } catch (error) {
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
  }, []);

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

                      <View style={{ flexDirection: "row", alignItems:"center" }}>
                        <Ionicons
                          style={styles.icon}
                          name={"barcode-outline"}
                          size={15}
                        />
                        <Pressable onPress={()=>dispatch(deleteBarcode(barcodeItem))}>
                          <AntDesign
                            style={styles.icon}
                            name={"delete"}
                            color="red"
                            size={23}
                          />
                        </Pressable>
                      </View>
                    </View>
                  </Card>
                ))
              ) : (
                <View style={styles.emptyList}>
                  <AntDesign
                    name="infocirlceo"
                    size={20}
                    color="orange"
                    style={styles.margingRight}
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
    marginLeft: 5,
  },
  margingRight:{
    marginRight:10
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
