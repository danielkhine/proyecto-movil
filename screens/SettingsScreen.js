import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Text, Modal, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import Screen from "../components/Screen";
import SettingsContainer from "../components/SettingsContainer";
import SettingsItem from "../components/SettingsItem";
import ActiveButton from "../components/ActiveButton";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  grade: Yup.string().required("Die Klasse muss angegeben werden").max(2, "Die Zahl darf höchstens zwei Charaktere haben").matches(/^[0-9]+$/, 'Bitte nur Zahlen eingeben').label("Grade"),
  label: Yup.string().max(5).label("Label"),
});

function SettingsScreen({ navigation }) {

  const [modalVisible, setModalVisible] = useState("false");

  const [contentHeight, setContentHeight] = useState(0);

  const handleContentLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setContentHeight(height);
  };

  useEffect(() => {
    if (modalVisible) {
      setContentHeight(0);
    }
  }, [modalVisible]);

  const [label, setLabel] = useState("10e");
  const [grade, setGrade] = useState("10")

  const handleSubmit = (values) => {
    setGrade(values.grade);
    setLabel(values.label);
    setModalVisible(false);
  }

  return (
    <Screen>
      <Text style={styles.title}>Ajustes</Text>
      <SettingsContainer heading="Daniel Lopez">
        <SettingsItem title="Perfil" onPress={() => navigation.navigate("Profile")} />
      </SettingsContainer>
      <SettingsContainer heading={grade + ". Clase " + label}>
        <SettingsItem title="Cambio de clase" onPress={() => setModalVisible(true)} />
        <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <View style={styles.modalOutside}></View>
          </TouchableOpacity>
          <KeyboardAvoidingView behavior={'padding' }>
          <View
            style={[
              styles.modalContent,
              { height: contentHeight > 0 ? contentHeight : "auto" },
            ]}
            onLayout={handleContentLayout}
          >
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
                grade: grade,
                label: label
              }}
              onSubmit={(values) => handleSubmit(values)}
              validationSchema={validationSchema}
            >
              <AppFormField
                  placeholder="Klasse"
                  autoCapitalize="none"
                  autoCorrect={false}
                  icon="school"
                  name="grade"
                  fontSize={18}
                  width={120}
                  backgroundColor="#002366"
                />
                <AppFormField
                  placeholder="Bezeichnung"
                  autoCapitalize="none"
                  autoCorrect={false}
                  icon="script-text"
                  name="label"
                  fontSize={18}
                  width={200}
                  backgroundColor="#002366"
                />
                <SubmitButton
                  title="Speichern"
                />
                </AppForm>
                </View>
                </KeyboardAvoidingView>
                </View>
                </Modal>
        <SettingsItem title="Sistema de valoración" />
        <SettingsItem title="Cambiar año escolar" />
      </SettingsContainer>
      <Text style={[styles.subTitle]}>Enlaces</Text>
      <SettingsContainer>
        <SettingsItem title="Ayuda" />
        <SettingsItem title="Soporte de contacto" />
        <SettingsItem title="Recomendar" />
        <SettingsItem title="Calificanos" />
      </SettingsContainer>
      <SettingsContainer>
        <SettingsItem title="Condiciones de uso" />
        <SettingsItem title="Política de privacidad" />
      </SettingsContainer>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 36,
    color: "#FFD700",
    fontWeight: "700",
  },
  subTitle: {
    fontWeight: "700",
    fontSize: 21,
    marginTop: 10,
  },
  buttonModal: {
    display: "flex",
    alignItems: "flex-end",
  },
  modalOutside: {
    height: "100%",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#002395",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
});

export default SettingsScreen;
