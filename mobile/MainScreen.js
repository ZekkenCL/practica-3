import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Button, TextInput, Snackbar } from 'react-native-paper';
import axios from 'axios';

const MainScreen = () => {
  const [userData, setUserData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  useEffect(() => {
    // Aquí llamas a tu API para obtener los datos del usuario
    axios.get('http://192.168.56.1:5000/api/profile')
      .then(response => {
        setUserData(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleEditToggle = () => {
    setEditing(!editing);
  };

  const handleUpdate = () => {
    // Función para actualizar los datos del usuario
    // Ejemplo: axios.put('tu-api-url/api/profile', { name, email, ... })
    setSnackbarVisible(true);
    handleEditToggle();
    // Aquí actualizarías el estado userData con los nuevos valores
  };

  if (isLoading) {
    return <Text>Cargando datos del usuario...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      {isLoading ? (
        <Text>Cargando datos del usuario...</Text>
      ) : (
        <Card style={styles.card}>
          <Card.Title title="Perfil del Usuario" />
          <Card.Content>
            {editing ? (
              <>
                <TextInput
                  label="Nombre"
                  value={name}
                  onChangeText={text => setName(text)}
                  style={styles.input}
                />
                <TextInput
                  label="Email"
                  value={email}
                  onChangeText={text => setEmail(text)}
                  style={styles.input}
                />
                {/* Agrega más campos de edición según sea necesario */}
              </>
            ) : (
              <>
                <Text style={styles.text}>Nombre: {userData.name}</Text>
                <Text style={styles.text}>Email: {userData.email}</Text>
                {/* Agrega más campos de visualización según sea necesario */}
              </>
            )}
          </Card.Content>
          <Card.Actions>
            <Button mode="contained" onPress={handleEditToggle}>
              {editing ? 'Cancelar' : 'Editar'}
            </Button>
            {editing && (
              <Button mode="contained" onPress={handleUpdate} style={styles.button}>
                Actualizar
              </Button>
            )}
          </Card.Actions>
        </Card>
      )}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}>
        Datos actualizados correctamente.
      </Snackbar>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    margin: 10,
  },
  input: {
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
  button: {
    marginLeft: 10,
  },
});

export default MainScreen;
