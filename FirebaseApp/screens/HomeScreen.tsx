import { initializeApp } from '@firebase/app';
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

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

export default function HomeScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // SignIn successful, navigate to Stack screen
        navigation.navigate('Stack');
      })
      .catch((error) => {
        console.log('Error:', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        placeholder="Ingresar correo"
        placeholderTextColor="#fff"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Ingresar contraseña"
        placeholderTextColor="#fff"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.btn} onPress={handleLogin}>
        <Text style={styles.btnText}>Iniciar sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
        <Text style={styles.registerText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
    padding: 20,
  },
  title: {
    fontSize: 32,
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
  registerText: {
    color: 'yellow',
    fontSize: 16,
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});
