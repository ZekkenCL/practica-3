import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View} from 'react-native';
import { Button, Card, Title, Paragraph, ActivityIndicator, Modal, DataTable, Portal } from 'react-native-paper';
import axios from 'axios';

const ProfileScreen = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/profile')
      .then(response => {
        setProfile(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Hubo un error al obtener el perfil:', error);
        setLoading(false);
      });
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  if (loading) {
    return <ActivityIndicator animating={true} />;
  }

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>{profile.name}</Title>
          <Paragraph>Email: {profile.email}</Paragraph>
          <Paragraph>Ciudad: {profile.city}</Paragraph>
          <Paragraph>País: {profile.country}</Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Button mode="contained" onPress={toggleModal}>
            Ver Frameworks
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
        <Button mode="contained" onPress={toggleModal}>
            Ver Hobbies
          </Button>
        </Card.Content>
      </Card>


        <Modal visible={isModalVisible} onDismiss={toggleModal} contentContainerStyle={styles.modal}>
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
            <Button mode="contained" onPress={toggleModal}>
                Cerrar
            </Button>
        </Modal>
                
        {/* <Modal visible={isModalVisible} onDismiss={toggleModal} contentContainerStyle={styles.modal}>
            <DataTable>
            <DataTable.Header>
                <DataTable.Title>Hobbies</DataTable.Title>
            </DataTable.Header>

            {profile.hobbies.map((hobbie, index) => (
                <DataTable.Row key={index}>
                <DataTable.Cell>{hobbie.name}</DataTable.Cell>
                </DataTable.Row>
            ))}
            </DataTable>
            <Button mode="contained" onPress={toggleModal}>
                Cerrar
            </Button>
        </Modal> */}
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
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 5,
    alignSelf: 'center',
    width: '90%',
  },
});

export default ProfileScreen;
