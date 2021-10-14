import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";

// Navigacion
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Componentes
import CreateUserScreen from "./screens/CreateUserScreen";
import UserDetailScreen from "./screens/UserDetailScreen";
import UsersList from "./screens/UsersList";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#621FF7",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name="UsersList" component={UsersList} options={{ title: "Lista de Pacientes" }}/>
      <Stack.Screen name="CreateUserScreen" component={CreateUserScreen} options={{ title: "Registro Paciente" }}/>
      <Stack.Screen name="UserDetailScreen" component={UserDetailScreen} options={{ title: "Detalles Paciente" }}/>
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
