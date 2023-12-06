import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View, Alert } from "react-native";
import {
  Button,
  Card,
  Title,
  Paragraph,
  ActivityIndicator,
  TextInput,
  Portal,
  Modal,
  DataTable,
  List,
} from "react-native-paper";
import axios from "axios";

const ProfileScreen = () => {
  const [profile, setProfile] = useState(null);
  const [editedProfile, setEditedProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isFrameworksModalVisible, setIsFrameworksModalVisible] = useState(false);
  const [isHobbiesModalVisible, setIsHobbiesModalVisible] = useState(false);
  const [editedFrameworks, setEditedFrameworks] = useState([]);
  const [editedHobbies, setEditedHobbies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/profile")
      .then((response) => {
        setProfile(response.data);
        setEditedProfile(response.data);
        setEditedFrameworks(response.data.frameworks);
        setEditedHobbies(response.data.hobbies);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener el perfil:", error);
        setLoading(false);
      });
  }, []);

  const handleInputChange = (name, value) => {
    setEditedProfile({ ...editedProfile, [name]: value });
  };

  const handleFrameworkChange = (index, key, value) => {
    const newFrameworks = [...editedFrameworks];
    newFrameworks[index] = { ...newFrameworks[index], [key]: value };
    setEditedFrameworks(newFrameworks);
  };

  const handleHobbyChange = (index,key, value) => {
    const newHobbies = [...editedHobbies];
    newHobbies[index] = { ...newHobbies[index], [key]: value };
    setEditedHobbies(newHobbies);
    };

  const toggleFrameworksModal = () => {
    setIsFrameworksModalVisible(!isFrameworksModalVisible);
  };

  const toggleHobbiesModal = () => {
    setIsHobbiesModalVisible(!isHobbiesModalVisible);
  };

  const saveChanges = () => {
    const updatedProfile = {
      ...editedProfile,
      frameworks: editedFrameworks,
      hobbies: editedHobbies,
    };

    axios
      .put(`http://localhost:5000/api/profile/${editedProfile.rut}`, updatedProfile)
      .then((response) => {
        setProfile(response.data);
        setIsEditing(false);
        Alert.alert("Perfil Actualizado", "Los cambios en el perfil han sido guardados.");
      })
      .catch((error) => {
        console.error("Error al actualizar el perfil:", error);
        Alert.alert("Error", "No se pudo actualizar el perfil.");
      });
  };

  if (loading) {
    return <ActivityIndicator animating={true} />;
  }

  return (
    <ScrollView style={styles.container}>
      {isEditing ? (
        <View style={styles.form}>
        <Card style={styles.card}>
          <Card.Title title="Editar Perfil" />
          <Card.Content>
            <TextInput
              label="Nombre"
              value={editedProfile.name}
              onChangeText={(text) => handleInputChange('name', text)}
              style={styles.input}
              mode="outlined"
              right={<TextInput.Icon name="account" />}
            />
            <TextInput
                label="Email"
                value={editedProfile.email}
                onChangeText={(text) => handleInputChange('email', text)}
                style={styles.input}
                mode="outlined"
                right={<TextInput.Icon name="email" />}
                />
            <TextInput
                label="Ciudad"
                value={editedProfile.city}
                onChangeText={(text) => handleInputChange('city', text)}
                style={styles.input}
                mode="outlined"
                right={<TextInput.Icon name="city" />}
                />  
            <TextInput
                label="País"
                value={editedProfile.country}
                onChangeText={(text) => handleInputChange('country', text)}
                style={styles.input}
                mode="outlined"
                right={<TextInput.Icon name="city" />}
                />
          </Card.Content>
        </Card>

        <Card style={styles.card}>
            <Card.Title title="Editar Descripcion" />
            <Card.Content>
                <TextInput
                    label="Descripcion"
                    value={editedProfile.summary}
                    onChangeText={(text) => handleInputChange('summary', text)}
                    style={styles.input}
                    mode="outlined"
                    multiline={true}
                    numberOfLines={5}
                    right={<TextInput.Icon name="text" />}
                />
            </Card.Content>
        </Card>

          {/* Campos para editar frameworks */}

          <Card style={styles.card}>
          <Card.Title title="Editar Frameworks" />
          <Card.Content>
          {editedFrameworks.map((framework, index) => (
            <View key={index} style={styles.frameworkContainer}>
              <TextInput
                label="Framework"
                value={framework.name}
                onChangeText={(text) => handleFrameworkChange(index, 'name', text)}
                style={styles.input}
                mode="outlined"
              />
              <TextInput
                label="Nivel"
                value={framework.level}
                onChangeText={(text) => handleFrameworkChange(index, 'level', text)}
                style={styles.input}
                mode="outlined"
              />
            </View>
          ))}
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Title title="Editar Hobbies" />
          <Card.Content>
          {editedHobbies.map((hobby, index) => (
            <View key={index} style={styles.hobbyContainer}>
              <TextInput
                label="Hobby"
                value={hobby.name}
                onChangeText={(text) => handleHobbyChange(index,'name', text)}
                style={styles.input}
                mode="outlined"
              />
            </View>
          ))}
          </Card.Content>
        </Card>


          {/* Botones para guardar o cancelar */}
          <Button mode="contained" onPress={saveChanges} style={styles.button}>
            Guardar Cambios
          </Button>
          <Button mode="outlined" onPress={() => setIsEditing(false)} style={styles.button}>
            Cancelar
          </Button>
      </View>
      ) : (
        <View>
          <Card style={styles.card}>
            <Card.Content>
              <Title>{profile.name}</Title>
              <Paragraph>RUT: {profile.rut}</Paragraph>
              <Paragraph>Email: {profile.email}</Paragraph>
              <Paragraph>Ciudad: {profile.city}</Paragraph>
              <Paragraph>País: {profile.country}</Paragraph>
            </Card.Content>
          </Card>
          <Card style={styles.card}>
            <Card.Content>
              <Title>Descripcion</Title>
              <Paragraph>{profile.summary}</Paragraph>
            </Card.Content>
          </Card>

          <Card style={styles.card}>
            <Card.Content>
              <Button mode="contained" onPress={toggleFrameworksModal}>
                Ver Frameworks
              </Button>
            </Card.Content>
          </Card>

          <Card style={styles.card}>
            <Card.Content>
              <Button mode="contained" onPress={toggleHobbiesModal}>
                Ver Hobbies
              </Button>
            </Card.Content>
          </Card>
          <Portal>
            {/* Modal para Frameworks */}
            <Modal
              visible={isFrameworksModalVisible}
              onDismiss={toggleFrameworksModal}
              contentContainerStyle={styles.modal}
            >
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>Framework</DataTable.Title>
                  <DataTable.Title>Nivel</DataTable.Title>
                </DataTable.Header>

                {profile.frameworks.map((framework, index) => (
                  <DataTable.Row key={index}>
                    <DataTable.Cell>{framework.name}</DataTable.Cell>
                    <DataTable.Cell>{framework.level}</DataTable.Cell>
                  </DataTable.Row>
                ))}
              </DataTable>
              <Button mode="contained" onPress={toggleFrameworksModal}>
                Cerrar
              </Button>
            </Modal>

            {/* Modal para Hobbies */}
            <Modal
              visible={isHobbiesModalVisible}
              onDismiss={toggleHobbiesModal}
              contentContainerStyle={styles.modal}
            >
              <List.Section title="Hobbies">
                {profile.hobbies.map((hobby, index) => (
                  <List.Item
                    key={index}
                    title={hobby.name}
                    left={(props) => <List.Icon {...props} icon="brush" />}
                  />
                ))}
              </List.Section>
              <Button mode="contained" onPress={toggleHobbiesModal}>
                Cerrar
              </Button>
            </Modal>
          </Portal>
          <Card style={styles.card}>
            <Card.Content>
              <Button
                mode="contained"
                onPress={() => setIsEditing(true)}
                style={styles.button}
              >
                Editar
              </Button>
            </Card.Content>
          </Card>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin: 10,
    padding: 10,
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 5,
    alignSelf: "center",
    width: "90%",
  },
});

export default ProfileScreen;
