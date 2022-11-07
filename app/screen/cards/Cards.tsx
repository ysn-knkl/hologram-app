import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import React, { useCallback } from "react";
import { Layout } from "@ui-kitten/components";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import CardItems, { Product } from "../../components/cards/CardItems";
import { likeProduct } from "../../redux/features/cardSlice";

type Props = {};

const Cards = (props: Props) => {
  const { productList } = useAppSelector((state) => state.card);
  const dispatch = useAppDispatch();

  const onClick = useCallback(
    (id: number) => {
      const unchangedItems = productList.filter(
        (item: Product) => item.id !== id
      );
      const manupulatedItems = productList.find(
        (item: Product) => item.id === id
      );
      if (!manupulatedItems) return;

      const newItem = {
        ...manupulatedItems,
        like: !manupulatedItems?.like,
      };
      const newList = [...unchangedItems, newItem].sort((a, b) => a.id - b.id);
      dispatch(likeProduct(newList));
    },
    [productList]
  );

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
