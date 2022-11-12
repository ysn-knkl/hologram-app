import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import React, { useCallback, useEffect } from "react";
import { Button, Layout } from "@ui-kitten/components";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import CardItems from "../../components/cards/CardItems";
import { addProduct, likeProduct } from "../../redux/features/cardSlice";
import * as firebase from "../../firebase";
import { Product } from "../../redux/models/modals";


const Cards = () => {
  const { productList } = useAppSelector((state) => state.card);
  const dispatch = useAppDispatch();

  const onClick = useCallback(
    (id: number) => {
      dispatch(likeProduct(id));
    },
    [productList]
  );

  useEffect(() => {
    const db = firebase.firestore();
    let unsubscribe: any = null;
    if (productList.length === 0) {
      unsubscribe = db.collection("products").onSnapshot((snapshot) => {
        let newCardData: any[] = [];
        snapshot.docs.map((doc, i) => {
          const obj = {
            id: i,
            ...doc.data(),
          };
          newCardData.push(obj);
        });
        dispatch(addProduct(newCardData));
      });
    }
    return () => unsubscribe && unsubscribe();
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <Layout style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {productList.map((item: Product, i: React.Key | null | undefined) => (
            <CardItems item={item} key={`product-${i}`} onClick={onClick} />
          ))}
        </ScrollView>
      </Layout>
    </SafeAreaView>
  );
};

export default Cards;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});
