import React, { Component } from 'react';
import { KeyboardAvoidingView, Alert, TouchableOpacity, TouchableHighlight, Platform, StyleSheet, Text, View, Button, Image, TextInput, Modal } from 'react-native';
import ItemComponent from '../components/itemComponent';
import NoteScreen from '../components/Note';

import { LinearGradient } from 'expo';
import { addItem } from '../service/serviceInterface';
import { db } from '../database';

console.disableYellowBox = true;

let itemsRef = db.ref('/items');

export default class SignInScreen extends React.Component {

  componentDidMount() {
    itemsRef.on('value', (snapshot) => {
      let data = snapshot.val();
      let items = Object.values(data);
      this.setState({items});
    });
  }

  constructor(props) {
      super(props);
      this.state = {
        modalVisible: false,
        username: '',
        password: '',
        error: false,
        signInUsername: 'error',
        signInPassword: 'error',
        items: [],
        key: '',
      }
      this.handleChangeUser = this.handleChangeUser.bind(this);
      this.handleChangePass = this.handleChangePass.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChangeSignInUser = this.handleChangeSignInUser.bind(this);
      this.handleChangeSignInPass = this.handleChangeSignInPass.bind(this);
      this.handleSignInSubmit = this.handleSignInSubmit.bind(this);

    }

    signInValidation() {
      val = 0
      for (item of this.state.items){
        if ((this.state.signInUsername === item["username"]) && (this.state.signInPassword === item["password"])) {
          val = 1
        }
        else {
          if (val === 1) {
            val = 1
          }
          if (val === 0) {
            val = 2
          }
        }
      }
      if (val === 1) {
          this.state.key = item["key"]
          this.props.navigation.navigate('Note', {key: item["key"]});
        }
      if (val === 2) {
        Alert.alert("Username and password combination incorrect.")
      }
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
    
    handleChangeSignInUser(e) {
      this.setState({
        signInUsername: e.nativeEvent.text
      });
    }

    handleChangeSignInPass(e) {
      this.setState({
        signInPassword: e.nativeEvent.text
      });
    }

    handleSignInSubmit() {
      Alert.alert(
        'Login info is: ' + this.state.signInUsername + ', ' + this.state.signInPassword + '.'
      )
    }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  static navigationOptions = {
    title: 'Home',
    headerStyle: {
      backgroundColor: '#80A189',
    },
    headerTintColor: '#fff',
    headerTintStyle: {
      fontWeight: 'bold',
    },
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} keyboardVerticalOffset="100" behavior="padding" enabled>

        <LinearGradient
          colors={['#B2DCDF', 'transparent']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: 300,
          }}
        />



        <Modal
          animationType="slide"
          transparent={true}
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
              secureTextEntry={true}
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
          onChange={this.handleChangeSignInUser}
          underlineColorAndroid="white"
          secureTextEntry={false}
        />

        <TextInput
          style={styles.userInput}
          placeholder="Password"
          onChange={this.handleChangeSignInPass}
          underlineColorAndroid="white"
          secureTextEntry={true}
        />
        <View style={{flexDirection: "row", marginTop:20}}>
          <TouchableOpacity
            onPress={() => { 
              this.signInValidation();
            }}
            style={styles.signInButtons}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableHighlight
            onPress={() => { 
              this.setModalVisible(true);
            }}
            style={styles.signInButtons}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={() => { 
              <ItemComponent items={this.state.items} />
              console.log(this.state.items)
            }}
            style={styles.signInButtons}>
            <Text style={styles.buttonText}>Test</Text>
          </TouchableHighlight>

        </View>
      </KeyboardAvoidingView>
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
    backgroundColor: 'rgba(0,0,0,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: 'white'
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
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 50,
    width: 100,
    flexDirection: 'row',
    backgroundColor: "#6CBCA3",
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
    backgroundColor: "#6CBCA3",
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 10,
  }
});
