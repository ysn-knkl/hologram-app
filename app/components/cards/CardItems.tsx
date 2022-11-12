import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { Text, Card } from "@ui-kitten/components";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ThemeContext } from "../../context/theme-context";
MaterialCommunityIcons.loadFont()

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

const CardItems = (props: Props) => {
  const { image_url, like, id } = props.item;
  const themeContext = React.useContext(ThemeContext);
  const onClick = props.onClick;
  return (
    <Card style={styles.card}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.heartIcon} onPress={() => onClick(id)}>
          <MaterialCommunityIcons
            name="heart-multiple"
            size={25}
            color={like ? "red" : "gray"}
          />
        </TouchableOpacity>
      </View>
      <Image
        source={{
          uri: image_url,
        }}
        style={[styles.image,themeContext.theme === "dark" && {backgroundColor:"#222B45"}]}
      />
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
  headerContainer: {
    flexDirection:"row-reverse",
    width: "100%",
  },
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
  heartIcon: {},
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
