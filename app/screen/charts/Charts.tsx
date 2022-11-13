import { Dimensions, SafeAreaView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { PieChart } from "react-native-chart-kit";
import { Layout, Spinner } from "@ui-kitten/components";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addChartList } from "../../redux/features/chartSlice";
import { getService } from "../../api/getService";

const chartConfig = {
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  useShadowColorFromDataset: false, // optional
};

const Charts = () => {
  const screenWidth = Dimensions.get("window").width;
  const [loading, setLoading] = useState(false);
  const { chartList } = useAppSelector((state) => state.chart);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!chartList) {
      setLoading(true);
      getService("population")
        //Service'den gelen dataların redux'a setlenmesi
        .then((data) => dispatch(addChartList(data)))
        //Loading spinner gözükmesi için 500ms geciktirdim
        .finally(() => setTimeout(() => setLoading(false), 500));
    }
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <Layout style={styles.container}>
        {chartList && !loading && (
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
        {loading && <Spinner status="success" />}
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
