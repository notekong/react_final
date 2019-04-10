import React, { Component } from 'react';
import { KeyboardAvoidingView, Alert, TouchableOpacity, TouchableHighlight, Platform, StyleSheet, Text, View, Button, Image, TextInput, Modal, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { addItem } from '../service/serviceInterface';
import { updateItem } from '../service/updateServiceInterface';
import { deleteItem } from '../service/deleteServiceInterface';
import Calendar from 'react-native-calendario';
import CalendarApp from '../components/Calendar';
import ItemComponent from '../components/itemComponent';

import { LinearGradient } from 'expo';
import { db } from '../database';

let itemsRef = db.ref('/items');

export default class NoteScreen extends React.Component {

  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.state = {
      modalVisible: false,
      details: '',
      userIndex: 'hey',
      error: false,
      key: navigation.getParam('key'),
      items: [],
      modalTwoVisible: false,

    }
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
    this.handleChangeDetails = this.handleChangeDetails.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }


  handleChangeDetails(e) {
    this.setState({
      details: e.nativeEvent.text
    });
  }

  handleChangeIndex(e) {
    this.setState({
      userIndex: e.nativeEvent.text
    });
  }

  handleSubmit() {

    updateItem(this.state.details, this.state.key, this.state.items);

    Alert.alert(
      'Note Added',
      'Note has been added to the database.',
      [
        {text: 'OK', onPress: () => this.setModalVisible(!this.state.modalVisible)}
      ],
      { cancelable: false }
    )
  }

  handleDelete() {

    deleteItem(this.state.userIndex, this.state.key, this.state.items);

    Alert.alert(
      'Note Deleted',
      'Note has been removed from the database.',
      [
        {text: 'OK', onPress: () => this.setModalTwoVisible(!this.state.modalTwoVisible)}
      ],
      { cancelable: false }
    )
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  setModalTwoVisible(visible) {
    this.setState({modalTwoVisible: visible});
  }


  static navigationOptions = {
    title: 'Notes',
    headerStyle: {
      backgroundColor: '#80A189'
    },
    headerTintColor: '#fff',
    headerTintStyle: {
      fontWeight: 'bold',
    },
    headerRight: (
      <CalendarApp />
    )
  };

  componentDidMount() {
          itemsRef.on('value', (snapshot) => {
              let data = snapshot.val();
              let items = Object.values(data);
              this.setState({items});
          });
  }


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

            <Text style={styles.title}>Add a Note</Text>

            <TextInput
              style={styles.userInput}
              multiline = {true}
              numberOfLines = {1}
              onChange={this.handleChangeDetails}
              placeholder="Enter your note here"
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

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalTwoVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.modalContainer}>

            <Text style={styles.title}>Remove a Note</Text>
            <TextInput
              style={styles.userInput}
              onChange={this.handleChangeIndex}
              placeholder="Index of note to delete"
            />

            <View style={{flexDirection: "row", marginTop:20}}>
              <TouchableHighlight
              style = {styles.button}
                onPress={() => {
                  this.setModalTwoVisible(!this.state.modalTwoVisible);
                }}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableHighlight>

              <TouchableHighlight
                  style = {styles.button}
                  underlayColor= "white"
                  onPress = {this.handleDelete}
                >
                <Text
                    style={styles.buttonText}>
                    Confirm
                </Text>
              </TouchableHighlight>

            </View>
          </View>
        </Modal>

        <View style={{flexDirection: "column", alignItems: "center"}}>
          <ScrollView style={styles.noteContainer}>
            {
                this.state.items.length > 0
                ? <ItemComponent items={this.state.items} />
                : <Text>No items</Text>
            }
          </ScrollView>


          <View style={{flexDirection: "row"}}>
            <TouchableHighlight
              onPress={() => { 
                this.setModalTwoVisible(true);
              }}
              style={styles.addButton}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableHighlight>



            <TouchableHighlight
              onPress={() => { 
                this.setModalVisible(true);
              }}
              style={styles.addButton}>
              <Text style={styles.buttonText}>Add</Text>
            </TouchableHighlight>

            </View>
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
  noteContainer: {
    flex: 1,
    marginTop: 10,
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
    alignSelf: 'center',
    color: 'white'
  },
  button: {
    height: 50,
    width: 100,
    flexDirection: 'row',
    backgroundColor:'#6CBCA3',
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
  addButton: {
    justifyContent: 'center',
    alignItems: 'center', 
    margin: 10, 
    width: 100, 
    height: 50, 
    backgroundColor: "#6CBCA3",
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 10,


  },
});

