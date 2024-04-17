import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

function Button({buttonText, onPress}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
        <Text style={styles.text}>{buttonText}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F0F8FF",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    marginVertical: 10,
  },
  text: {
    color: "#000000",
    fontSize: 21,
    fontWeight: "700"
  }
});

export default Button;