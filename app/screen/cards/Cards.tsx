import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import React, { useCallback, useEffect } from "react";
import {  Layout } from "@ui-kitten/components";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import CardItems from "../../components/cards/CardItems";
import { addProduct, likeProduct } from "../../redux/features/cardSlice";
import { getService } from "../../api/getService";
import { IProduct } from "../../redux/models/modals";

const Cards = () => {
  const { productList } = useAppSelector((state) => state.card);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (productList.length === 0)
      getService("products").then((data) => dispatch(addProduct(data)));
  }, []);

  const likeClick = useCallback(
    (id: number) => {
      dispatch(likeProduct(id));
    },
    [productList]
  );

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <Layout style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {productList.map((item: IProduct, i: React.Key | null | undefined) => (
            <CardItems item={item} key={`product-${i}`} onClick={likeClick} />
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
