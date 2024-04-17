import React, { useState } from "react";
import { Text, StyleSheet, FlatList, View } from "react-native";
import Screen from "../components/Screen";
import SubjectItem from "../components/SubjectItem";
import {
  calculateSubjectAverage,
  calculateTotalAverage,
} from "../hooks/calculateAverage";

function SubjectScreen() {
  const [subjects, setSubjects] = useState([
    { id: 1, name: "Matemáticas", color: "blue", checked: false, grades: [{id: 1, type: "Klausur", value: 2}, {id: 2, type: "Stegreifaufgabe", value: 4}, {id: 3, type: "Abfrage", value: 6}, {id: 4, type: "Klausur", value: 2}] },
    { id: 2, name: "Alemán", color: "orange", checked: false, grades: [{id: 1, type: "Klausur", value: 2}, {id: 2, type: "Stegreifaufgabe", value: 4}, {id: 3, type: "Abfrage", value: 6}, {id: 4, type: "Klausur", value: 2}] },
    { id: 3, name: "Inglés", color: "green", checked: false, grades: [{id: 1, type: "Klausur", value: 2}, {id: 2, type: "Stegreifaufgabe", value: 4}, {id: 3, type: "Abfrage", value: 6}, {id: 4, type: "Klausur", value: 2}] },
    { id: 4, name: "Francés", color: "blue", checked: false, grades: [{id: 1, type: "Klausur", value: 2}, {id: 2, type: "Stegreifaufgabe", value: 4}, {id: 3, type: "Abfrage", value: 6}, {id: 4, type: "Klausur", value: 2}] },
    { id: 5, name: "Latín", color: "orange", checked: false, grades: [{id: 1, type: "Klausur", value: 2}, {id: 2, type: "Stegreifaufgabe", value: 4}, {id: 3, type: "Abfrage", value: 6}, {id: 4, type: "Klausur", value: 2}] },
    { id: 6, name: "Español", color: "orange", checked: false, grades: [{id: 1, type: "Klausur", value: 2}, {id: 2, type: "Stegreifaufgabe", value: 4}, {id: 3, type: "Abfrage", value: 6}, {id: 4, type: "Klausur", value: 2}] },
    { id: 7, name: "Física", color: "orange", checked: false, grades: [{id: 1, type: "Klausur", value: 2}, {id: 2, type: "Stegreifaufgabe", value: 4}, {id: 3, type: "Abfrage", value: 6}, {id: 4, type: "Klausur", value: 2}] },
    { id: 8, name: "Biología", color: "green", checked: false, grades: [{id: 1, type: "Klausur", value: 2}, {id: 2, type: "Stegreifaufgabe", value: 4}, {id: 3, type: "Abfrage", value: 6}, {id: 4, type: "Klausur", value: 2}] },

  ]);

  const TotalAverage = calculateTotalAverage(subjects);

  return (
    <Screen>
      <View style={styles.header}>
        <View>
          <Text style={styles.title_1}>Mis</Text>
          <Text style={styles.title_2}>Asignaturas</Text>
        </View>
        <Text style={styles.title_2}>⌀ {TotalAverage}</Text>
      </View>
      <FlatList
        data={subjects}
        keyExtractor={(subject) => subject.name}
        renderItem={({ item }) => {
          const averageGrade = calculateSubjectAverage(item.grades);
          return (
            <SubjectItem
              title={item.name}
              grade={averageGrade}
              color={item.color}
              bgColor="#002395"
              onPress={() => navigation.navigate("Subject", item)}
            />
          );
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
  title_1: {
    fontSize: 23,
    color: "#FFD700",
  },
  title_2: {
    fontSize: 36,
    color: "#FFD700",
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default SubjectScreen;
