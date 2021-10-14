import React, { useState } from "react";
import {Button,View,StyleSheet,TextInput,ScrollView,DatePickerIOSBase} from "react-native";

import firebase from "../database/firebase";

const AddUserScreen = (props) => {
  const initalState = {
    name: "",
    apellido:"",
    fecha:"",
    estatura: "",
    direccion: "",
  };

  const [state, setState] = useState(initalState);

  const handleChangeText = (value, name) => {
    setState({ ...state, [name]: value });
  };

  const saveNewUser = async () => {
    if (state.name === "") {
      alert("Por favor, ingrese su nombre");
    } else {

      try {
        await firebase.db.collection("pacientes").add({
          name: state.name,
          apellido:state.apellido,
          fecha:state.fecha,
          estatura:state.estatura,
          direccion:state.direccion
        });

        props.navigation.navigate("UsersList"); // me manda a la vista listaUser
      } catch (error) {
        console.log(error)
      }
    }
    console.log("guardar",state)
  };

  return (
    <ScrollView style={styles.container}>
      {/* Name Input */}
      <View style={styles.inputGroup}>
        <TextInput placeholder="Nombres" onChangeText={(value) => handleChangeText(value, "name")} value={state.name}/>
      </View>

      <View style={styles.inputGroup}>
        <TextInput placeholder="Apellidos" onChangeText={(value) => handleChangeText(value, "apellido")} value={state.apellido}/>
      </View>

      {/* Email Input */}
      <View style={styles.inputGroup}>
        <TextInput placeholder="Estatura" multiline={true} numberOfLines={4} onChangeText={(value) => handleChangeText(value, "estatura")}
          value={state.estatura}/>
      </View>

      {/* Input */}
      <View style={styles.inputGroup}>
        <TextInput placeholder="Direccion" onChangeText={(value) => handleChangeText(value, "direccion")} value={state.direccion}/>
      </View>

      <View style={styles.button}>
        <Button title="Guardar Paciente" onPress={() => saveNewUser()} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AddUserScreen;
