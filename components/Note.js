import React from 'react';
import { StyleSheet, Text, View, Button, Image, AppRegistry, TextInput } from 'react-native';

export default class NoteScreen extends React.Component {

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
      <Button
        onPress={() => alert('This is a button!')}
        title="Calendar"
        color="black"
      />
    )
  };


  render() {
    return (
      <View style={styles.container}>
        <Text> This is the notes </Text>
        <Button
          title="+"
          onPress={() => { 
            
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
