import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { Text, Card } from "@ui-kitten/components";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export type Product = {
  id: number;
  name: string;
  image_url: string;
  price: string;
  like: boolean;
};

type Props = {
  item: Product;
  onClick: (id: number) => void;
};

const Header = (props: Props) => {
  const { image_url, like, id } = props.item;
  const onClick = props.onClick;

  return (
    <>
      <Image
        source={{
          uri: image_url,
        }}
        style={styles.image}
      />
      <TouchableOpacity style={styles.heartIcon} onPress={() => onClick(id)}>
        <MaterialCommunityIcons
          name="heart-multiple"
          size={25}
          color={like ? "red" : "gray"}
        />
      </TouchableOpacity>
    </>
  );
};

const CardItems = (props: Props) => {
  return (
    <Card style={styles.card} header={Header(props)}>
      <View style={[styles.footerContainer]}>
        <View>
          <Text style={styles.itemName}>{props.item.name}</Text>
          <Text style={styles.itemPrice}>{props.item.price}</Text>
        </View>
      </View>
    </Card>
  );
};

export default CardItems;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 10,
  },
  image: {
    width: "100%",
    height: 150,
    backgroundColor: "white",
    resizeMode: "center",
  },
  heartIcon: {
    position: "absolute",
    right: 15,
    top: 10,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  itemName: {
    fontSize: 15,
    fontWeight: "bold",
  },
  itemPrice: {
    marginTop: 5,
    fontSize: 24,
    color: "grey",
    fontWeight: "bold",
  },
});
