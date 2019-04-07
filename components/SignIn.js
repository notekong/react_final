import React, { Component } from 'react';
import { Alert, TouchableOpacity, TouchableHighlight, Platform, StyleSheet, Text, View, Button, Image, TextInput, Modal } from 'react-native';

import { addItem } from '../service/serviceInterface';

export default class SignInScreen extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        modalVisible: false,
        username: '',
        password: '',
        error: false
      }
      this.handleChangeUser = this.handleChangeUser.bind(this);
      this.handleChangePass = this.handleChangePass.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChangeUser(e) {
      this.setState({
        username: e.nativeEvent.text
      });
    }
    handleChangePass(e) {
      this.setState({
        password: e.nativeEvent.text
      });
    }
    handleSubmit() {
      addItem(this.state.username, this.state.password);
      Alert.alert(
        'Registration successful!',
        'Thank you for joining NoteKong',
        [
          {text: 'OK', onPress: () => this.setModalVisible(!this.state.modalVisible)}
        ],
        { cancelable: false }
      )

    }
    

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  static navigationOptions = {
    title: 'Home',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTintStyle: {
      fontWeight: 'bold',
    },
  };

  render() {
    return (
      <View style={styles.container}>

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.modalContainer}>

            <Text style={styles.title}>Register for NoteKong</Text>
            <TextInput
              style={styles.userInput}
              onChange={this.handleChangeUser}
              placeholder="Username"
            />

            <TextInput
              style={styles.userInput}
              onChange={this.handleChangePass}
              placeholder="Password"
            />

            <View style={{flexDirection: "row", marginTop:20}}>
              <TouchableHighlight
              style = {styles.button}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableHighlight>

              <TouchableHighlight
                  style = {styles.button}
                  underlayColor= "white"
                  onPress = {this.handleSubmit}
                >
                <Text
                    style={styles.buttonText}>
                    Confirm
                </Text>
              </TouchableHighlight>

            </View>
          </View>
        </Modal>

        <Image style={{height: 300, width: 300}} source={require('../assets/notekong.png')} />
        <Text style={styles.appName}>NoteKong</Text>

        <TextInput
          style={styles.userInput}
          placeholder="Username"
          underlineColorAndroid="white"
          secureTextEntry={false}
        />

        <TextInput
          style={styles.userInput}
          placeholder="Password"
          underlineColorAndroid="white"
          secureTextEntry={true}
        />
        <View style={{flexDirection: "row", marginTop:20}}>
          <TouchableOpacity
            onPress={() => { 
              this.props.navigation.navigate('Note');
            }}
            style={styles.signInButtons}>
            <Text>Sign In</Text>
          </TouchableOpacity>

          <TouchableHighlight
            onPress={() => { 
              this.setModalVisible(true);
            }}
            style={styles.signInButtons}>
            <Text>Register</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0d3af',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appName: {
    color: 'white',
    fontSize: 40,
    fontFamily: 'Roboto',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#87C087',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center'
  },
  itemInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 50,
    width: 100,
    flexDirection: 'row',
    backgroundColor:'#e0d3af',
    borderWidth: 1,
    borderRadius: 8,
    margin: 10,
    justifyContent: 'center',
    borderColor: "gray",
    borderWidth: 2
  },
  userInput: {
    height: 45,
    marginTop: 10, 
    marginBottom: 10, 
    paddingLeft: 10, 
    backgroundColor: "white", 
    width: "80%", 
    borderColor: "gray", 
    borderWidth: 2,
    borderRadius: 10
  },
  signInButtons: {
    alignItems: "center", 
    justifyContent: "center", 
    margin: 10, 
    width: 100, 
    height: 50, 
    backgroundColor: "#87C087",
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 10,
  }
});
