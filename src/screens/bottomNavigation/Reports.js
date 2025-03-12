import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Reports = () => {
  return (
    <View style={styles.container}>
      <Text>Reports Screen Name</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Reports;
