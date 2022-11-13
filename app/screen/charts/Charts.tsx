import { Dimensions, SafeAreaView, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { PieChart } from "react-native-chart-kit";
import { Layout } from "@ui-kitten/components";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addChartList } from "../../redux/features/chartSlice";
import { getService } from "../../api/getService";

const chartConfig = {
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  useShadowColorFromDataset: false, // optional
};

const Charts = () => {
  const screenWidth = Dimensions.get("window").width;
  const { chartList } = useAppSelector((state) => state.chart);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!chartList) getService("population").then((data) => dispatch(addChartList(data)));
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <Layout style={styles.container}>
        {chartList && (
          <PieChart
            data={chartList}
            backgroundColor="transparent"
            width={screenWidth}
            height={250}
            chartConfig={chartConfig}
            accessor={"population"}
            paddingLeft={"10"}
            center={[0, 0]}
            avoidFalseZero={false}
          />
        )}
      </Layout>
    </SafeAreaView>
  );
};

export default Charts;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
