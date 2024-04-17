import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AppText from "./AppText";

function SubjectItem({ title, grade, color, bgColor, onPress }) {
  return (
    <TouchableOpacity style={[styles.container, { backgroundColor: bgColor }]} onPress={onPress} >
      <View style={styles.title__container}>
        <View style={[styles.label, { backgroundColor: color }]}></View>
        <AppText >{title}</AppText>
      </View>
      <AppText >{grade}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#002395",
    paddingHorizontal: 20,
    paddingVertical: 15,
    
    marginVertical: 10,
  },
  title__container: {
    flexDirection: "row",
    columnGap: 10,
  },
  text: {
    fontWeight: "700",
  },
  label: {
    height: "auto",
    width: 7,
  },
});

export default SubjectItem;
