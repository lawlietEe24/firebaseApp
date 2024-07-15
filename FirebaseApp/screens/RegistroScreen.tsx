import { initializeApp } from '@firebase/app';
import { getAuth, createUserWithEmailAndPassword } from '@firebase/auth';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Platform, Alert } from 'react-native';
import { launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBbLo8DdBzwXj_2EJNwizosoDqnmAIwQh0",
    authDomain: "taller-9607b.firebaseapp.com",
    projectId: "taller-9607b",
    storageBucket: "taller-9607b.appspot.com",
    messagingSenderId: "668442435955",
    appId: "1:668442435955:web:38b197ce03f92b2d2ee506"
  };

// Inicialización de Firebase
initializeApp(firebaseConfig);

export default function RegistroScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [nickname, setNickname] = useState('');
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const handleRegister = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Registro exitoso, navegar a la pantalla 'Stack'
        navigation.navigate('Stack');
      })
      .catch((error) => {
        console.log('Error:', error.message);
      });
  };

  const handlePickImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response: ImagePickerResponse) => {
      if (!response.didCancel) {
        if (response.assets && response.assets.length > 0) {
          setSelectedImage(response.assets[0]); // Guardar la primera imagen seleccionada
        } else {
          console.log('No se encontraron imágenes seleccionadas');
        }
      } else {
        console.log('Selección de imagen cancelada');
      }
    });
  };

  const renderSelectedImage = () => {
    if (selectedImage) {
      return (
        <Image
          source={{ uri: selectedImage.uri }}
          style={styles.selectedImage}
        />
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <TouchableOpacity onPress={handlePickImage}>
        <Text style={styles.btnText}>Seleccionar Imagen</Text>
      </TouchableOpacity>
      {renderSelectedImage()}
      <TextInput
        placeholder='Ingresar correo'
        placeholderTextColor="#fff"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder='Ingrese contraseña'
        placeholderTextColor="#fff"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <TextInput
        placeholder='Ingrese edad'
        placeholderTextColor="#fff"
        style={styles.input}
        value={age}
        onChangeText={setAge}
        keyboardType='numeric'
      />
      <TextInput
        placeholder='Ingrese apodo'
        placeholderTextColor="#fff"
        style={styles.input}
        value={nickname}
        onChangeText={setNickname}
      />
      <TouchableOpacity style={styles.btn} onPress={handleRegister}>
        <Text style={styles.btnText}>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 50,
    color: 'yellow',
    marginBottom: 20,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  input: {
    backgroundColor: '#444',
    height: 50,
    width: "100%",
    margin: 10,
    borderRadius: 10,
    borderColor: 'yellow',
    borderWidth: 2,
    paddingHorizontal: 20,
    color: '#fff',
  },
  btn: {
    backgroundColor: '#ff4444',
    width: 150,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectedImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginVertical: 20,
  },
});
