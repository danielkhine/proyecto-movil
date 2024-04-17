import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import { useState } from "react";
import SubjectItem from "../components/SubjectItem";
import ActiveButton from "../components/ActiveButton";
import AppFormPicker from "../components/forms/AppFormPicker";
import { calculateSubjectAverage, calculateTotalAverage } from "../hooks/calculateAverage";

import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  grade: Yup.string().required().max(1).label("Grade"),
  subject: Yup.object().required().label("Subject"),
  examType: Yup.object().required().label("Exam type"),
  note: Yup.string().label("Note"),
})

function HomeScreen({ navigation }) {
  const [subjects, setSubjects] = useState([
    { id: 1, name: "Matemáticas", color: "blue", checked: false, grades: [{id: 1, type: "Examen", value: 2}, {id: 2, type: "Tarea improvisada", value: 4}, {id: 3, type: "Consulta", value: 6}, {id: 4, type: "Examen", value: 2}] },
    { id: 2, name: "Alemán", color: "orange", checked: false, grades: [{id: 1, type: "Examen", value: 2}, {id: 2, type: "Tarea improvisada", value: 4}, {id: 3, type: "Consulta", value: 6}, {id: 4, type: "Examen", value: 2}] },
    { id: 3, name: "Inglés", color: "green", checked: false, grades: [{id: 1, type: "Examen", value: 2}, {id: 2, type: "Tarea improvisada", value: 4}, {id: 3, type: "Consulta", value: 6}, {id: 4, type: "Examen", value: 2}] },
    { id: 4, name: "Francés", color: "blue", checked: false, grades: [{id: 1, type: "Examen", value: 2}, {id: 2, type: "Tarea improvisada", value: 4}, {id: 3, type: "Consulta", value: 6}, {id: 4, type: "Examen", value: 2}] },
    { id: 5, name: "Latín", color: "orange", checked: false, grades: [{id: 1, type: "Examen", value: 2}, {id: 2, type: "Tarea improvisada", value: 4}, {id: 3, type: "Consulta", value: 6}, {id: 4, type: "Examen", value: 2}] },
    { id: 6, name: "Español", color: "orange", checked: false, grades: [{id: 1, type: "Examen", value: 2}, {id: 2, type: "Tarea improvisada", value: 4}, {id: 3, type: "Consulta", value: 6}, {id: 4, type: "Examen", value: 2}] },
    { id: 7, name: "Física", color: "orange", checked: false, grades: [{id: 1, type: "Examen", value: 2}, {id: 2, type: "Tarea improvisada", value: 4}, {id: 3, type: "Consulta", value: 6}, {id: 4, type: "Examen", value: 2}] },
  ]);

  const [grades, setGrades] = useState([
    { id: 1, name: "Examen", checked: false },
    { id: 2, name: "Tarea improvisada", checked: false },
  ]);

  const [modalVisible, setModalVisible] = useState(false);

  const TotalAverage = calculateTotalAverage(subjects);

  return (
    <Screen>
      <Text style={styles.title}>Hola, Daniel!</Text>
      <View style={styles.container}>
        <View style={styles.header}>
        <AppText style={styles.subTitle}>Tu promedio de calificaciones</AppText>
        <Text style={styles.gradeText}>{TotalAverage}</Text>
        <ActiveButton
          icon="plus"
          size={40}
          text="Añadir la Nota "
          fontSize={18}
          onPress={() => {
            setModalVisible(true);
          }}
          style={styles.button_container}
        />
        </View>
        <Modal visible={modalVisible} animationType="slide">
          <Screen>
            <View style={styles.buttonModal}>
              <ActiveButton
                icon="close"
                size={40}
                onPress={() => {
                  setModalVisible(false);
                }}
              />
            </View>
            <AppForm
              initialValues={{
                grade: "",
                subject: null,
                examType: null,
                note: "",
              }}
              onSubmit={(values) => console.log(values)}
              validationSchema={validationSchema}
            >
              <View style={styles.formfield_container}>
                <AppText>Ingrese su calificación</AppText>
                <AppFormField
                  placeholder="Nota"
                  autoCapitalize="none"
                  autoCorrect={false}
                  icon="school"
                  name="grade"
                  fontSize={18}
                  width={120}
                />
              </View>
              <View style={styles.picker_container}>
                <AppText>Elige el tema.</AppText>
                <AppFormPicker
                  subject={true}
                  title="Seleccionar tema"
                  name="subject"
                  data={subjects}
                  setData={setSubjects}
                  selectOne={true}
                />
                <AppText>Elija el tipo de calificación que desee.</AppText>
                <AppFormPicker
                  title="Tipo de examen"
                  name="examType"
                  data={grades}
                  setData={setGrades}
                />
              </View>
              <View>
                <AppFormField
                  placeholder="Nota"
                  autoCapitalize="none"
                  autoCorrect={false}
                  icon="note"
                  name="note"
                  placeholderTextColor="#c3cdca"
                  textColor="#FFD700"
                  fontSize={18}
                />
              </View>
              <View style={styles.button}>
                <SubmitButton
                  title="Guardar"
                  onPress={() => {
                    setModalVisible(true);
                  }}
                />
              </View>
            </AppForm>
          </Screen>
        </Modal>
        <View style={styles.list__container}>
          <AppText style={[styles.subTitle, styles.list__title]}>
            Tus Matérias
          </AppText>
          <FlatList
  style={styles.list}
  data={subjects}
  renderItem={({ item }) => {
    const averageGrade = calculateSubjectAverage(item.grades);
    return (
      <SubjectItem
        title={item.name}
        grade={averageGrade}
        color={item.color}
        bgColor="#002366"
        onPress={() => {
          navigation.navigate("Subject", item);
        }}
      />
    );
  }}
  keyExtractor={(item) => item.id}
  scrollEnabled={true}
/>

        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 70
  },
  button_container: {
    maxWidth: 250,
    marginBottom: 20,
  },
  gradeText: {
    fontSize: 55,
    color: "#FFD700",
   
    fontWeight: "700",
  },
  title: {
    fontSize: 45,
    color: "#FFD700",
    fontWeight: "700",
  },
  subTitle: {
    fontWeight: "700",
  },
  icon: {
    backgroundColor: "#FFD700",
    position: "relative",
    top: 50,
    left: 120,
  },
  list__container: {
    backgroundColor: "#002395",
    maxHeight: 450,
    padding: 10,
  },
  list: {
    padding: 10,
  },
  list__title: {
    paddingBottom: 10,
  },
  buttonModal: {
    display: "flex",
    alignItems: "flex-end",
  },
  formfield_container: {
    marginTop: 20,
  },
  picker_container: {
    marginVertical: 20,
  },
  title: {
    fontSize: 45,
    color: "#FFD700",
    fontWeight: "700",

  },
  button: {
    marginVertical: 50,
  },
  header: {
    alignItems:"center"
  }
});

export default HomeScreen;
