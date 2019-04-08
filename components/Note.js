import React, { Component } from 'react';
import { KeyboardAvoidingView, Alert, TouchableOpacity, TouchableHighlight, Platform, StyleSheet, Text, View, Button, Image, TextInput, Modal } from 'react-native';
import PropTypes from 'prop-types';
import { addItem } from '../service/serviceInterface';
import Calendar from 'react-native-calendario';
import CalendarApp from '../components/Calendar';


export default class NoteScreen extends React.Component {

  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.state = {
      modalVisible: false,
      title: '',
      details: '',
      error: false,
      user: navigation.getParam('username', 'NO-ID'),
    }

    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeDetails = this.handleChangeDetails.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeTitle(e) {
    this.setState({
      title: e.nativeEvent.text
    });
  }

  handleChangeDetails(e) {
    this.setState({
      details: e.nativeEvent.text
    });
  }

  handleSubmit() {
    addItem(this.state.title, this.state.details);
    Alert.alert(
      'Note added.',
      'thnks fr th mmrs',
      [
        {text: 'OK', onPress: () => this.setModalVisible(!this.state.modalVisible)}
      ],
      { cancelable: false }
    )
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  static propTypes = {
      items: PropTypes.array.isRequired
  };

  static navigationOptions = {
    title: 'Notes',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTintStyle: {
      fontWeight: 'bold',
    },
    headerRight: (
      <CalendarApp />
    )
  };


  render() {
    
    // const someId = 
    // this.setState({user: someId});
    // console.log(this.state.user);
    console.log(this.state.user);
    return (
      <KeyboardAvoidingView style={styles.container} keyboardVerticalOffset="100" behavior="padding" enabled>

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.modalContainer}>

            <Text style={styles.title}>Add a Note</Text>
            <TextInput
              style={styles.userInput}
              onChange={this.handleChangeTitle}
              placeholder="Title"
            />

            <TextInput
              style={styles.userInputBig}
              multiline = {true}
              numberOfLines = {10}
              onChange={this.handleChangeDetails}
              placeholder="Details"
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



        <View style={{flexDirection: "row", marginTop:20}}>
          <TouchableHighlight
            onPress={() => { 
              this.setModalVisible(true);
            }}
            style={styles.addButton}>
            <Text>+</Text>
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
    borderRadius: 10,

  },
  userInputBig: {
    marginTop: 10, 
    marginBottom: 10, 
    paddingLeft: 10,
    paddingRight: 10, 
    backgroundColor: "white", 
    width: "80%", 
    borderColor: "gray", 
    borderWidth: 2,
    borderRadius: 10
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center', 
    margin: 10, 
    width: 100, 
    height: 50, 
    backgroundColor: "#87C087",
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 10,
  }
});

