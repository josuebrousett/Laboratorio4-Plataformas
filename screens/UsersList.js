import React, { useState, useEffect } from "react";
import { Button, StyleSheet, } from "react-native";
import { ListItem, Avatar, Image} from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import firebase from "../database/firebase";

const UserScreen = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    firebase.db.collection("pacientes").onSnapshot((querySnapshot) => {
      const users = [];
      querySnapshot.docs.forEach((doc) => {
        const { name, apellido, fecha } = doc.data();
        users.push({
          id: doc.id,
          name,
          apellido,
          fecha,
        });
      });
      setUsers(users);
    });
  }, []);

  return (
    <ScrollView>
      <Button onPress={() => props.navigation.navigate("CreateUserScreen")} title="Registrar Paciente"/>
      {users.map((user) => {
        return (
          <ListItem
            key={user.id}
            bottomDivider
            onPress={() => {
              props.navigation.navigate("UserDetailScreen", {
                userId: user.id,
              });
            }}
          >
            <ListItem.Chevron />
            <Image
              source={{ uri: "../assets/icono-paciente.jpg" }}
              style={{ width: 20, height: 20 }}
              rounded
            />
            <ListItem.Content>
              <ListItem.Title>{user.name} {user.apellido}</ListItem.Title>
              <ListItem.Subtitle>{user.fecha}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};

export default UserScreen;
