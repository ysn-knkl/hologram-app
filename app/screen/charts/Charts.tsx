import { Dimensions, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { PieChart } from "react-native-chart-kit";
import { Layout } from "@ui-kitten/components";

type Props = {};
const data = [
  {
    name: "Seoul",
    population: 21500000,
    color: "#dd2222",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Toronto",
    population: 2800000,
    color: "#bbaa33",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Beijing",
    population: 527612,
    color: "#ee44bb",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "New York",
    population: 8538000,
    color: "#333223",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Moscow",
    population: 11920000,
    color: "#111333",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
];

const chartConfig = {
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  useShadowColorFromDataset: false, // optional  
};

const Charts = (props: Props) => {
  const screenWidth = Dimensions.get("window").width;

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <Layout style={styles.container}>
        <PieChart
          data={data}
          width={screenWidth}
          height={250}
          chartConfig={chartConfig}
          accessor={"population"}
          paddingLeft={"10"}
          center={[0, 0]}
          avoidFalseZero={false}
        />
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
    alignItems:"center",
    justifyContent:"center"
  },
});
