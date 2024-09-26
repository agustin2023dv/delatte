import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const Contact = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Us</Text>
      
      <TextInput 
        style={styles.input} 
        placeholder="Your Name" 
        placeholderTextColor="#B0B0B0"
      />
      <TextInput 
        style={styles.input} 
        placeholder="Your Email" 
        placeholderTextColor="#B0B0B0"
      />
      <TextInput 
        style={styles.input} 
        placeholder="Your Message" 
        placeholderTextColor="#B0B0B0"
        multiline
      />
      
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#F9F9F9',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#5C4334',
  },
  input: {
    height: 50,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: '#392316',
    padding: 10,
    borderRadius: 5,
  },
  submitText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Contact;
